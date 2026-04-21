import { Sluggable } from "../../boot/mixins/repository/sluggable-repository.mixin";
import Repository from "../../boot/repositories/repository";


export default class PriceRepository extends Sluggable(Repository<'prices'>) {
    public readonly softDeletable: boolean = true;
    public readonly tableName: "prices" = 'prices';
}