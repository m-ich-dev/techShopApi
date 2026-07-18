import Resource from "@/boot/http/resource.js";
import type { TOrderResource } from "@/types/resources/order.resource.types.js";


type TOrderInput = {
    id: number;
    userId: string;
    orderStatusId: number;
    totalPrice: number;
    shippingAddress: string;
    paymentMethod: string;
    createdAt: Date;
    updatedAt: Date;
    status: {
        id: number;
        title: string;
    } | null;
    items: {
        id: number;
        productVariantId: number;
        title: string;
        quantity: number;
        price: number;
    }[];
};


export default class OrderResource extends Resource {
    public static override transform(data: TOrderInput): TOrderResource {
        return {
            id: data.id,
            totalPrice: data.totalPrice,
            status: data.status,
            items: data.items,
            createdAt: data.createdAt
        };
    }
}