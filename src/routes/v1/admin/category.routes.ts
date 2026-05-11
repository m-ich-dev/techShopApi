import { Router } from "express";
import { categoryAdminController } from "@/boot/container.js";
import { resolveSlug } from "@/middlewares/resolvers/resolve-slug.middleware.js";
import { resolveFormRequest } from "@/middlewares/resolvers/resolve-request.middleware.js";
import { categoryStoreRequest } from "@/http/v1/requests/category/category.store.request.js";
import { categoryUpdateRequest } from "@/http/v1/requests/category/category.update.request.js";


const router = Router();

router.param('slug', resolveSlug);

router.get('/', categoryAdminController.index);
router.post('/', resolveFormRequest(categoryStoreRequest), categoryAdminController.store);
router.get('/:slug', categoryAdminController.show);
router.patch('/:slug', resolveFormRequest(categoryUpdateRequest), categoryAdminController.update);
router.delete('/:slug', categoryAdminController.destroy);

export default router;