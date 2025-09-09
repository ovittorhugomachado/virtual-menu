import { createContext, useContext } from "react";
import { ManageMenuContextType } from "../../types/types-menu.d";

export const ManageMenuContext = createContext<ManageMenuContextType | undefined>(undefined);

export function useManageMenu() {
  const context = useContext(ManageMenuContext);
  if (!context) {
    throw new Error("ManageMenu deve ser usado dentro do ManageMenuProvider");
  }
  return context;
}