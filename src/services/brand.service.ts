import BrandReadRepository from "../repositories/brand/brand.read.repository";


export class BrandService {
    constructor(private readonly brandReadRepository: BrandReadRepository) { }

    public async all() {
        const brands = await this.brandReadRepository.all();
        return brands;
    }
    public async showBySlug(param: string) {
        const brand = await this.brandReadRepository.find('slug', param);
        return brand;
    }
}