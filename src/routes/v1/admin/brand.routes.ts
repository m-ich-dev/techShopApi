import { Router } from "express";
import { brandAdminController } from "../../../boot/container";


const router = Router();

router.get('/', brandAdminController.index);
router.get('/:slug', brandAdminController.show);

export default router;