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
  onToggleStatusCategory: (categoryId: number) => Promise<void>;
  onCategoryCreated?: (newCategory: CategoryData) => void;
}
