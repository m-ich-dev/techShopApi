import { Router } from "express";
import brandRouter from "./brand.routes";


const router = Router();

router.use('/brands', brandRouter);

export default router;