import { Router } from "express";
import { brandController, categoryController, productController } from "../boot/container";
import { resolveSlug } from "../midllewares/resolve-slug.midlleware";


const router = Router();

router.param('slug', resolveSlug);

router.get('/categories', categoryController.index);
router.get('/categories/:slug', categoryController.show);

router.get('/brands', brandController.index);
router.get('/brands/:slug', brandController.show);

router.get('/products', productController.index);
router.get('/products/:slug', productController.show);


export default router;