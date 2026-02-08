import ReadRepositorty from "../../boot/repositories/read.repository";
import { IRecordAttribute } from "../../records/attribute.record";

export default class AttributeReadRepository extends ReadRepositorty<IRecordAttribute> {
    protected readonly tableName: string = 'attributes';
    protected readonly primaryKey: string = 'slug';
    protected readonly softDelete: boolean = true;
}