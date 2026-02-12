import { Router } from "express";
import { categoryController } from "../boot/container";
import { resolveSlug } from "../midllewares/resolve-slug.midlleware";


const router = Router();

router.param('slug', resolveSlug);

router.get('/categories', categoryController.index);
router.get('/categories/:slug', categoryController.show);


export default router;