import { OpeningHour } from "../types/types-schedules.d";

const API_URL = import.meta.env.VITE_API_URL;

export const updateSchedules = async (body: { schedule: OpeningHour[] }) => {
    const response = await fetch(`${API_URL}/schedules`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao atualizar horários');
    };

    return await response.json();   
};