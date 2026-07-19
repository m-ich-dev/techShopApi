import OrderListResource from "@/http/v1/resources/order/order.list.resource.js";
import type { TOrderShowResource, TOrderItemResource } from "@/types/resources/order.resource.types.js";


type TOrderShowInput = {
    id: number;
    totalPrice: number;
    createdAt: Date;
    status: {
        id: number;
        title: string;
    } | null;
    items: TOrderItemResource[];
};


export default class OrderShowResource extends OrderListResource {
    public static override transform(data: TOrderShowInput): TOrderShowResource {
        const base = super.transform(data);

        return {
            ...base,
            items: data.items
        };
    }
}