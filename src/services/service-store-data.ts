import { AccountData } from "../types/types-account.d";

//Services para gerenciar dados do restaurante estando logado

const API_URL = import.meta.env.VITE_API_URL;

export const getMyStoreData = async () => {
    const response = await fetch(`${API_URL}/my-store`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao buscar dados do usuário');
    };

    return await response.json();   
};

export const updateMyStoreData = async (data: AccountData) => {
    const response = await fetch(`${API_URL}/my-store`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao atualizar dados do usuário');
    };

    return await response.json();   
};

//Services para buscar dados de qualquer restaurante
export const getStoresList = async () => {
    const response = await fetch(`${API_URL}/stores/list`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao buscar lista de lojas');
    };

    return await response.json();   
};

export const getStoreData = async (storeId: number) => {
    const response = await fetch(`${API_URL}/store/${storeId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao buscar dados do restaurante');
    };

    return await response.json();
};
