import { Router } from "express";
import { orderStoreController } from "@/boot/container.js";
import authMiddleware from "@/middlewares/auth/auth.middleware.js";
import { resolveFormRequest } from "@/middlewares/resolvers/resolve-request.middleware.js";
import { orderCheckoutRequest } from "@/http/v1/requests/order/order-checkout.request.js";


const router = Router();

router.use(authMiddleware);

router.post('/checkout', resolveFormRequest(orderCheckoutRequest), orderStoreController.checkout);

export default router;