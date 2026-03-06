import { Router } from "express";
import { categoryController } from "../../boot/container";

const router = Router();

router.get('/', categoryController.index);
router.get('/:slug', categoryController.show);

export default router;