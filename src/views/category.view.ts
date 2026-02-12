import { IRecordCategory } from "../records/category.record";

type TCategory = IRecordCategory;
type TCategoryConstructor = IRecordCategory;

export default class Category implements TCategory {
    id: number;
    title: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;

    constructor(data: TCategoryConstructor) {
        this.id = data.id;
        this.title = data.title;
        this.slug = data.slug;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.deletedAt = data.deletedAt;
    }
}
