const API_URL = import.meta.env.VITE_API_URL;

//MENU COMPLETO (LADO DA LOJA)------------------------
export const getFullMenuService = async () => {
    try {
        const response = await fetch(`${API_URL}/my-menu`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erro ao buscar categorias do menu');
        };

        return await response.json();
    } catch (error) {
        if (error instanceof TypeError) {
            throw new Error('Ocorreu um erro. Tente novamente mais tarde');
        }
        throw error instanceof Error ? error : new Error('Erro desconhecido');
    }
};

//MENU COMPLETO (LADO DO CLIENTE)
export const getFullMenuByCustomerService = async (storeId: number) => {
    try {
        const response = await fetch(`${API_URL}/menu/${storeId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erro ao buscar categorias do menu');
        };

        return await response.json();
    } catch (error) {
        if (error instanceof TypeError) {
            throw new Error('Ocorreu um erro. Tente novamente mais tarde');
        }
        throw error instanceof Error ? error : new Error('Erro desconhecido');
    }
};

//CATEGORIES ---------------------------
export const getCategoriesService = async (storeId: number) => {
    try {
        const response = await fetch(`${API_URL}/categories/${storeId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erro ao buscar categorias do menu');
        };

        return await response.json();
    } catch (error) {
        if (error instanceof TypeError) {
            throw new Error('Ocorreu um erro. Tente novamente mais tarde');
        }
        throw error instanceof Error ? error : new Error('Erro desconhecido');
    }
};

export const getCategoriesMyStoreService = async () => {
    try {
        const response = await fetch(`${API_URL}/my-categories`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erro ao buscar categorias do menu');
        };

        return await response.json();
    } catch (error) {
        if (error instanceof TypeError) {
            throw new Error('Ocorreu um erro. Tente novamente mais tarde');
        }
        throw error instanceof Error ? error : new Error('Erro desconhecido');
    }
};

export const createCategoryService = async (name: string, menuItemIds: number[]) => {
    try {
        const response = await fetch(`${API_URL}/categories`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ name: name, menuItemIds: menuItemIds })
            }
        )

        const data = await response.json()

        if (!response.ok) {
            throw new Error('Erro ao criar categoria')
        }

        return data
    } catch (error) {

        if (error instanceof TypeError) {
            throw new Error('Ocorreu um erro. Tente novamente mais tarde');
        }

        throw new Error('Estamos com problemas técnicos. Por favor tente novamente mais tarde');
    }
};

export const updateCategoryService = async (categoryId: number, newName: string, menuItemIds: number[]) => {
    try {
        const response = await fetch(`${API_URL}/categories/${categoryId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ newName: newName, menuItemIds: menuItemIds })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erro ao renomear categoria do menu');
        };

        return await response.json();
    } catch (error) {
        if (error instanceof TypeError) {
            throw new Error('Ocorreu um erro. Tente novamente mais tarde');
        }
        throw error instanceof Error ? error : new Error('Erro desconhecido');
    }
};

export const toggleStatusCategoryService = async (categoryId: number) => {
    try {
        const response = await fetch(`${API_URL}/categories/${categoryId}/toggle-status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erro ao alterar status da categoria');
        };

        return await response.json();
    } catch (error) {
        if (error instanceof TypeError) {
            throw new Error('Ocorreu um erro. Tente novamente mais tarde');
        }
        throw error instanceof Error ? error : new Error('Erro desconhecido');
    }
};

export const reorderCategoriesService = async (categories: { id: number; order: number }[]) => {
    try {
        const response = await fetch(`${API_URL}/categories/reorder`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ categories }),
        });

        if (!response.ok) {
            throw new Error('Erro ao reordenar categorias');
        }

        return await response.json();
    } catch (error) {
        console.error('Erro no serviço de reordenação:', error);
        throw error;
    }
};

export const deleteCategoryService = async (categoryId: number) => {
    try {
        const response = await fetch(`${API_URL}/categories/${categoryId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erro ao deletar categoria do menu');
        };

        return await response.json();
    } catch (error) {
        if (error instanceof TypeError) {
            throw new Error('Ocorreu um erro. Tente novamente mais tarde');
        }
        throw error instanceof Error ? error : new Error('Erro desconhecido');
    }
};

//MENU ITEMS --------------------------
export const getMenuItemService = async (storeId: number, categoryId: number) => {
    try {
        const response = await fetch(`${API_URL}/menu-items/${storeId}/${categoryId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erro ao buscar item do menu');
        };

        return await response.json();
    } catch (error) {
        if (error instanceof TypeError) {
            throw new Error('Ocorreu um erro. Tente novamente mais tarde');
        }
        throw error instanceof Error ? error : new Error('Erro desconhecido');
    }
};

export const getMenuItemsMyStoreService = async () => {
    try {
        const response = await fetch(`${API_URL}/menu-items`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erro ao buscar categorias do menu');
        };

        return await response.json();
    } catch (error) {
        if (error instanceof TypeError) {
            throw new Error('Ocorreu um erro. Tente novamente mais tarde');
        }
        throw error instanceof Error ? error : new Error('Erro desconhecido');
    }
};

export const createMenuItemService = async (item: {
    name: string;
    description?: string;
    price: number;
    categoryId?: number[];
    optionGroupId?: number[];
}) => {
    try {
        const response = await fetch(`${API_URL}/menu-items`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(item)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erro ao criar item do menu');
        }

        return await response.json();
    } catch (error) {
        if (error instanceof Error && error.message) {
            throw error;
        }

        throw new Error('Ocorreu um erro. Tente novamente mais tarde');
    }
};

export const updateMenuItemService = async (
    itemId: number,
    item: {
        name?: string | null;
        description?: string | null;
        price?: number | null;
        categoryId?: number[] | null;
        optionGroupId?: number[] | null;
    }
) => {
    try {
        const response = await fetch(`${API_URL}/menu-items/${itemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(item),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erro ao atualizar item do menu');
        }

        return await response.json();
    } catch (error) {
        if (error instanceof Error && error.message) {
            throw error;
        }
        throw new Error('Ocorreu um erro. Tente novamente mais tarde');
    }
};

export const toggleStatusMenuItemService = async (categoryId: number, itemId: number) => {
    try {
        const response = await fetch(`${API_URL}/menu-items/${categoryId}/${itemId}/toggle-status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erro ao alterar status da categoria');
        };

        return await response.json();
    } catch (error) {
        if (error instanceof TypeError) {
            throw new Error('Ocorreu um erro. Tente novamente mais tarde');
        }
        throw error instanceof Error ? error : new Error('Erro desconhecido');
    }
};

export const reorderMenuItemsService = async (
    categoryId: number,
    items: { menuItemId: number; order: number }[]
) => {
    try {
        const response = await fetch(`${API_URL}/menu-items/reorder`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ categoryId, items }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erro ao reordenar itens da categoria');
        }

        return await response.json();
    } catch (error) {
        console.error('Erro no serviço de reordenação de itens:', error);
        throw error;
    }
};

