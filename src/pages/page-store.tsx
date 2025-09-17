import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getStoreData } from "../services/service-store-data";
import { getPageStyle } from "../services/service-page-style";
import { getCategoriesService } from "../services/service-manage-menu-store";
import { RestaurantData } from "../types/types-restaurante-data.d";
import { StyleStorePage } from "../types/types-menu.d";
//import { CategoryData } from "../types/types-menu.d";
import { LoadingComponent } from "../components/component-loading";
import { ErrorComponent } from "../components/component-error";
//import { StoreBanner } from "../components/customer-side/store-page-components/store-banner-customer.tsx";
import { StoreHeader } from "../components/customer-side/store-page-components/store-header-customer.tsx";
//import { CategoryButtons } from "../components/customer-side/store-page-components/store-categories-buttons-customer.tsx";
//import { MenuItems } from "../components/customer-side/store-page-components/store-container-items.tsx";
import { CartProvider } from "../context/cart/cart-provider";
import { CategoryButtons } from "../components/customer-side/store-page-components/store-categories-buttons-customer.tsx";
import { MenuItems } from "../components/customer-side/store-page-components/store-container-items-customer.tsx";
import { StoreMain } from "../components/customer-side/store-page-components/store-main-customer.tsx";
// import { getExtension } from "../utils/function-get-extension";

//const VITE_API_URL = import.meta.env.VITE_API_URL;

export const StorePage = () => {

    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [storeData, setStoreData] = useState<RestaurantData>();
    const [storeStyle, setStoreStyle] = useState<StyleStorePage | null>(null);
    //const { isOpen, message } = getRestaurantStatus(openingHours);
    //const [showOrderForm, setShowOrderForm] = useState(false);

    const fetchStoreData = useCallback(async () => {
        setLoading(true);
        try {
            if (typeof id === "undefined") {
                throw new Error("Store ID is missing");
            }
            const numericId = Number(id);
            if (isNaN(numericId)) {
                throw new Error("Store ID is not a valid number");
            }
            const storeData = await getStoreData(numericId);
            const styleData = await getPageStyle(numericId);
            const categoriesStore = await getCategoriesService(numericId)

            if (!storeData || !styleData || !categoriesStore) {
                throw new Error('Dados da loja não encontrados');
            };

            setStoreData(storeData);
            setStoreStyle(styleData);
            //setCategories(categoriesStore);

        } catch (error) {
            setError(error instanceof Error ? error.message : 'Error loading store data');
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchStoreData();
    }, [fetchStoreData]);

    // const handleCartClick = () => {
    //     setShowOrderForm(true);
    // };

    return (
        <>
            {error ? (
                <div className="w-full flex flex-col items-center justify-center">
                    <ErrorComponent message={error} />
                </div>
            ) : loading ? (
                <LoadingComponent />
            ) : (
                
                    <div style={{
                        backgroundColor: storeStyle?.backgroundColor ?? undefined,
                        color: storeStyle?.backgroundColor === 'white' ? "black" : "white"
                    }} className="w-screen min-h-[100vh] px-[5%] lg:px-[15%] flex flex-col items-center">
                        <StoreHeader />
                        <StoreMain />
                        {/* <CategoryButtons />
                        <MenuItems /> */}
                        {/* <main className="w-full max-w-[1140px] pb-24 mt-[110px] xs:mt-[87px] sm:mt-[115px] xl:mt-[132px] flex flex-col items-center justify-center">
                            {storeData?.bannerUrl && (
                                <StoreBanner banner={storeData.bannerUrl && storeData.bannerUrl.startsWith('https://s3.us-east-2.amazonaws.com/')
                                    ? storeData.bannerUrl
                                    : `${VITE_API_URL}/uploads/store${storeData?.id}-banner${getExtension(storeData?.bannerUrl)}`} />
                            )}
                            <CategoryButtons
                                categories={categories}
                                buttonColor={storeStyle?.primaryColor ?? ''}
                                textColor={storeStyle?.textButtonColor}
                            />
                            <MenuItems
                                storeId={storeData?.id ?? 0}
                                categories={categories}
                                backgroundColor={storeStyle?.backgroundColor ?? ''}
                                buttonColor={storeStyle?.primaryColor ?? ''}
                            />
                        </main> */}
                    </div>
            )}
        </>
    );
};