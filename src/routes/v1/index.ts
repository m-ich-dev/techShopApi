import { Router } from "express";
import adminRouter from './admin/index';
import storeRouter from './store/index';

const v1Router = Router();

v1Router.use('/admin', adminRouter);
v1Router.use(storeRouter);

export default v1Router;