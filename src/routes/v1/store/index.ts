import { Router } from "express";
import brandRouter from "./brand.routes";
import categoryRouter from "./category.routes";

const router = Router();

router.use('/brands', brandRouter);
router.use('/categories', categoryRouter);

export default router;