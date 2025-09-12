//TIPOS DE ESTILO
export type StyleStorePage = {
  theme: 'dark' | 'light';
  id: number;
  storeId: number;
  backgroundColor: string;
  primaryColor: string;
  textButtonColor: string;
};

//TIPOS DA CATEGORIA ----------------------------
export type CategoryData = {
  id: number;
  storeId?: number;
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
};

//TIPOS DO ITEM ----------------------------
export type MenuItem = {
  storeId?: number;
  id?: number;
  name: string;
  description: string;
  price: number;
  photoUrl?: string;
  categoryId: number[];
  categories?: CategoryData[];
  optionGroupId?: number[];
  optionsGroups?: OptionGroup[];
  
};

export type MenuItemsContainerProps = {
  storeId: number;
  categories: CategoryData[];
  backgroundColor: string;
  buttonColor: string;
  onCategoryCreated?: (newCategory: CategoryData) => void;
};

//TIPOS DO GRUPO DE OPCIONAIS -----------------------------------
export type OptionGroup = {
  id: number;
  storeId: number;
  title: string;
  required: boolean;
  options: Option[];
  maxSelectableOptions?: number;
  menuItem: number[]
};

//TIPOS DO OPCIONAL-----------------------------------------
export type Option = {
  id: number;
  storeId: number;
  name: string;
  additionalPrice: number;
  menuItemOptionGroup: number[];
};

//TIPOS DO MENU CONTEXT-----------------------------
export type ManageMenuContextType = {
  error: string | null;
  isLoading: boolean;
  //PROPRIEDADES DO ESTILO DA LOJA --------------------------
  styleStore?: StyleStorePage;
  tempBackgroundColor: string;
  setTempBackgroundColor: (color: string) => void;
  tempButtonColor: string;
  setTempButtonColor: (color: string) => void;
  tempTextColorButtons: string;
  setTempTextColorButtons: (color: string) => void;
  updateStyleStore: (style: StyleStorePage) => Promise<void>;

  //PROPRIEDADES DAS CATEGORIAS -----------------------------
  categories: CategoryData[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryData[]>>;
  createCategory: (name: string, menuItemIds: number[]) => Promise<void>;
  updateCategory: (categoryId: number, name: string, menuItemIds: number[]) => Promise<void>;
  deleteCategory: (categoryId: number) => Promise<void>;
  toggleStatusCategory: (categoryId: number) => Promise<void>;
  reorderCategories: (orderedCategories: { id: number; order: number }[]) => Promise<void>;

  //PROPRIEDADES DOS ITENS DO MENU ---------------------------
  menuItems: MenuItem[];
  createMenuItem: (item: MenuItem) => Promise<void>;
  updateMenuItem: (itemId: number, item: MenuItem) => Promise<void>;
  deleteMenuItem: (itemId: number) => Promise<void>;
  toggleStatusMenuItem: (categoryId: number, itemId: number) => Promise<void>;

  //PROPRIEDADES DOS GRUPOS DE OPCIONAIS ---------------------------
  optionsGroups: OptionGroup[];
  // createOptionGroup: (group: OptionGroup) => Promise<void>;
};