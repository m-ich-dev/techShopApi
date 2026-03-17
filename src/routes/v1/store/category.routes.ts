import { Router } from "express";
import { resolveSlug } from "../../../midllewares/resolve-slug.midlleware";
import { categoryStoreController } from "../../../boot/container";


const router = Router();
router.param('slug', resolveSlug);

router.get('/', categoryStoreController.index);
router.get('/:slug', categoryStoreController.show);

export default router;