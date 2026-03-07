import { Router } from "express";
import { productAdminController } from "../../../boot/container";


const router = Router();

router.get('/', productAdminController.index);
router.get('/', productAdminController.show);

export default router;