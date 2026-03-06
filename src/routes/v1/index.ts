import { Router } from "express";
import { resolveSlug } from "../../midllewares/resolve-slug.midlleware";
import brandRouter from '../v1/brand.routes';
import categoryRouter from '../v1/category.routes';
import productRouter from '../v1/product.routes';


const v1Router = Router();

v1Router.param('slug', resolveSlug);

v1Router.use('/brands', brandRouter);
v1Router.use('/category', categoryRouter);
v1Router.use('/products', productRouter);

export default v1Router;