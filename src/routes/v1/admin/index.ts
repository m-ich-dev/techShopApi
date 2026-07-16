import { Router } from "express";
import brandRouter from '@/routes/v1/admin/brand.routes.js';
import categoryRouter from '@/routes/v1/admin/category.routes.js';
import productRouter from '@/routes/v1/admin/product.routes.js';
import attributeRouter from '@/routes/v1/admin/attribute.routes.js';
import variantRouter from '@/routes/v1/admin/product-variant.routes.js';
import orderStatusRouter from '@/routes/v1/admin/order-status.routes.js';


const router = Router();

router.use('/brands', brandRouter);
router.use('/categories', categoryRouter);
router.use('/products', productRouter);
router.use('/attributes', attributeRouter);
router.use('/product-variant', variantRouter);
router.use('/order-statuses', orderStatusRouter);

export default router;