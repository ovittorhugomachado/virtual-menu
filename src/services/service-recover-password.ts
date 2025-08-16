import { AccountData } from "../types/types-account.d";

const API_URL = import.meta.env.VITE_API_URL;

export const recoverPassword = async (credentials: AccountData) => {
    try {

        const token = localStorage.getItem('token')

        const response = await fetch(`${API_URL}/recover-password`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify(credentials)
        });

        const data = await response.json()
        
        if (!response.ok) {
            throw new Error(data.message || 'Erro ao recuperar senha')
        }

        return data;

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