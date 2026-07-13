import { Router } from "express";
import { productAdminController } from "@/boot/container.js";
import { resolveSlug } from "@/middlewares/resolvers/resolve-slug.middleware.js";
import { resolveFormRequest } from "@/middlewares/resolvers/resolve-request.middleware.js";
import { productStoreRequest } from "@/http/v1/requests/product/product.store.request.js";
import { productUpdateRequest } from "@/http/v1/requests/product/product.update.request.js";
import resolveReqQuery from "@/middlewares/resolvers/resolve-request-queries.middleware.js";
import { paginateQuery } from "@/http/v1/request-queries/paginate.query.js";


const router = Router();

router.param('slug', resolveSlug);

router.get('/', resolveReqQuery(paginateQuery), productAdminController.index);
router.post('/', resolveFormRequest(productStoreRequest), productAdminController.store);
router.get('/:slug', productAdminController.show);
router.patch('/:slug', resolveFormRequest(productUpdateRequest), productAdminController.update);
router.delete('/:slug', productAdminController.destroy);

export default router;