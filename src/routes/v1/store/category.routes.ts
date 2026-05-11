import { Router } from "express";
import { resolveSlug } from "@/middlewares/resolvers/resolve-slug.middleware.js";
import { categoryStoreController } from "@/boot/container.js";


const router = Router();
router.param('slug', resolveSlug);

router.get('/', categoryStoreController.index);
router.get('/:slug', categoryStoreController.show);

export default router;