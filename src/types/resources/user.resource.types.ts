import type { TRecordUser } from "@/boot/database/schemas/user.schema.js";


export type TUserClientResource = Pick<TRecordUser, 'id' | 'firstName' | 'lastName' | 'email'>;