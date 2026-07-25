import type { TOmitTimestamps } from "@/boot/types/db.types.js";
import type { TCategoryBranch } from "@/services/category.service.js";


export type TCategoryTreeClientResource = Omit<TOmitTimestamps<TCategoryBranch>, 'id' | 'children'>
    & { children: TCategoryTreeClientResource[] };