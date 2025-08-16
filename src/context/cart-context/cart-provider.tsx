import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "./cart-context";
import { Cart, CartItem } from "../../types/types-cart.d";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const { id } = useParams<{ id: string }>();
    const storeId = Number(id);

    const [cart, setCart] = useState<Cart>(() => {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : { items: [], total: 0 };
    });

    const filteredItems = cart.items.filter(item => item.storeId === storeId);
    const filteredTotal = filteredItems.reduce((acc, i) => acc + Number(i.price), 0);

    const addItem = (item: CartItem) => {
        const items = [...cart.items, item];
        const total = Number(items.reduce((acc, i) => acc + Number(i.price), 0));
        setCart({ items, total });
        localStorage.setItem("cart", JSON.stringify({ items, total }));
    };

    const removeItem = (id: number) => {
        const items = cart.items.filter(item => !(item.id === id && item.storeId === storeId));
        const total = Number(items.reduce((acc, i) => acc + Number(i.price), 0));
        setCart({ items, total });
        localStorage.setItem("cart", JSON.stringify({ items, total }));
    };

    const clearCart = () => {
        const items = cart.items.filter(item => item.storeId !== storeId);
        const total = Number(items.reduce((acc, i) => acc + Number(i.price), 0));
        setCart({ items, total });
        localStorage.setItem("cart", JSON.stringify({ items, total }));
    };

    return (
        <CartContext.Provider value={{
            cart: { items: filteredItems, total: filteredTotal },
            addItem,
            removeItem,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
};