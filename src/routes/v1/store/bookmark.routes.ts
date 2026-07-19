import { Router } from "express";
import { bookmarkStoreController } from "@/boot/container.js";
import authMiddleware from "@/middlewares/auth/auth.middleware.js";
import { resolveFormRequest } from "@/middlewares/resolvers/resolve-request.middleware.js";
import { bookmarkToggleRequest } from "@/http/v1/requests/bookmark/bookmark-toggle.request.js";


const router = Router();

router.use(authMiddleware);

router.get('/', bookmarkStoreController.index);
router.post('/toggle', resolveFormRequest(bookmarkToggleRequest), bookmarkStoreController.toggle);

export default router;