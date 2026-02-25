import ReadRepositorty from "../../boot/repositories/read.repository";


export default class CategoryReadRepository extends ReadRepositorty<'categories'> {
    public readonly tableName: "categories" = 'categories';

    protected query() {
        return this.db.selectFrom(this.tableName)
            .where('deletedAt', 'is', null)
            .selectAll();
    }
}