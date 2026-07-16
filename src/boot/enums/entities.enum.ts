import type { IDatabase } from "@/boot/database/schemas/index.schema.js";


export const ENTITY_BY_TABLE: Record<keyof IDatabase, string> = {
    categories: 'category',
    brands: 'brand',
    attributes: 'attribute',
    prices: 'price',
    products: 'product',
    productVariants: 'product variant',
    productVariantAttributes: 'product variant attribute',
    users: 'user',
    refreshTokens: 'refresh token',
    orderStatuses: 'order status',
    orders: 'order',
    orderItems: 'order item',
    cart: 'cart',
    bookmarks: 'bookmark'
} as const;
