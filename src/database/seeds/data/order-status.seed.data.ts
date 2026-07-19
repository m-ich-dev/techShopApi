import type { TInsertOrderStatus } from "@/boot/database/schemas/order-status.schema.js";


export const orderStatusSeedData: TInsertOrderStatus[] = [
    { title: 'pending', description: 'Заказ создан, ожидает оплаты' },
    { title: 'paid', description: 'Заказ оплачен' },
    { title: 'shipped', description: 'Заказ отправлен' },
    { title: 'delivered', description: 'Заказ доставлен' },
    { title: 'cancelled', description: 'Заказ отменён' },
];