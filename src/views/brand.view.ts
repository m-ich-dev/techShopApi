import { IRecordBrand } from "../records/brand.record";

type TBrand = IRecordBrand;
type TBrandConstructor = IRecordBrand;

export default class Brand implements TBrand {
    id: number;
    title: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;

    constructor(data: TBrandConstructor) {
        this.id = data.id;
        this.title = data.title;
        this.slug = data.slug;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.deletedAt = data.deletedAt;
    }
}
