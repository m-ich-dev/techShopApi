import { TRecordBrand } from "../../../boot/database/schemas/brand.schema";
import { TOmitTimestamps } from "../../../boot/types/db.types";


export type TBrandClientResource = TOmitTimestamps<TRecordBrand>;