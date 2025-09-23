import { ReactNode, useEffect, useState } from "react";
import { CategoryData, StyleStorePage, MenuItem, OptionGroup, Option } from "../../types/types-menu.d";
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
    reorderCategoriesService,
    reorderMenuItemsService,
    createMenuItemOptionGroupService,
    updateMenuItemOptionGroupService,
} from "../../services/service-manage-menu-store";
import { uploadMenuItemImage } from "../../services/service-upload-image";

export const ManageMenuProvider = ({ children }: { children: ReactNode }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [tempTextColorButtons, setTempTextColorButtons] = useState('black');
    //ESTILO
    const [styleStore, setStyleStore] = useState<StyleStorePage>();
    const [tempBackgroundColor, setTempBackgroundColor] = useState('white');
    const [tempButtonColor, setTempButtonColor] = useState('#8F8F8F');
    //CATEGORIAS E ITENS DO MENU
    const [categories, setCategories] = useState<CategoryData[]>([]);
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [optionGroups, setOptionGroups] = useState<OptionGroup[]>([]);
    const [options, setOptions] = useState<Option[]>([]);

    const fetchMenuData = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const allMenuData = await getFullMenuService();
            setStyleStore(allMenuData.data.style);
            setCategories(allMenuData.data.MenuCategory || []);
            setMenuItems(allMenuData.data.MenuItem || []);
            setOptionGroups(allMenuData.data.MenuItemOptionGroup || []);
            setOptions(allMenuData.data.MenuItemOption || []);
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
        setIsLoading(true);
        try {
            const newCategory = await createCategoryService(name, menuItemIds);
            setCategories(prev => [...prev, newCategory].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
            setMenuItems(prev =>
                prev.map(item => {
                    if (menuItemIds.includes(Number(item.id))) {
                        const alreadyHas = item.categories?.some(cat => cat.id === newCategory.id);
                        return alreadyHas
                            ? item
                            : {
                                ...item,
                                categories: [...(item.categories ?? []), newCategory]
                            };
                    }
                    return {
                        ...item,
                        categories: (item.categories ?? []).filter(cat => cat.id !== newCategory.id)
                    };
                })
            );
        } catch (err) {
            setError('Falha ao criar categoria');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const updateCategory = async (categoryId: number, name: string, menuItemIds: number[]) => {
        setIsLoading(true);
        try {
            const category = await updateCategoryService(categoryId, name, menuItemIds);
            setCategories(prev =>
                prev.map(cat =>
                    cat.id === categoryId
                        ? { ...cat, ...category }
                        : cat
                )
                    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
            );
            setMenuItems(prev =>
                prev.map(item => {
                    if (menuItemIds.includes(Number(item.id))) {
                        const alreadyHas = item.categories?.some(cat => cat.id === category.id);
                        return alreadyHas
                            ? item
                            : {
                                ...item,
                                categories: [...(item.categories ?? []), category]
                            };
                    }
                    return {
                        ...item,
                        categories: (item.categories ?? []).filter(cat => cat.id !== category.id)
                    };
                })
            );

            await fetchMenuData();
        } catch (err) {
            setError('Falha ao atualizar categoria');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleStatusCategory = async (categoryId: number) => {
        try {
            await toggleStatusCategoryService(categoryId);
            setCategories(prev =>
                prev.map(cat =>
                    cat.id === categoryId
                        ? { ...cat, isAvailable: !cat.isAvailable }
                        : cat
                )
            );
        } catch (err) {
            setError('Falha ao alterar status da categoria');
            console.error(err);
        }
    };

    const reorderCategories = async (orderedCategories: { id: number; order: number }[]) => {
        setIsLoading(true);
        try {
            await reorderCategoriesService(orderedCategories);
            setCategories(prev =>
                prev
                    .map(cat => {
                        const found = orderedCategories.find(o => o.id === cat.id);
                        return found ? { ...cat, order: found.order } : cat;
                    })
                    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
            );
        } catch (err) {
            setError('Falha ao reordenar categorias');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteCategory = async (categoryId: number) => {
        setIsLoading(true);
        try {
            await deleteCategoryService(categoryId);
            setCategories(prev => prev.filter(cat => cat.id !== categoryId));
            setMenuItems(prev =>
                prev.map(item => ({
                    ...item,
                    categories: (item.categories ?? []).filter(cat => cat.id !== categoryId)
                }))
            );
        } catch (err) {
            setError('Falha ao deletar categoria');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    //FUNÇÕES DOS ITENS DO MENU -----------------------------
    const createMenuItem = async (itemData: MenuItem) => {
        setIsLoading(true);
        try {
            const newItem = await createMenuItemService(itemData);

            setMenuItems(prev => [...prev, newItem]);
            setCategories(prev =>
                prev.map(category => {
                    if (itemData.categoryId.includes(category.id)) {
                        const alreadyHas = category.menuItems?.includes(newItem.id ?? -1);
                        return alreadyHas
                            ? category
                            : {
                                ...category,
                                menuItems: [...(category.menuItems ?? []), newItem.id ?? -1]
                            };
                    }
                    return {
                        ...category,
                        menuItems: (category.menuItems ?? []).filter(id => id !== newItem.id)
                    };
                })
            );

            await fetchMenuData();
        } catch (err) {
            setError('Falha ao criar item');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const updateMenuItem = async (itemId: number, item: MenuItem) => {
        setIsLoading(true);
        try {
            await updateMenuItemService(itemId, item);
            await fetchMenuData();
        } catch (err) {
            setError('Falha ao atualizar item');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const updateImageMenuItem = async (itemId: number, imageFile: File) => {
        //LOADING É FEITO LOCALMENTE NO COMPONENTE
        try {
            await uploadMenuItemImage(itemId, imageFile);

        } catch (err) {
            setError('Falha ao atualizar imagem do item');
            console.error(err);
        }
    };

    const toggleStatusMenuItem = async (categoryId: number, itemId: number) => {
        setIsLoading(true);
        try {
            await toggleStatusMenuItemService(categoryId, itemId);
            await fetchMenuData();
        } catch (err) {
            setError('Falha ao alterar status do item');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const reorderMenuItems = async (categoryId: number, orderedItems: { menuItemId: number; order: number }[]) => {
        setIsLoading(true);
        try {
            await reorderMenuItemsService(categoryId, orderedItems);
            await fetchMenuData();
        } catch (err) {
            setError('Falha ao reordenar itens');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    const deleteMenuItem = async (itemId: number) => {
        setIsLoading(true);
        try {
            await deleteMenuItemService(itemId);
            await fetchMenuData();
        } catch (err) {
            setError('Falha ao deletar item');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    //FUNÇÕES DOS GRUPOS DE OPCIONAIS -----------------------------
    const createOptionGroup = async (group: OptionGroup) => {
        setIsLoading(true);
        const payload = {
            title: group.title,
            menuItemIds: group.menuItemIds ?? [],
            minSelectableOptions: group.minSelectableOptions,
            maxSelectableOptions: group.maxSelectableOptions,
            required: group.required,
            storeId: group.storeId,
            options: (group.options ?? []).map(opt => ({
                name: opt.name,
                additionalPrice: Number(opt.additionalPrice) || 0,
                description: opt.description ?? "",
            })),
        };

        try {
            const newOptionGroup = await createMenuItemOptionGroupService(payload);

            setOptionGroups(prev => [...prev, newOptionGroup]);

            setMenuItems(prevMenuItems =>
                prevMenuItems.map(menuItem => {
                    if (menuItem.id != null && payload.menuItemIds.includes(menuItem.id)) {
                        return {
                            ...menuItem,
                            optionGroups: [
                                ...(menuItem.optionGroups ?? []),
                                newOptionGroup,
                            ],
                        };
                    }
                    return menuItem;
                })
            );

            await fetchMenuData();

        } catch (err) {
            setError('Falha ao criar grupo de opções');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const updateOptionGroup = async (groupId: number, group: OptionGroup) => {
        setIsLoading(true);
        const payload = {
            title: group.title,
            menuItemIds: group.menuItemIds ?? [],
            minSelectableOptions: group.minSelectableOptions,
            maxSelectableOptions: group.maxSelectableOptions,
            required: group.required,
            storeId: group.storeId,
            options: (group.options ?? []).map(opt => ({
                name: opt.name,
                additionalPrice: Number(opt.additionalPrice) || 0,
                description: opt.description ?? "",
            })),
        };
                console.log(payload)

        try {
            const newOptionGroup = await updateMenuItemOptionGroupService(groupId, payload);

            setOptionGroups(prev => [...prev, newOptionGroup]);

            setMenuItems(prevMenuItems =>
                prevMenuItems.map(menuItem => {
                    if (menuItem.id != null && payload.menuItemIds.includes(menuItem.id)) {
                        return {
                            ...menuItem,
                            optionGroups: [
                                ...(menuItem.optionGroups ?? []),
                                newOptionGroup,
                            ],
                        };
                    }
                    return menuItem;
                })
            )

        } catch (err) {
            setError('Falha ao criar grupo de opções');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    //FUNÇÕES DOS  OPCIONAIS -----------------------------

    useEffect(() => {
        fetchMenuData();
    }, []);

    return (
        <ManageMenuContext.Provider
            value={{
                error,
                isLoading,
                setIsLoading,
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
                reorderCategories,
                menuItems,
                setMenuItems,
                createMenuItem,
                updateMenuItem,
                updateImageMenuItem,
                reorderMenuItems,
                deleteMenuItem,
                toggleStatusMenuItem,
                optionGroups,
                setOptionGroups,
                createOptionGroup,
                updateOptionGroup,
                options
            }}
        >
            {children}
        </ManageMenuContext.Provider>
    );
};