const API_URL = import.meta.env.VITE_API_URL;

export const getCategories = async (storeId: number) => {

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
};

export const getCategoriesMyStore = async () => {

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
};

export const createCategoryService = async (category: {
    name: string;
}): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/categories`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(category)
            }
        )

        const data = await response.json()

        if (!response.ok) {
            throw new Error('Erro ao criar categoria')
        }

        return data
    } catch (error) {

        if (error instanceof TypeError) {
            throw new Error('Estamos com problemas técnicos. Por favor tente novamente mais tarde.');
        }

        throw new Error('Estamos com problemas técnicos. Por favor tente novamente mais tarde');
    }
};

export const RenameCategoryService = async (categoryId: number, newName: string) => {
    try {
        const response = await fetch(`${API_URL}/categories/${categoryId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ newName: newName })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erro ao renomear categoria do menu');
        };

        return await response.json();
    } catch (error) {
        if (error instanceof TypeError) {
            throw new Error('Estamos com problemas técnicos. Por favor tente novamente mais tarde.');
        }
        throw error instanceof Error ? error : new Error('Erro desconhecido');
    }
};

export const deleteCategoryService = async (categoryId: number) => {
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
};

export const getMenuItemService = async (storeId: number, categoryId: number) => {
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
};

export const createMenuItemService = async (categoryId: number, item: {
    name: string;
    description: string;
    price: number;
}) => {
    try {
        const response = await fetch(`${API_URL}/menu-items/${categoryId}`, {
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

        throw new Error('Estamos com problemas técnicos. Por favor tente novamente mais tarde.');
    }
};

export const updateMenuItemByCategoryService = async (
    categoryId: number,
    itemId: number,
    item: {
        name?: string | null;
        description?: string | null;
        price?: number | null;
    }
) => {
    try {
        const response = await fetch(`${API_URL}/menu-items/${categoryId}/${itemId}`, {
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
        throw new Error('Estamos com problemas técnicos. Por favor tente novamente mais tarde.');
    }
};

export const deleteMenuItemService = async (itemId: number) => {
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
};


