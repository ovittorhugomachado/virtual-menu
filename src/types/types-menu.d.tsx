export type Category = {
  id: number;
  name: string;
  isAvailable: boolean;
  order: number;
};

export type CategoryButtonsProps = {
  categories: Category[];
  setCategories?: React.Dispatch<React.SetStateAction<Category[]>>;
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
};

export type MenuItemsContainerProps = {
  storeId: number;
  categories: Category[];
  backgroundColor: string;
  buttonColor: string;
}

