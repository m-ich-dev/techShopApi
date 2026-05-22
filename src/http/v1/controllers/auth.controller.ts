import { HTTP_CODES } from "@/boot/enums/http.enum.js";
import type { THttp } from "@/boot/types/http.types.js";
import type AuthService from "@/services/auth.service.js";
import UserResource from "../resources/user/user.resource.js";
import HTTPError from "@/boot/http/http.error.js";


export default class AuthController {

    constructor(
        private readonly auth: AuthService
    ) { }

    public login: THttp = async (req, res) => {

        const { tokens, publicUser } = await this.auth.login(req.body);

        res.cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000
        });
        return res
            .status(HTTP_CODES.OK)
            .set('authorization', `Bearer ${tokens.accessToken}`)
            .json({ data: UserResource.transform(publicUser) });
    };

    public refresh: THttp = async (req, res) => {

        const { refreshToken } = req.cookies as { refreshToken: string | undefined };

        if (!refreshToken) {
            res.clearCookie('refreshToken');
            return res.sendStatus(204);
        }

        const { tokens, publicUser } = await this.auth.refresh(refreshToken);

        res.cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000
        });

        return res
            .status(HTTP_CODES.OK)
            .set('authorization', `Bearer ${tokens.accessToken}`)
            .json({ data: UserResource.transform(publicUser) });
    };

    public register: THttp = async (req, res) => {

        const { publicUser, tokens } = await this.auth.register(req.body);

        res.cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000
        });

        return res
            .status(HTTP_CODES.CREATED)
            .set('authorization', `Bearer ${tokens.accessToken}`)
            .json({ data: UserResource.transform(publicUser) });

    };

    public logout: THttp = async (req, res) => {

        const { refreshToken } = req.cookies as { refreshToken: string | undefined };

        if (!refreshToken) {
            res.clearCookie('refreshToken');
            return res.sendStatus(204);
        }

        await this.auth.logout(refreshToken);

        res.clearCookie('refreshToken');

        return res.status(HTTP_CODES.OK).json({ data: 'logout was success' });
    };

    public me: THttp = async (req, res) => {
        const userId = req.user?.userId;
        if (!userId) {
            throw HTTPError.unauthorized({ message: 'unauthorized' });
        }

        const user = await this.auth.getUser(userId);

        return res.status(HTTP_CODES.OK).json({ data: UserResource.transform(user) });
    };

}