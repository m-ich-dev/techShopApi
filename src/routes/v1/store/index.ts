import { Router } from "express";
// import brandRouter from "@/routes/v1/store/brand.routes.js";
// import categoryRouter from "@/routes/v1/store/category.routes.js";
import productRouter from "@/routes/v1/store/product.routes.js";
import cartRouter from "@/routes/v1/store/cart.routes.js";
import orderRouter from "@/routes/v1/store/order.routes.js";

const router = Router();

// router.use('/brands', brandRouter);
// router.use('/categories', categoryRouter);
router.use('/products', productRouter);
router.use('/cart', cartRouter);
router.use('/orders', orderRouter);
export default router;
