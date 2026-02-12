import { IRecordAttribute } from "../records/attribute.record";


type TAttribute = IRecordAttribute;
type TAttributeConstructor = IRecordAttribute;

export default class Attribute implements TAttribute {
    id: number;
    title: string;
    slug: string;
    filterType: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;

    constructor(data: TAttributeConstructor) {
        this.id = data.id;
        this.title = data.title;
        this.slug = data.slug;
        this.filterType = data.filterType;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.deletedAt = data.deletedAt;
    }
}
