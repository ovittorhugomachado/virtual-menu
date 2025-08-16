import { AccountData } from "../types/types-account.d";

const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (data: AccountData) => {
    const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (response.status === 409) {
        const error = await response.json();
        throw new Error(error.message || 'Email já cadastrado');
    }

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao registrar');
    }

    return await response.json();
};