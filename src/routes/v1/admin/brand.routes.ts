import { Router } from "express";
import { brandAdminController } from "@/boot/container.js";
import { resolveFormRequest } from "@/midllewares/resolve-request.midlleware.js";
import { brandStoreRequest } from "@/http/v1/requests/brand/brand.store.request.js";
import { resolveSlug } from "@/midllewares/resolve-slug.midlleware.js";
import { brandUpdateRequest } from "@/http/v1/requests/brand/brand.update.request.js";


const router = Router();

router.param('slug', resolveSlug);

router.get('/', brandAdminController.index);
router.post('/', resolveFormRequest(brandStoreRequest), brandAdminController.store);
router.get('/:slug', brandAdminController.show);
router.patch('/:slug', resolveFormRequest(brandUpdateRequest), brandAdminController.update);
router.delete('/:slug', brandAdminController.destroy);

export default router;