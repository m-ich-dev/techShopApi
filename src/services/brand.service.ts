import BrandReadRepository from "../repositories/brand/brand.read.repository";


export class BrandService {
    constructor(private readonly brandReadRepository: BrandReadRepository) { }

    public async all() {
        const brands = await this.brandReadRepository.all({});
        return brands;
    }

    async showBySlug(slug: string) {
        const brand = await this.brandReadRepository.first({ column: 'slug', value: slug });
        return brand;
    }
}