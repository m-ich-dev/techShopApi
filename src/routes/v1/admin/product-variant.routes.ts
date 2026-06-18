import { Router } from "express";
import { resolveSlug } from "@/middlewares/resolvers/resolve-slug.middleware.js";
import { productVariantAdminController } from "@/boot/container.js";
import { resolveFormRequest } from "@/middlewares/resolvers/resolve-request.middleware.js";
import { variantStoreRequest } from "@/http/v1/requests/product-variant/product-variant.store.request.js";
import { variantUpdateRequest } from "@/http/v1/requests/product-variant/product-variant.update.request.js";
import resolveReqQuery from "@/middlewares/resolvers/resolve-request-queries.middleware.js";
import { paginateQuery } from "@/http/v1/request-queries/paginate.query.js";


const router = Router();

router.param('slug', resolveSlug);

router.get('/', resolveReqQuery(paginateQuery), productVariantAdminController.index);
router.post('/', resolveFormRequest(variantStoreRequest), productVariantAdminController.store);
router.get('/:slug', productVariantAdminController.show);
router.patch('/:slug', resolveFormRequest(variantUpdateRequest), productVariantAdminController.update);
router.delete('/:slug', productVariantAdminController.destroy);

export default router;