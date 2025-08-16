import { Order, OrderRequest } from "../types/types-orders.d";

const API_URL = import.meta.env.VITE_API_URL;

export const getOrdersService = async (limit: number = 1000, offset: number = 0): Promise<Order[]> => {
    try {
        const response = await fetch(`${API_URL}/order/list?limit=${limit}&offset=${offset}`, {
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
        return [];
    }
};

export const createOrder = async (order: OrderRequest) => {
    const response = await fetch(`${API_URL}/order/${order.storeId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
    });

    if (!response.ok) {
        throw new Error("Erro ao criar pedido");
    }

    return await response.json();
};

export const cancelOrderService = async (orderId: number) => {
    try {
        const response = await fetch(`${API_URL}/order/${orderId}/cancel`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Erro ao cancelar pedido');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao cancelar pedido:', error);
        throw error;
    }
};
export const acceptOrderService = async (orderId: number) => {
    try {
        const response = await fetch(`${API_URL}/order/${orderId}/accept`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Erro ao aceitar pedido');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao aceitar pedido:', error);
        throw error;
    }
};

export const readyOrderService = async (orderId: number) => {
    try {
        const response = await fetch(`${API_URL}/order/${orderId}/ready`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Erro ao atalizar status do pedido');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao atalizar status do pedido:', error);
        throw error;
    }
};

export const deliveredOrderService = async (orderId: number) => {
    try {
        const response = await fetch(`${API_URL}/order/${orderId}/delivered`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Erro ao atalizar status do pedido');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao atalizar status do pedido:', error);
        throw error;
    }
};