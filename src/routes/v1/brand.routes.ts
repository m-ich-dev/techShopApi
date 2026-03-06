import { Router } from "express";
import { brandController } from "../../boot/container";


const router = Router();

router.get('/', brandController.index);
router.get('/:slug', brandController.show);

export default router;