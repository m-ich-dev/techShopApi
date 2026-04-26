import { Router } from "express";
import brandRouter from "@/routes/v1/store/brand.routes.js";
import categoryRouter from "@/routes/v1/store/category.routes.js";


const router = Router();

router.use('/brands', brandRouter);
router.use('/categories', categoryRouter);

export default router;