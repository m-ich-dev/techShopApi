import z from "zod";
import { orderStatusStoreRequest } from "@/http/v1/requests/order-status/order-status.store.request.js";


export const orderStatusUpdateRequest = orderStatusStoreRequest.partial();
export type TOrderStatusUpdateRequest = z.infer<typeof orderStatusUpdateRequest>;