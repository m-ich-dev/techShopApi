import ReadRepositorty from "../../boot/repositories/read.repository";
import { IRecordBrand } from "../../records/brand.record";

export default class BrandReadRepository extends ReadRepositorty<IRecordBrand> {
    protected readonly tableName: string = 'brands';
    protected readonly primaryKey: string = 'slug';
    protected readonly softDelete: boolean = true;
}