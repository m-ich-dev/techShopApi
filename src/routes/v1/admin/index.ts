import { Router } from "express";
import brandRouter from '@/routes/v1/admin/brand.routes.js';
import categoryRouter from '@/routes/v1/admin/category.routes.js';
import productRouter from '@/routes/v1/admin/product.routes.js';
import attributeRouter from '@/routes/v1/admin/attribute.routes.js';
import variantRouter from '@/routes/v1/admin/product-variant.routes.js';


const router = Router();

router.use('/brands', brandRouter);
router.use('/categories', categoryRouter);
router.use('/products', productRouter);
router.use('/attributes', attributeRouter);
router.use('/product-variant', variantRouter);

export default router;