import { Router } from "express";
import { resolveSlug } from "../../midllewares/resolve-slug.midlleware";
import adminRouter from './admin/index';

const v1Router = Router();

v1Router.param('slug', resolveSlug);

v1Router.use('/admin', adminRouter);

export default v1Router;