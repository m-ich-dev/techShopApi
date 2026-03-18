import { Router } from "express";
import brandRouter from './brand.routes';
import categoryRouter from './category.routes';
import productRouter from './product.routes';
import attributeRouter from './attribute.routes';

const router = Router();

router.use('/brands', brandRouter);
router.use('/categories', categoryRouter);
router.use('/products', productRouter);
router.use('/attributes', attributeRouter);

export default router;