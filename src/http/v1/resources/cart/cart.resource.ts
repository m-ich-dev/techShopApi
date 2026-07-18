import Resource from "@/boot/http/resource.js";
import type { TCartResource } from "@/types/resources/cart.resource.types.js";


type TCartInput = {
    id: number;
    quantity: number;
    variant: {
        id: number;
        title: string;
        slug: string;
        stock: number;
        price: {
            current: number;
            old: number | null;
        } | null;
    } | null;
};


export default class CartResource extends Resource {
    public static override transform(data: TCartInput): TCartResource {
        return {
            id: data.id,
            quantity: data.quantity,
            variant: data.variant
        };
    }
}