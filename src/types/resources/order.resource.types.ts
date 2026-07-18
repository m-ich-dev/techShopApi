export type TOrderItemResource = {
    id: number;
    productVariantId: number;
    title: string;
    quantity: number;
    price: number;
};

export type TOrderStatusResource = {
    id: number;
    title: string;
};

export type TOrderListResource = {
    id: number;
    totalPrice: number;
    status: TOrderStatusResource | null;
    createdAt: Date;
};

export type TOrderShowResource = TOrderListResource & {
    items: TOrderItemResource[];
};