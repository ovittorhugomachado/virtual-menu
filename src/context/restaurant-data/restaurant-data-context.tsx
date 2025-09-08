import { ReactNode, useEffect, useState } from "react";
import { RestaurantDataContext } from "./restaurant-data-context";
import { getFullMenuService } from "../../services/service-manage-menu-store";
import { LoadingComponent } from "../../components/component-loading";
import { RestaurantData } from "../../types/types-restaurante-data.d";

export const RestaurantDataProvider = ({ children }: { children: ReactNode }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [restaurantData, setRestaurantData] = useState<RestaurantData | null>(null);
    const [logoUrl, setLogoUrl] = useState<string>();

    const fetchMenuData = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const allRestaurantData = await getFullMenuService();
            setRestaurantData(allRestaurantData.data);
            setLogoUrl(allRestaurantData.data.logoUrl ?? '');
        } catch (err) {
            setError('Falha ao carregar dados do menu');
            console.error('Error fetching menu data:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMenuData();
    }, []);

    useEffect(() => {
        if (restaurantData?.logoUrl) {
            setLogoUrl(restaurantData.logoUrl);
        }
    }, [restaurantData]);

    if (isLoading) {
        return <LoadingComponent />;
    }

    if (error) {
        return (
            <div className="error-container">
                <p>{error}</p>
                <button onClick={fetchMenuData}>Tentar novamente</button>
            </div>
        );
    }

    console.log(restaurantData)

    return (
        <RestaurantDataContext.Provider
            value={{
                restaurantData,
                logoUrl,
                setLogoUrl,
            }}
        >
            {children}
        </RestaurantDataContext.Provider>
    );
}