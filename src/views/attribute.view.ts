import { TAttribute, TAttributeRow } from "./types/attribute.types";


export default class Attribute implements TAttribute {
    id: number;
    title: string;
    slug: string;
    filterType: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;

    constructor(data: TAttributeRow) {
        this.id = data.id;
        this.title = data.title;
        this.slug = data.slug;
        this.filterType = data.filterType;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.deletedAt = data.deletedAt;
    }
}
