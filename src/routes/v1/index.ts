import { Router } from "express";
import adminRouter from '@/routes/v1/admin/index.js';
import storeRouter from '@/routes/v1/store/index.js';
import authRouter from '@/routes/v1/auth.routes.js';
import authMiddleware from "@/middlewares/auth/auth.middleware.js";
import roleMiddleware from "@/middlewares/auth/role.middleware.js";


const v1Router = Router();

v1Router.use('/admin', authMiddleware, roleMiddleware([1, 0]), adminRouter);
v1Router.use(storeRouter);
v1Router.use('/auth', authRouter);
export default v1Router;