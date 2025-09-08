import { createContext, useContext } from "react";
import { RestaurantDataContextType } from "../../types/types-restaurante-data.d";

export const RestaurantDataContext = createContext<RestaurantDataContextType | undefined>(undefined);

export function useRestaurantData() {
  const context = useContext(RestaurantDataContext);
  if (!context) {
    throw new Error("ManageMenu deve ser usado dentro do ManageMenuProvider");
  }
  return context;
}