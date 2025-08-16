import { createContext, useContext } from "react";
import { Cart, CartItem } from "../../types/types-cart.d";

export const CartContext = createContext<{
    cart: Cart;
    addItem: (item: CartItem) => void;
    removeItem: (id: number) => void;
    clearCart: () => void;
}>({
    cart: { items: [], total: 0 },
    addItem: () => {},
    removeItem: () => {},
    clearCart: () => {},
});

export const useCart = () => useContext(CartContext);