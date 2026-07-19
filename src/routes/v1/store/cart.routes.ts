import { Router } from "express";
import { cartStoreController } from "@/boot/container.js";
import authMiddleware from "@/middlewares/auth/auth.middleware.js";
import { resolveId } from "@/middlewares/resolvers/resolve-id.middleware.js";
import { resolveFormRequest } from "@/middlewares/resolvers/resolve-request.middleware.js";
import { cartAddRequest } from "@/http/v1/requests/cart/cart-add.request.js";
import { cartUpdateRequest } from "@/http/v1/requests/cart/cart-update.request.js";


const router = Router();

router.use(authMiddleware);
router.param('id', resolveId);

router.get('/', cartStoreController.index);
router.post('/', resolveFormRequest(cartAddRequest), cartStoreController.add);
router.patch('/:id', resolveFormRequest(cartUpdateRequest), cartStoreController.update);
router.delete('/:id', cartStoreController.destroy);

export default router;