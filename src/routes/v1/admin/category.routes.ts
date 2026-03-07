import { Router } from "express";
import { categoryAdminController } from "../../../boot/container";


const router = Router();

router.get('/', categoryAdminController.index);
router.get('/:slug', categoryAdminController.show);

export default router;