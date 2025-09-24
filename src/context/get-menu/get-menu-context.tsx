import { ReactNode, useCallback, useEffect, useState } from "react";
import { GetMenuContext } from "./get-menu-context"
import { getFullMenuByCustomerService } from "../../services/service-manage-menu-store"
import { useParams } from "react-router-dom";

export const GetMenuProvider = ({ children }: { children: ReactNode }) => {

    const { id } = useParams<{ id: string; restaurantSlug: string }>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [restaurantData, setRestaurantData] = useState()
    const [menuCategories, setMenuCategories] = useState()

    const storeId = Number(id);
    const fetchMenuData = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            if (!id) throw new Error("ID da loja não encontrado na URL");
            const allMenuData = await getFullMenuByCustomerService(storeId);
            setRestaurantData(allMenuData.data.restaurantData);
            setMenuCategories(allMenuData.data.menuCategories);
            setMenuCategories(allMenuData.data.menuCategories);
        } catch (err) {
            setError('Falha ao carregar dados do menu');
            console.error('Error fetching menu data:', err);
        } finally {
            setIsLoading(false);
        }
    }, [storeId, id]);
    useEffect(() => {
        fetchMenuData();
    }, [fetchMenuData]);
 
    return (
        <GetMenuContext.Provider
            value={{
                error,
                isLoading,
                setIsLoading,
                restaurantData,
                menuCategories,

            }}
        >
            {children}
        </GetMenuContext.Provider>
    );
};

