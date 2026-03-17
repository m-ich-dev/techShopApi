import { Router } from "express";
import { categoryAdminController } from "../../../boot/container";
import { resolveSlug } from "../../../midllewares/resolve-slug.midlleware";


const router = Router();
router.param('slug', resolveSlug);
router.get('/', categoryAdminController.index);
router.post('/', categoryAdminController.store);
router.get('/:slug', categoryAdminController.show);
router.get('/:slug', categoryAdminController.update);
router.delete('/:slug', categoryAdminController.destroy);

export default router;