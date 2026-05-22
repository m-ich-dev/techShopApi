import Resource from "@/boot/http/resource.js";
import type { TPublicUser } from "@/services/auth.service.js";
import type { TUserClientResource } from "@/types/resources/user.resource.types.js";


export default class UserResource extends Resource {
    public static override transform(data: TPublicUser): TUserClientResource {
        return {
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email
        };
    }
}