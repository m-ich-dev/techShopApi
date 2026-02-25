import WriteRepository from "../../boot/repositories/write.repository";
import { TInsertProduct } from "../../records/product.record";

export default class CategoryWriteRepository extends WriteRepository<'categories'> {
    protected readonly tableName = 'categories';
    protected readonly primaryKey: string = 'id';
    protected readonly softDelete: boolean = true;

}

class CategoryService {
    constructor(private readonly categoryWriteRepository: CategoryWriteRepository) { }

    public async create(data: TInsertProduct) {
        await this.categoryWriteRepository.create(data);
    }
}