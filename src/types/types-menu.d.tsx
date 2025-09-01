export type CategoryData = {
  id: number;
  name: string;
  isAvailable?: boolean;
  order?: number;
  menuItems?: number[]
};

export type CategoryButtonsProps = {
  categories: CategoryData[];
  setCategories?: React.Dispatch<React.SetStateAction<CategoryData[]>>;
  buttonColor?: string;
  textColor?: string;
  moveCategoryUp?: () => void;
  moveCategoryDown?: () => void;
}

export type MenuItem = {
  storeId: number;
  id: number;
  name: string;
  description: string;
  price: number;
  photoUrl: string;
  categoryId: number;
  categories?: CategoryData[];
};

export type MenuItemsContainerProps = {
  storeId: number;
  categories: CategoryData[];
  backgroundColor: string;
  buttonColor: string;
  onCategoryCreated?: (newCategory: CategoryData) => void;
}

export type manageMenuContextType = {
  categories: CategoryData[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryData[]>>;
  createCategory: (name: string, menuItemIds: number[]) => Promise<void>;
  updateCategory: (categoryId: number, name: string, menuItemIds: number[]) => Promise<void>;
  deleteCategory: (categoryId: number) => Promise<void>;
  toggleStatusCategory: (categoryId: number) => Promise<void>;
};