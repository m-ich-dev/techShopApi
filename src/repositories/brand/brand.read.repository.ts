import ReadRepositorty from "../../boot/repositories/read.repository";

export default class BrandReadRepository extends ReadRepositorty<'brands'> {
    public readonly tableName: "brands" = 'brands';

    protected query() {
        return this.db.selectFrom(this.tableName)
            .where('deletedAt', 'is', null)
            .selectAll();
    }

}