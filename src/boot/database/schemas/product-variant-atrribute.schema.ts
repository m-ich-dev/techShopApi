import { Generated } from "kysely";


export interface IProductVariantAttributeTable {
    id: Generated<number>;
    productVariantId: number;
    attributeId: number;
    value: string;
}
