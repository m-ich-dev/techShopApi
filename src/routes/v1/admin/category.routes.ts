import { Router } from "express";
import { categoryAdminController } from "../../../boot/container";
import { resolveSlug } from "../../../midllewares/resolve-slug.midlleware";
import { resolveFormRequest } from "../../../midllewares/resolve-request.midlleware";
import { categoryStoreRequest } from "../../../http/v1/requests/category/category.store.request";
import { categoryUpdateRequest } from "../../../http/v1/requests/category/category.update.request";


const router = Router();
router.param('slug', resolveSlug);
router.get('/', categoryAdminController.index);
router.post('/', resolveFormRequest(categoryStoreRequest), categoryAdminController.store);
router.get('/:slug', categoryAdminController.show);
router.patch('/:slug', resolveFormRequest(categoryUpdateRequest), categoryAdminController.update);
router.delete('/:slug', categoryAdminController.destroy);

export default router;