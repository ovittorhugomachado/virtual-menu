export type Order = {
    id: number;
    storeId: number;
    customerName: string;
    customerPhone: string;
    address: string;
    deliveryType: "delivery" | "pickup";
    paymentMethod: "dinheiro" | "cartao" | "pix";
    totalAmount: string;
    status: string;
    createdAt: string;
    cancellationScheduledAt: string | null;
    expectedStatus: string | null;
    orderItems: OrderItem[];
};

export type OrderItem = {
    id: number;
    orderId: number;
    menuItemId: number;
    quantity: number;
    note?: string;
    menuItem: {
        name: string;
        price: string;
    };
};

export type OrderRequest = {
    storeId: number;
    customerName: string;
    customerPhone: string;
    typeOfDelivery: "delivery" | "pickup";
    address: string;
    paymentMethod: "pix" | "cartao" | "dinheiro";
    items: Array<{
        menuItemId: number;
        note?: string;
        optionIds: number[];
    }>;
};

export type DashboardCardOrdersProps = {
    orders: Order[];
    activePanel: number[];
    setActivePanel: React.Dispatch<React.SetStateAction<number[]>>;
    onAcceptOrder: (orderId: number) => void;
    onCancelOrder: (orderId: number) => void;
    onOrderReady: (orderId: number) => void;
    onOrderDelivered: (orderId: number) => void;
};

export type CountdownTimerProps = {
    createdAt: string;
    durationSeconds: number;
};