import { ReactNode, useEffect, useState } from "react";
import { CategoryData } from "../../types/types-menu.d";
import { ManageMenuContext } from "./manage-menu-context";
import {
  createCategoryService,
  updateCategoryService,
  deleteCategoryService,
  toggleStatusCategoryService,
  getCategoriesMyStore
} from "../../services/service-manage-menu-store";

export const ManageMenuProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<CategoryData[]>([]);

  const fetchCategories = async () => {
    const data = await getCategoriesMyStore();
    setCategories(data);
  };

  const createCategory = async (name: string, menuItemIds: number[]) => {
    await createCategoryService(name, menuItemIds);
    await fetchCategories();
  };

  const updateCategory = async (categoryId: number, name: string, menuItemIds: number[]) => {
    await updateCategoryService(categoryId, name, menuItemIds);
    await fetchCategories();
  };

  const deleteCategory = async (categoryId: number) => {
    await deleteCategoryService(categoryId);
    await fetchCategories();
  };

  const toggleStatusCategory = async (categoryId: number) => {
    await toggleStatusCategoryService(categoryId);
    await fetchCategories();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <ManageMenuContext.Provider
      value={{
        categories,
        setCategories,
        createCategory,
        updateCategory,
        deleteCategory,
        toggleStatusCategory
      }}
    >
      {children}
    </ManageMenuContext.Provider>
  );
};