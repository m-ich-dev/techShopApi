import type { TRoles } from "@/boot/enums/roles.enum.js";
import HTTPError from "@/boot/http/http.error.js";
import type { TMWare } from "@/boot/types/http.types.js";


export default function roleMiddleware(roles: TRoles[]): TMWare {
    return async (req, res, next) => {

        const userPayload = req.user;

        if (!userPayload) {
            throw HTTPError.unauthorized({
                message: "authentication failure"
            });
        }

        const hasRole = roles.includes(userPayload.role);

        if (!hasRole) {
            throw HTTPError.forbidden({
                message: "access denied"
            });
        }

        next();
    };
}