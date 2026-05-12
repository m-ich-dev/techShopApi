import { Router } from "express";
import adminRouter from '@/routes/v1/admin/index.js';
import storeRouter from '@/routes/v1/store/index.js';
import authMiddleware from "@/middlewares/auth/auth.middleware.js";
import roleMiddleware from "@/middlewares/auth/role.middleware.js";


const v1Router = Router();

v1Router.use('/admin', authMiddleware, roleMiddleware([1, 0]), adminRouter);
v1Router.use(storeRouter);

export default v1Router;