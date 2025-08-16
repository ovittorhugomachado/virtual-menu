import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { userData } from "../services/service-user-data";
import { getMyStoreData } from "../services/service-store-data";
import { AccountData } from "../types/types-account.d";
import { RestaurantData } from "../types/types-restaurante-data.d";

export const useAuth = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<AccountData | null>(null);
    const [style, setStyle] = useState<RestaurantData | null>(null);

    const navigate = useNavigate();

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const userDataResponse = await userData();
            const styleData = await getMyStoreData();
            if (!userDataResponse || !styleData) {
                throw new Error('Dados do usuário não encontrados');
            }
            setUser(prevUser => {

                return JSON.stringify(prevUser) === JSON.stringify(userDataResponse)
                    ? prevUser
                    : userDataResponse;
            });
            setStyle(styleData);
            setError('');
        } catch (error) {
            const err = error as Error;

            setError(err.message);

            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();

    }, [fetchData]);

    useEffect(() => {
        if (error && !loading) {
            navigate('/entrar', { state: { error } });
        }
    }, [error, loading, navigate]);

    const isLogged = !!user;

    return { user, style, loading, error, refreshData: fetchData, isLogged };
};

