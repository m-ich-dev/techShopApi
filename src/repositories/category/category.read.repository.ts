import ReadRepositorty from "../../boot/repositories/read.repository";
import { IRecordCategory } from "../../records/category.record";

export default class CategoryReadRepository extends ReadRepositorty<IRecordCategory> {
    protected readonly tableName: string = 'categories';
    protected readonly primaryKey: string = 'slug';
    protected readonly softDelete: boolean = true;
}