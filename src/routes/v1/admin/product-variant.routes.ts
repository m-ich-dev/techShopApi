import { Router } from "express";
import { resolveSlug } from "../../../midllewares/resolve-slug.midlleware";
import { productVariantAdminController } from "../../../boot/container";
import { resolveFormRequest } from "../../../midllewares/resolve-request.midlleware";
import { variantStoreRequest } from "../../../http/v1/requests/product-variant/product-variant.store.request";
import { variantUpdateRequest } from "../../../http/v1/requests/product-variant/product-variant.update.request";

const router = Router();

router.param('slug', resolveSlug);

router.get('/', productVariantAdminController.index);
router.post('/', resolveFormRequest(variantStoreRequest), productVariantAdminController.store);
router.get('/:slug', productVariantAdminController.show);
router.patch('/:slug', resolveFormRequest(variantUpdateRequest), productVariantAdminController.update);
router.delete('/:slug', productVariantAdminController.destroy);

export default router;