import { productStoreController } from "@/boot/container.js";
import { catalogQuery } from "@/http/v1/request-queries/catalog/catalog.query.js";
import resolveReqQuery from "@/middlewares/resolvers/resolve-request-queries.middleware.js";
import { Router } from "express";


const router = Router();

router.get('/', resolveReqQuery(catalogQuery), productStoreController.index);

export default router;