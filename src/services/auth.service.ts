import type UserRepository from "@/repositories/user/user.repository.js";
import type JWTService from "./jwt.service.js";
import type RefreshTokenRepository from "@/repositories/token/refresh-token.repository.js";
import crypto from 'crypto';
import { toHash, verify } from "@/boot/utils/argon2.js";
import HTTPError from "@/boot/http/http.error.js";
import { ROLES } from "@/boot/enums/roles.enum.js";
import type { TUserStoreRequest } from "@/http/v1/requests/user/user.store.request.js";
import type { TInsertUser, TRecordUser } from "@/boot/database/schemas/user.schema.js";
import type { TUserLoginRequest } from "@/http/v1/requests/user/user.login.request.js";


export default class AuthService {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly tokenRepository: RefreshTokenRepository,
        private readonly JWT: JWTService,
    ) { }

    private getExpired() {
        const date = new Date();
        date.setDate(date.getDate() + 30);
        return date;
    }

    private toCryptToken(token: string) {
        return crypto.
            createHash('sha256')
            .update(token)
            .digest('hex');
    }

    private toPublicUser(user: TRecordUser) {
        const { passwordHash: _, ...publicUser } = user;

        return publicUser;
    }

    private async issueTokens(user: TRecordUser) {
        const accessToken = await this.JWT.generateAccesToken({
            userId: user.id,
            role: user.role
        });

        const refreshToken = crypto.randomBytes(64).toString('hex');

        const tokenHash = this.toCryptToken(refreshToken);

        await this.tokenRepository.insert({
            userId: user.id,
            tokenHash,
            expiredAt: this.getExpired()
        });

        return { accessToken, refreshToken };
    }

    public async register(data: TUserStoreRequest) {
        let user: TRecordUser;
        const passHash = await toHash(data.password);
        const userInsert: TInsertUser = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            passwordHash: passHash,
            role: ROLES.user,
            isActive: true,
            deletedAt: null
        };
        const existUser = await this.userRepository.firstByEmail({ email: data.email });
        if (existUser && existUser.deletedAt !== null) {
            user = await this.userRepository.update(userInsert, { column: 'email', value: data.email });
        } else if (existUser) {
            throw HTTPError.conflict({
                message: 'Email already exists',
                detail: { path: 'email', message: data.email }
            });
        } else {
            user = await this.userRepository.insert(userInsert);
        }
        const tokens = await this.issueTokens(user);
        const publicUser = this.toPublicUser(user);
        return { tokens, publicUser };
    };

    public async login(credentials: TUserLoginRequest) {
        const user = await this.userRepository.firstByEmail({ email: credentials.email });
        if (!user) throw HTTPError.unauthorized({
            message: 'Invalid credentials',
            detail: { path: 'credentials', message: 'email or password' }
        });
        if (user.isActive === false) throw HTTPError.forbidden({
            message: 'User is disabled',
            detail: { path: 'email', message: credentials.email }
        });
        const isUser = await verify(user.passwordHash, credentials.password);
        if (!isUser) throw HTTPError.unauthorized({
            message: 'Invalid credentials',
            detail: { path: 'credential', message: 'email or password' }
        });
        const tokens = await this.issueTokens(user);
        return tokens;
    }

    public async refresh(refreshToken: string) {
        const tokenHash = this.toCryptToken(refreshToken);

        const tokenExist = await this.tokenRepository.firstByHash({ tokenHash, withRevoked: true });
        if (!tokenExist) {
            throw HTTPError.unauthorized({
                message: 'token not found'
            });
        }
        if (tokenExist.expiredAt <= new Date()) {
            throw HTTPError.unauthorized({
                message: 'token is expired'
            });
        }
        if (tokenExist.revokedAt !== null) {
            await this.logoutAll(tokenExist.userId);
            throw HTTPError.unauthorized({
                message: 'Token reuse detected'
            });
        }
        const user = await this.userRepository.first({
            column: 'id',
            value: tokenExist.userId
        });
        await this.tokenRepository.revoke({ tokenId: tokenExist.id });
        const tokens = await this.issueTokens(user);
        return tokens;
    }

    public async logout(refreshToken: string) {
        const tokenHash = this.toCryptToken(refreshToken);
        const token = await this.tokenRepository.firstByHash({ tokenHash });
        if (!token) return true;
        await this.tokenRepository.revoke({ tokenId: token.id });
        return true;
    }

    public async logoutAll(userId: string) {
        await this.tokenRepository.revokeAllByUser({ userId });
        return true;
    }
}