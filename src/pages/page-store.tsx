import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getStoreData } from "../services/service-store-data";
import { getPageStyle } from "../services/service-page-style";
import { getCategories } from "../services/service-manage-menu-store";
import { RestaurantData } from "../types/types-restaurante-data.d";
import { StyleStorePage } from "../types/types-style-store-page.d";
import { Category } from "../types/types-menu.d";
import { LoadingComponent } from "../components/component-loading";
import { ErrorComponent } from "../components/component-error";
import { StoreFooterComponent } from "../components/store-side/store-page-components/store-footer";
import { StoreBanner } from "../components/customer-side/store-page-components/store-banner-customer";
import { Header } from "../components/customer-side/store-page-components/store-header-by-customer";
import { CategoryButtons } from "../components/customer-side/store-page-components/store-categories-buttons-by-customer";
import { MenuItems } from "../components/customer-side/store-page-components/store-container-items-by-customer";
import { CartProvider } from "../context/cart-context/cart-provider";
import { getExtension } from "../utils/function-get-extension";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const StorePage = () => {

    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [storeData, setStoreData] = useState<RestaurantData | null>(null);
    const [storeStyle, setStoreStyle] = useState<StyleStorePage | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);

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
            const categoriesStore = await getCategories(numericId)

            if (!storeData || !styleData || !categoriesStore) {
                throw new Error('Dados da loja não encontrados');
            };

            setStoreData(storeData);
            setStoreStyle(styleData);
            setCategories(categoriesStore);

        } catch (error) {
            setError(error instanceof Error ? error.message : 'Error loading store data');
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchStoreData();
    }, [fetchStoreData]);

    return (
        <>
            {error ? (
                <div className="w-full flex flex-col items-center justify-center">
                    <ErrorComponent message={error} />
                </div>
            ) : loading ? (
                <LoadingComponent />
            ) : (
                <CartProvider>
                    <div style={{ backgroundColor: storeStyle?.backgroundColor ?? undefined }} className="w-screen min-h-[100vh] px-[5%] lg:px-[15%] flex flex-col items-center">
                        <Header
                            backgroundColor={storeStyle?.backgroundColor ?? ''}
                            restaurantImage={
                                storeData?.logoUrl && storeData.logoUrl.startsWith('https://s3.us-east-2.amazonaws.com/bucket.rangos/')
                                    ? storeData.logoUrl
                                    : storeData?.logoUrl
                                        ? `${VITE_API_URL}/uploads/store${storeData.id}-logo${getExtension(storeData?.logoUrl)}`
                                        : "/store-logo-default.png"
                            }
                            restaurantName={storeData?.restaurantName}
                            openingHours={
                                Array.isArray(storeData?.openingHours)
                                    ? storeData.openingHours.map((oh) => ({
                                        day: oh.day,
                                        isOpen: oh.isOpen ?? true,
                                        status: oh.status ?? "",
                                        timeRanges: Array.isArray(oh.timeRanges) && oh.timeRanges.length > 0
                                            ? oh.timeRanges
                                            : [{ start: "", end: "" }],
                                    }))
                                    : []
                            }
                        />
                        <main className="w-full max-w-[1140px] pb-24 mt-[110px] xs:mt-[87px] sm:mt-[115px] xl:mt-[132px] flex flex-col items-center justify-center">
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
                        </main>
                        <StoreFooterComponent backgroundColor={storeStyle?.backgroundColor ?? ''} />
                    </div>
                </CartProvider>
            )}
        </>
    );
};