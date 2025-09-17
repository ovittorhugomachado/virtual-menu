import { createContext, useContext } from "react";
import { GetMenuContextType } from "../../types/types-menu.d";

export const GetMenuContext = createContext<GetMenuContextType | undefined>(undefined);

export function useGetMenu() {
  const context = useContext(GetMenuContext);
  if (!context) {
    throw new Error("ManageMenu deve ser usado dentro do ManageMenuProvider");
  }
  return context;
}