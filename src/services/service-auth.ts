import { AccountData } from "../types/types-account.d";

const API_URL = import.meta.env.VITE_API_URL;

export const login = async (credentials: AccountData) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(credentials),
            credentials: 'include'
        });

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || 'Erro ao fazer login')
        }

        return { ...data, isLogged: true };
    } catch (error) {

        if (error instanceof TypeError && error.message === 'Failed to fetch') {
            throw new Error('Estamos com problemas técnicos. Por favor tente novamente mais tarde.');
        }

        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Estamos com problemas técnicos. Por favor tente novamente mais tarde');
    }
};

export const logout = async () => {
    try {
        const response = await fetch(`${API_URL}/logout`, {
            method: 'POST',
            credentials: 'include',
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Erro ao fazer logout');
        }

        return { ...data, isLogged: false };
    } catch (error) {
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
            throw new Error('Estamos com problemas técnicos. Por favor tente novamente mais tarde.');
        }

        if (error instanceof Error) {
            throw error;
        }

        throw new Error('Estamos com problemas técnicos. Por favor tente novamente mais tarde');
    }
};