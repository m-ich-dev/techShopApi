import { Router } from "express";
import { orderStatusAdminController } from "@/boot/container.js";
import { resolveFormRequest } from "@/middlewares/resolvers/resolve-request.middleware.js";
import { orderStatusStoreRequest } from "@/http/v1/requests/order-status/order-status.store.request.js";
import { orderStatusUpdateRequest } from "@/http/v1/requests/order-status/order-status.update.request.js";
import resolveReqQuery from "@/middlewares/resolvers/resolve-request-queries.middleware.js";
import { paginateQuery } from "@/http/v1/request-queries/paginate.query.js";


const router = Router();

router.get('/', resolveReqQuery(paginateQuery), orderStatusAdminController.index);
router.post('/', resolveFormRequest(orderStatusStoreRequest), orderStatusAdminController.store);
router.get('/:id', orderStatusAdminController.show);
router.patch('/:id', resolveFormRequest(orderStatusUpdateRequest), orderStatusAdminController.update);
router.delete('/:id', orderStatusAdminController.destroy);

export default router;