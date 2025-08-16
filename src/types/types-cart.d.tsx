export type CartItem = {
    storeId: number;
    id: number;
    name: string;
    price: number;
    quantity?: number;
};

export type Cart = {
    items: CartItem[];
    total: number;
};