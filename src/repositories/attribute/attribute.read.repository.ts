import ReadRepositorty from "../../boot/repositories/read.repository";


export default class AttributeReadRepository extends ReadRepositorty<'attributes'> {
    public readonly tableName: "attributes" = 'attributes';

    protected query() {
        return this.db.selectFrom(this.tableName)
            .where('deletedAt', 'is', null)
            .selectAll();
    }
}