import { Router } from "express";
import { productAdminController } from "@/boot/container.js";
import { resolveSlug } from "@/midllewares/resolve-slug.midlleware.js";
import { resolveFormRequest } from "@/midllewares/resolve-request.midlleware.js";
import { productStoreRequest } from "@/http/v1/requests/product/product.store.request.js";
import { productUpdateRequest } from "@/http/v1/requests/product/product.update.request.js";


const router = Router();

router.param('slug', resolveSlug);

router.get('/', productAdminController.index);
router.post('/', resolveFormRequest(productStoreRequest), productAdminController.store);
router.get('/:slug', productAdminController.show);
router.patch('/:slug', resolveFormRequest(productUpdateRequest), productAdminController.update);
router.delete('/:slug', productAdminController.destroy);

export default router;