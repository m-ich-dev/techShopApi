import type { JWTPayload } from 'jose';
import type { TRoles } from '../enums/roles.enum.ts';


export type TTokenPayload = JWTPayload & {
    userId: string;
    role: TRoles;
};
declare global {
    namespace Express {
        interface Request {
            user?: TTokenPayload
        }
    }
}

export { };