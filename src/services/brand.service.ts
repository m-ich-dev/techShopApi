import { TInsertable } from "../boot/database/schemas/index.schema";
import BrandRepository from "../repositories/brand/brand.repository";


export default class BrandService {
    constructor(private readonly brandRepository: BrandRepository) { }

    public async all() {
        const brands = await this.brandRepository.all({});
        return brands;
    }

    public async showBySlug(slug: string) {
        const brand = await this.brandRepository.first({ column: 'slug', value: slug });
        return brand;
    }
    public async store<D extends TInsertable['brands']>(data: D | D[]) {
        return this.brandRepository.insert(data);
    }
}