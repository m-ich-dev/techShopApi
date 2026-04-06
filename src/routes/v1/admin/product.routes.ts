import { Router } from "express";
import { productAdminController } from "../../../boot/container";
import { resolveSlug } from "../../../midllewares/resolve-slug.midlleware";


const router = Router();
router.param('slug', resolveSlug);
router.get('/', productAdminController.index);
router.post('/', productAdminController.store);
router.get('/:slug', productAdminController.show);
router.patch('/:slug', productAdminController.update);
router.delete('/:slug', productAdminController.destroy);

export default router;