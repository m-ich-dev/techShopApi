import { Router } from "express";
import { resolveSlug } from "../../../midllewares/resolve-slug.midlleware";
import { attributeAdminController } from "../../../boot/container";


const router = Router();

router.param('slug', resolveSlug);

router.get('/', attributeAdminController.index);
router.post('/', attributeAdminController.store);
router.get('/:slug', attributeAdminController.show);
router.patch('/:slug', attributeAdminController.update);
router.delete('/:slug', attributeAdminController.destroy);

export default router;