import { Router } from "express";
import { productController } from "../../boot/container";

const router = Router();

router.get('/', productController.index);
router.get('/', productController.show);

export default router;