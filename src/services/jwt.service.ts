import * as jose from 'jose';
import 'dotenv/config';
import type { UUID } from 'crypto';
import type { TRoles } from '@/boot/enums/roles.enum.js';


type TTokenUserPayload = { userId: UUID, role: TRoles };

export default class JWTService {
    private readonly JWT_ACCESS_SECRET = new TextEncoder().encode(process.env.APP_JWT_ACCESS_SECRET_KEY
        || (() => { throw Error('JWT secret is missing'); })());

    private readonly ALG = process.env.APP_JWT_ALG || 'HS256';

    public async generateAccesToken(payload: TTokenUserPayload) {
        const accessToken = await new jose.SignJWT(payload)
            .setProtectedHeader({ alg: this.ALG })
            .setIssuedAt()
            .setExpirationTime('15m')
            .sign(this.JWT_ACCESS_SECRET);

        return accessToken;
    }

    public async verifyAccessToken(token: string) {
        return await jose.jwtVerify(token, this.JWT_ACCESS_SECRET);
    }
}