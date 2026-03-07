import { Router } from "express";
import brandRouter from './brand.routes';
import categoryRouter from './category.routes';
import productRouter from './product.routes';


const router = Router();

router.use('/brands', brandRouter);
router.use('/category', categoryRouter);
router.use('/products', productRouter);

export default router;