export const deleteMenuItemService = async (itemId: number) => {
    try {
        const response = await fetch(`${API_URL}/menu-items/${itemId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erro ao deletar item do menu');
        };

        return await response.json();
    } catch (error) {
        if (error instanceof TypeError) {
            throw new Error('Ocorreu um erro. Tente novamente mais tarde');
        }
        throw error instanceof Error ? error : new Error('Erro desconhecido');
    }
};

//MENU ITEM OPTIONS GROUPS -------------------
export const getMenuItemsOptioGroupsMyStoreService = async () => {
    try {
        const response = await fetch(`${API_URL}/menu-item-option-group`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erro ao buscar categorias do menu');
        };

        return await response.json();
    } catch (error) {
        if (error instanceof TypeError) {
            throw new Error('Ocorreu um erro. Tente novamente mais tarde');
        }
        throw error instanceof Error ? error : new Error('Erro desconhecido');
    }
};

export const createMenuItemOptionGroupService = async (optionGroup: {
    title: string;
    optionIds: number[];
    menuItemIds: number[];
    maxSelectableOptions?: number;
    isRequired: boolean;
}) => {
    try {
        const response = await fetch(`${API_URL}/menu-item-option-group`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(optionGroup)
        })

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erro ao criar grupo de opções')
        }

        return await response.json()
    } catch (error) {
        if (error instanceof Error && error.message) {
            throw error;
        }

        throw new Error('Ocorreu um erro. Tente novamente mais tarde');
    }
};

export const updateMenuItemOptionGroupService = async (
    optionGroupId: number,
    optionGroup: {
        name: string;
        menuItemIds: number[];
        maxSelectableOptions?: number;
        isRequired: boolean;
    }
) => {
    try {
        const response = await fetch(`${API_URL}/menu-item-option-group/${optionGroupId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(optionGroup),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erro ao atualizar item do menu');
        }

        return await response.json();
    } catch (error) {
        if (error instanceof Error && error.message) {
            throw error;
        }
        throw new Error('Ocorreu um erro. Tente novamente mais tarde');
    }
};

export const deleteMenuItemOptionGroupService = async (optionGroupId: number) => {
    try {
        const response = await fetch(`${API_URL}/menu-item-option-group/${optionGroupId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erro ao deletar item do menu');
        };

        return;
    } catch (error) {
        if (error instanceof TypeError) {
            throw new Error('Ocorreu um erro. Tente novamente mais tarde');
        }
        throw error instanceof Error ? error : new Error('Erro desconhecido');
    }
};

//MENU ITEM OPTIONS -------------------------
export const getMenuItemOptionsMyStoreService = async () => {
    try {
        const response = await fetch(`${API_URL}/menu-item-option`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erro ao buscar categorias do menu');
        };

        return await response.json();
    } catch (error) {
        if (error instanceof TypeError) {
            throw new Error('Ocorreu um erro. Tente novamente mais tarde');
        }
        throw error instanceof Error ? error : new Error('Erro desconhecido');
    }
};

export const createMenuItemOptionService = async (option: {
    name: string;
    additionalPrice: number;
    menuItemOptionGroup: number[];
}) => {
    try {
        const response = await fetch(`${API_URL}/menu-item-option`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(option)
        })

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erro ao criar grupo de opções')
        }

        return await response.json()
    } catch (error) {
        if (error instanceof Error && error.message) {
            throw error;
        }

        throw new Error('Ocorreu um erro. Tente novamente mais tarde');
    }
};

export const updateMenuItemOptionService = async (
    optionId: number,
    option: {
        name: string;
        additionalPrice: number;
        menuItemOptionGroup: number[];
    }
) => {
    try {
        const response = await fetch(`${API_URL}/menu-item-option/${optionId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(option),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erro ao atualizar item do menu');
        }

        return await response.json();
    } catch (error) {
        if (error instanceof Error && error.message) {
            throw error;
        }
        throw new Error('Ocorreu um erro. Tente novamente mais tarde');
    }
};

export const deleteMenuItemOptionService = async (optionId: number) => {
    try {
        const response = await fetch(`${API_URL}/menu-item-option/${optionId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erro ao deletar item do menu');
        };

        return;
    } catch (error) {
        if (error instanceof TypeError) {
            throw new Error('Ocorreu um erro. Tente novamente mais tarde');
        }
        throw error instanceof Error ? error : new Error('Erro desconhecido');
    }
};


