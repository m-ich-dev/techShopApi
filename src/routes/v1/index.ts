import { Router } from "express";
import adminRouter from '@/routes/v1/admin/index.js';
import storeRouter from '@/routes/v1/store/index.js';


const v1Router = Router();

v1Router.use('/admin', adminRouter);
v1Router.use(storeRouter);

export default v1Router;