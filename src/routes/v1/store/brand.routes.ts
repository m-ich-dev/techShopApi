import { Router } from "express";
import { brandStoreController } from "@/boot/container.js";
import { resolveSlug } from "@/midllewares/resolve-slug.midlleware.js";


const router = Router();

router.param('slug', resolveSlug);

router.get('/', brandStoreController.index);
router.get('/:slug', brandStoreController.show);

export default router;