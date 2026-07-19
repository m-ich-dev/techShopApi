import Resource from "@/boot/http/resource.js";
import type { TOrderListResource } from "@/types/resources/order.resource.types.js";


type TOrderListInput = {
    id: number;
    totalPrice: number;
    createdAt: Date;
    status: {
        id: number;
        title: string;
    } | null;
};


export default class OrderListResource extends Resource {
    public static override transform(data: TOrderListInput): TOrderListResource {
        return {
            id: data.id,
            totalPrice: data.totalPrice,
            status: data.status,
            createdAt: data.createdAt
        };
    }
}