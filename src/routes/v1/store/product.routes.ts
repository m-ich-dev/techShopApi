import { productStoreController } from "@/boot/container.js";
import { catalogQuery } from "@/http/v1/request-queries/catalog/catalog.query.js";
import resolveReqQuery from "@/middlewares/resolvers/resolve-request-queries.middleware.js";
import { resolveSlug } from "@/middlewares/resolvers/resolve-slug.middleware.js";
import { Router } from "express";


const router = Router();

router.param('slug', resolveSlug);

router.get('/', resolveReqQuery(catalogQuery), productStoreController.index);
router.get('/:slug', productStoreController.show);

export default router;
