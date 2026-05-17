import { authController } from "@/boot/container.js";
import { userLoginRequest } from "@/http/v1/requests/user/user.login.request.js";
import { userStoreRequest } from "@/http/v1/requests/user/user.store.request.js";
import authMiddleware from "@/middlewares/auth/auth.middleware.js";
import { resolveFormRequest } from "@/middlewares/resolvers/resolve-request.middleware.js";
import { Router } from "express";


const router = Router();

router.post('/login', resolveFormRequest(userLoginRequest), authController.login);
router.post('/register', resolveFormRequest(userStoreRequest), authController.register);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);
router.get('/me', authMiddleware, authController.me);

export default router;