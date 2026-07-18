import { Router } from "express";
import { orderStoreController } from "@/boot/container.js";
import authMiddleware from "@/middlewares/auth/auth.middleware.js";
import { resolveFormRequest } from "@/middlewares/resolvers/resolve-request.middleware.js";
import { orderCheckoutRequest } from "@/http/v1/requests/order/order-checkout.request.js";
import { resolveId } from "@/middlewares/resolvers/resolve-id.middleware.js";
import resolveReqQuery from "@/middlewares/resolvers/resolve-request-queries.middleware.js";
import { paginateQuery } from "@/http/v1/request-queries/paginate.query.js";


const router = Router();

router.use(authMiddleware);

router.get('/', resolveReqQuery(paginateQuery), orderStoreController.index);
router.get('/:id', resolveId, orderStoreController.show);
router.post('/checkout', resolveFormRequest(orderCheckoutRequest), orderStoreController.checkout);

export default router;