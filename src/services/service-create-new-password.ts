const API_URL = import.meta.env.VITE_API_URL;

export const validateToken = async (token: string): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/validate-token/${token}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message ||'Token inválido');
        }

        return true;
    } catch (error) {
        console.error('Erro ao validar token:', error);
        return false;
    }
};

export const createNewPassword = async (newPassword: string, token: string) => {
    try {
        const response = await fetch(`${API_URL}/create-new-password/${token}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ newPassword }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erro ao criar nova senha');
        }

        return await response.json();

    } catch (error) {
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
            throw new Error('Estamos com problemas técnicos. Por favor tente novamente mais tarde.');
        }
        throw error instanceof Error ? error : new Error('Erro desconhecido');
    }
};
