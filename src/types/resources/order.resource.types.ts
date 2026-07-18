export type TOrderResource = {
    id: number;
    totalPrice: number;
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
    createdAt: Date;
};