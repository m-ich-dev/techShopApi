import type { Transaction } from "kysely";
import Service from "@/boot/service.js";
import { GenerateSlug } from "@/boot/mixins/service/sluggable-service.mixin.js";
import CatalogFilter from "@/http/v1/filters/catalog.filter.js";
import type { IDatabase } from "@/boot/database/schemas/index.schema.js";
import HTTPError from "@/boot/http/http.error.js";
import slugify from "@/boot/utils/slugify.js";
import type ProductRepository from "@/repositories/product/product.repository.js";
import type PriceRepository from "@/repositories/price/price.repository.js";
import type ProductVariantRepository from "@/repositories/product-variant/product-variant.repository.js";
import type ProductVariantAttributeRepository from "@/repositories/product-variant-attribute/product-variant-attribute.repository.js";
import type { TProductStoreRequest } from "@/http/v1/requests/product/product.store.request.js";
import type { TProductUpdateRequest } from "@/http/v1/requests/product/product.update.request.js";
import type { TMasterProductRequest } from "@/http/v1/requests/product/master-product.request.js";
import type { TPaginateParams } from "@/boot/types/repository.types.js";
import type { TCatalogFilters } from "@/types/filters/catalog-filter.types.js";


type TVariantRecord = Awaited<ReturnType<ProductVariantRepository['first']>>;

export default class ProductService extends GenerateSlug(Service) {
    constructor(
        private readonly productRepository: ProductRepository,
        private readonly variantRepository: ProductVariantRepository,
        private readonly priceRepository: PriceRepository,
        private readonly variantAttributeRepository: ProductVariantAttributeRepository,
    ) { super(); }

    public async all(
        {
            page,
            limit,
            withTrash = false
        }:
            TPaginateParams
    ) {
        const productData = await this.productRepository.paginate({ page, limit, withTrash });
        return productData;
    }

    public async catalog({
        page,
        limit,
        withTrash,
        filters = {}
    }: {
        page?: number;
        limit?: number;
        withTrash?: boolean;
        filters: TCatalogFilters;
    }) {
        const filter = new CatalogFilter(filters);
        return await this.variantRepository.paginatePivot({
            page,
            limit,
            withTrash,
            build: (qb) => filter.apply(qb)
        });
    }

    public async allPivot(
        {
            page = 1,
            limit = 15,
            withTrash = false
        }:
            TPaginateParams
    ) {
        const productData = await this.productRepository.paginatePivot({ page, limit, withTrash });
        return productData;
    }

    public async show(slug: string) {
        const product = await this.productRepository.first({ column: 'slug', value: slug });
        return product;
    }

    public async masterShow(slug: string) {
        return await this.variantRepository.firstWithPivot({
            column: 'slug',
            value: slug,
            withAttrs: true
        });
    }

    public async showPivotBySlug(slug: string) {
        const product = await this.productRepository.firstWithPivot({ column: 'slug', value: slug });
        return product;
    }

    public async store(data: TProductStoreRequest) {
        const slug = await this.generateSlug(this.productRepository, data.title);
        const insertData = {
            ...data, slug
        };
        return this.productRepository.insert(insertData);
    }

    public async update(data: TProductUpdateRequest, slug: string) {
        let updateData = data;
        if (updateData.title) {
            const updateSlug = await this.generateSlug(this.productRepository, updateData.title);
            updateData = {
                ...data, slug: updateSlug
            };
        }
        const product = await this.productRepository.update(updateData, { column: 'slug', value: slug });
        return product;
    }

    public async delete(slug: string) {
        const result = await this.productRepository.softDelete({ column: 'slug', value: slug });
        return result;
    }

    public async masterCreate(dto: TMasterProductRequest): Promise<TVariantRecord | TVariantRecord[]> {
        return await this.productRepository.transaction(async (trx) => {
            const parentId = await this.resolveParentId(dto, trx);

            await this.assertVariantsNotExists(parentId, dto.variants, trx);

            const created: TVariantRecord[] = [];

            for (const variantDto of dto.variants) {
                const slug = await this.generateSlug(this.variantRepository, variantDto.title);

                const variant = await this.variantRepository.insert({
                    parentId,
                    title: variantDto.title,
                    slug,
                    stock: variantDto.stock,
                    currentPriceId: null
                }, trx);

                const price = await this.priceRepository.insert({
                    productVariantId: variant.id,
                    price: variantDto.price,
                    oldPrice: variantDto.oldPrice ?? null
                }, trx);

                const updatedVariant = await this.variantRepository.update(
                    { currentPriceId: price.id },
                    { column: 'id', value: variant.id },
                    trx
                );

                if (variantDto.attributes.length > 0) {
                    await this.variantAttributeRepository.bulkInsert(
                        variantDto.attributes.map(attr => ({
                            productVariantId: variant.id,
                            attributeId: attr.id,
                            value: attr.value
                        })),
                        trx
                    );
                }

                created.push(updatedVariant);
            }

            return created.length === 1 ? created[0]! : created;
        });
    }

    private async resolveParentId(dto: TMasterProductRequest, trx: Transaction<IDatabase>): Promise<number> {
        if (dto.type === 'attach') {
            const parent = await this.productRepository.first(
                { column: 'id', value: dto.parentId },
                trx
            );
            return parent.id;
        }

        // Проверка конфликта по slugify(title) ДО generateSlug.
        // Поиск через LIKE по base slug находит и записи с числовыми суффиксами
        // (накопленные дубли), а фильтр slugify(title) === candidateSlug
        // отсекает ложные совпадения (например "iphone-15-pro" для "iphone-15").
        const candidateSlug = slugify(dto.parent.title);
        const searchResult = await this.productRepository.paginate(
            {
                page: 1,
                limit: 100,
                withTrash: true,
                build: (qb) => qb.where('t.slug', 'like', `${candidateSlug}%`)
            },
            trx
        );
        const conflicts = searchResult.data.filter(p => slugify(p.title) === candidateSlug);

        if (conflicts.length > 0) {
            const existingParentId = conflicts[0]!.id;
            throw HTTPError.conflict({
                message: 'Product with this title already exists',
                detail: { path: 'parent.title', message: `product already exists with id ${existingParentId}, use type "attach" with parentId ${existingParentId}` }
            });
        }

        const slug = await this.generateSlug(this.productRepository, dto.parent.title);
        const parent = await this.productRepository.insert(
            {
                categoryId: dto.parent.categoryId,
                brandId: dto.parent.brandId,
                title: dto.parent.title,
                slug
            },
            trx
        );
        return parent.id;
    }

    private async assertVariantsNotExists(
        parentId: number,
        variants: TMasterProductRequest['variants'],
        trx: Transaction<IDatabase>
    ): Promise<void> {
        const existing = await this.variantRepository.get(
            { column: 'parentId', value: parentId, withTrash: true },
            trx
        );

        const existingSlugs = new Set(existing.map(v => slugify(v.title)));

        const conflicts = variants
            .filter(v => existingSlugs.has(slugify(v.title)))
            .map(v => v.title);

        if (conflicts.length > 0) {
            throw HTTPError.conflict({
                message: 'Product variants with these titles already exist for this product',
                detail: conflicts.map(title => ({
                    path: 'variants',
                    message: `variant with title "${title}" already exists under parent id ${parentId}`
                }))
            });
        }
    }
}
