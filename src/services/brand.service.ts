import HTTPError from "../boot/http/http.error";
import BrandReadRepository from "../repositories/brand/brand.read.repository";
import Brand from "../views/brand.view";



export class BrandService {
    constructor(private readonly brandReadRepository: BrandReadRepository) { }

    public async all() {
        const brandRows = await this.brandReadRepository.all();
        return brandRows.map(row => new Brand(row));
    }
    public async show(param: string | number) {
        const brandRow = await this.brandReadRepository.find(param);
        if (!brandRow) throw HTTPError.notFound(`brand with param:${param} not found`);
        return new Brand(brandRow);
    }
}

export default new BrandService(new BrandReadRepository());