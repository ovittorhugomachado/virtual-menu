import { verifyEmail } from "../services/service-auth";

export const checkEmailExists = async (email: string) => {
    if (!email) return "Campo obrigatório";
    
    try {
        const data = await verifyEmail(email);
        return data;
    } catch (error) {
        if (error instanceof Error) {
            return error.message;
        }
        return "Erro ao validar e-mail";
    }
};