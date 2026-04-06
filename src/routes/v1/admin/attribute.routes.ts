import { Router } from "express";
import { resolveSlug } from "../../../midllewares/resolve-slug.midlleware";
import { attributeAdminController } from "../../../boot/container";
import { resolveFormRequest } from "../../../midllewares/resolve-request.midlleware";
import { attributeStoreRequest } from "../../../http/v1/requests/attribute/attribute.store.request";
import { attributeUpdatedRequest } from "../../../http/v1/requests/attribute/attribute.update.request";


const router = Router();

router.param('slug', resolveSlug);

router.get('/', attributeAdminController.index);
router.post('/', resolveFormRequest(attributeStoreRequest), attributeAdminController.store);
router.get('/:slug', attributeAdminController.show);
router.patch('/:slug', resolveFormRequest(attributeUpdatedRequest), attributeAdminController.update);
router.delete('/:slug', attributeAdminController.destroy);

export default router;