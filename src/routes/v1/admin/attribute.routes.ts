import { Router } from "express";
import { resolveSlug } from "@/middlewares/resolvers/resolve-slug.middleware.js";
import { attributeAdminController } from "@/boot/container.js";
import { resolveFormRequest } from "@/middlewares/resolvers/resolve-request.middleware.js";
import { attributeStoreRequest } from "@/http/v1/requests/attribute/attribute.store.request.js";
import { attributeUpdatedRequest } from "@/http/v1/requests/attribute/attribute.update.request.js";


const router = Router();

router.param('slug', resolveSlug);

router.get('/', attributeAdminController.index);
router.post('/', resolveFormRequest(attributeStoreRequest), attributeAdminController.store);
router.get('/:slug', attributeAdminController.show);
router.patch('/:slug', resolveFormRequest(attributeUpdatedRequest), attributeAdminController.update);
router.delete('/:slug', attributeAdminController.destroy);

export default router;