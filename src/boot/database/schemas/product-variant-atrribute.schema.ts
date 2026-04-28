import type { Generated, Insertable, Selectable, Updateable } from "kysely";


export interface IProductVariantAttributeTable {
    id: Generated<number>;
    productVariantId: number;
    attributeId: number;
    value: string;
}

export type TRecordVariantAttribute = Selectable<IProductVariantAttributeTable>;
export type TInsertVariantAttribute = Insertable<IProductVariantAttributeTable>;
export type TUpdateVariantAttribute = Updateable<IProductVariantAttributeTable>;