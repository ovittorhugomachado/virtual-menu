import { ReactNode, useEffect, useState } from "react";
import { CategoryData, MenuItem, StyleStorePage, /*OptionGroup, Option*/ } from "../../types/types-menu.d";
import { ManageMenuContext } from "./manage-menu-context";
import {
    createCategoryService,
    updateCategoryService,
    deleteCategoryService,
    toggleStatusCategoryService,
    getFullMenuService,
    createMenuItemService,
    updateMenuItemService,
    deleteMenuItemService,
    toggleStatusMenuItemService,

} from "../../services/service-manage-menu-store";
import { LoadingComponent } from "../../components/component-loading";

export const ManageMenuProvider = ({ children }: { children: ReactNode }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [tempTextColorButtons, setTempTextColorButtons] = useState('black');
    //MENU COMPLETO
    const [fullMenu, setFullMenu] = useState<unknown>(null);
    //ESTILO
    const [styleStore, setStyleStore] = useState<StyleStorePage>();
    const [tempBackgroundColor, setTempBackgroundColor] = useState('white');
    const [tempButtonColor, setTempButtonColor] = useState('#8F8F8F');
    //CATEGORIAS E ITENS DO MENU
    const [categories, setCategories] = useState<CategoryData[]>([]);
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    // const [optionsGroups, setOptionsGroups] = useState<OptionGroup[]>([]);
    // const [options, setOptions] = useState<Option[]>([]);

    const fetchMenuData = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const allMenuData = await getFullMenuService();
            setFullMenu(allMenuData.data);
            setStyleStore(allMenuData.data.style);
            setCategories(allMenuData.data.MenuCategory || []);
            setMenuItems(allMenuData.data.MenuItem || []);
        } catch (err) {
            setError('Falha ao carregar dados do menu');
            console.error('Error fetching menu data:', err);
        } finally {
            setIsLoading(false);
        }
    };

    //FUNÇÕES DO ESTILO DA LOJA -----------------------------
    const updateStyleStore = async (style: StyleStorePage): Promise<void> => {
        setStyleStore(style);
    };

    //FUNÇÕES DAS CATEGORIAS -----------------------------
    const createCategory = async (name: string, menuItemIds: number[]) => {
        await createCategoryService(name, menuItemIds);
        await fetchMenuData();
    };

    const updateCategory = async (categoryId: number, name: string, menuItemIds: number[]) => {
        await updateCategoryService(categoryId, name, menuItemIds);
        await fetchMenuData();
    };

    const deleteCategory = async (categoryId: number) => {
        await deleteCategoryService(categoryId);
        await fetchMenuData();
    };

    const toggleStatusCategory = async (categoryId: number) => {
        await toggleStatusCategoryService(categoryId);
        await fetchMenuData();
    };

    //FUNÇÕES DOS ITENS DO MENU -----------------------------
    const createMenuItem = async (item: MenuItem) => {
        await createMenuItemService(item);
        await fetchMenuData();
    };

    const updateMenuItem = async (categoryId: number, itemId: number, item: MenuItem) => {
        await updateMenuItemService(categoryId, itemId, item);
        await fetchMenuData();
    };

    const deleteMenuItem = async (itemId: number) => {
        await deleteMenuItemService(itemId);
        await fetchMenuData();
    };

    const toggleStatusMenuItem = async (categoryId: number, itemId: number) => {
        await toggleStatusMenuItemService(categoryId, itemId);
        await fetchMenuData();
    };

    //FUNÇÕES DOS GRUPOS DE OPCIONAIS -----------------------------
    //FUNÇÕES DOS  OPCIONAIS -----------------------------

    useEffect(() => {
        fetchMenuData();
    }, []);

    if (isLoading) {
        return <LoadingComponent />;
    }

    if (error) {
        return (
            <div className="error-container">
                <p>{error}</p>
                <button onClick={fetchMenuData}>Tentar novamente</button>
            </div>
        );
    }

    return (
        <ManageMenuContext.Provider
            value={{
                fullMenu,

                styleStore,
                tempBackgroundColor,
                setTempBackgroundColor,
                tempButtonColor,
                setTempButtonColor,
                tempTextColorButtons,
                setTempTextColorButtons,
                updateStyleStore,
                
                categories,
                setCategories,
                createCategory,
                updateCategory,
                deleteCategory,
                toggleStatusCategory,
                menuItems,
                createMenuItem,
                updateMenuItem,
                deleteMenuItem,
                toggleStatusMenuItem,
            }}
        >
            {children}
        </ManageMenuContext.Provider>
    );
};