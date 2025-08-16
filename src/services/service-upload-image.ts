const API_URL = import.meta.env.VITE_API_URL;

export const UploadWhiteLogo= async (imageFile: File) => {
    
    try {

        const token = localStorage.getItem('token')
        const formData = new FormData();
        formData.append('logo', imageFile);

        const response = await fetch(`${API_URL}/logo`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
            body: formData,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || error.erro || 'Erro ao enviar imagem');
        }

        return await response.json();

    } catch (error) {
        if (error instanceof TypeError) {
            throw new Error(error.message);
        }
        throw error instanceof Error ? error : new Error('Erro desconhecido');
    }
};

export const UploadBannerImage = async (imageFile: File) => {
    try {

        const token = localStorage.getItem('token')
        const formData = new FormData();
        formData.append('banner', imageFile);

        const response = await fetch(`${API_URL}/banner`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
            body: formData,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || error.erro || 'Erro ao enviar imagem');
        }

        return await response.json();

    } catch (error) {
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
            throw new Error('Estamos com problemas técnicos. Por favor tente novamente mais tarde.');
        }
        throw error instanceof Error ? error : new Error('Erro desconhecido');
    }
};

export const uploadMenuItemImage = async (
    categoryId: number,
    menuItemId: number,
    imageFile: File
) => {
    try {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('menu-item', imageFile);

        const response = await fetch(`${API_URL}/${categoryId}/${menuItemId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
            body: formData,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error);
        }

        return await response.json();
    } catch (error) {
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
            throw new Error('Estamos com problemas técnicos. Por favor tente novamente mais tarde.');
        }
        throw error instanceof Error ? error : new Error('Erro desconhecido');
    }
};

