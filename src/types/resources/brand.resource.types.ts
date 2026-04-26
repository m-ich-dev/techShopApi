import type { TRecordBrand } from "@/boot/database/schemas/brand.schema.js";
import type { TOmitTimestamps } from "@/boot/types/db.types.js";


export type TBrandClientResource = TOmitTimestamps<TRecordBrand>;