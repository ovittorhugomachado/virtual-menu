import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ManageMenuProvider } from "../context/manage-menu/manage-menu-context.tsx";
import { getMyUserData } from "../services/service-user-data";
import { getMyPageStyle } from "../services/service-page-style";
import { getMyStoreData } from "../services/service-store-data";
import { RestaurantData } from "../types/types-restaurante-data.d";
import { StyleStorePage } from "../types/types-menu.d.tsx";
import { CategoryData } from "../types/types-menu.d";
import { AccountData } from "../types/types-account.d";
import { getExtension } from "../utils/function-get-extension";
import { StyleToolbar } from "../components/store-side/store-page-components/store-style-toolbar";
import { LoadingComponent } from "../components/component-loading";
import { StoreBanner } from "../components/store-side/store-page-components/store-banner";
import { ErrorComponent } from "../components/component-error";
import { CategoryButtons } from "../components/store-side/store-page-components/store-categories-buttons";
import { Header } from "../components/store-side/store-page-components/store-header";
import { UpdateStoreDataForm } from "../components/store-side/forms/form-update-data-store";
import { UpdateSchedulesForm } from "../components/store-side/forms/form-update-schedules";
import { MenuItems } from "../components/store-side/store-page-components/store-container-items";
import { useManageMenu } from "../context/manage-menu/manage-menu-context.ts";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const CustomizeMenuPage = () => {

    const navigate = useNavigate();
    const {
        styleStore,
        tempBackgroundColor,
    } = useManageMenu();

    console.log(styleStore)

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [userData, setUserData] = useState<AccountData | null>(null);
    const [storeData, setStoreData] = useState<RestaurantData | null>(null);
    //const [categories, setCategories] = useState<CategoryData[]>([]);
    const [showStoreDataUpdateForm, setStoreDataUpdateForm] = useState(false)
    const [showStoreSchedulesUpdateForm, setShowStoreSchedulesUpdateForm] = useState(false)
    const [bannerUrl, setBannerUrl] = useState<string>('');
    const [logoUrl, setLogoUrl] = useState<string>("");

    const fetchStoreData = useCallback(async () => {
        setLoading(true);
        try {
            const userData = await getMyUserData();
            const storeData = await getMyStoreData();
            //const categoriesStore = await getCategoriesMyStore();
            setUserData(userData);
            setStoreData(storeData);
            setBannerUrl(storeData.bannerUrl ?? '');
            //setCategories(categoriesStore);

            setLogoUrl(
                storeData?.logoUrl && storeData.logoUrl.startsWith('https://s3.us-east-2.amazonaws.com/bucket.rangos/')
                    ? storeData.logoUrl
                    : storeData?.logoUrl
                        ? `${VITE_API_URL}/uploads/store${storeData.id}-logo${getExtension(storeData?.logoUrl)}`
                        : "/store-logo-default.png"
            );
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Erro ao carregar os dados da loja');
            setStoreStyle(null);
            navigate('/entrar');
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        fetchStoreData();
    }, [fetchStoreData]);

    const handleStoreDataUpdated = async () => {
        const updatedStoreData = await getMyStoreData();
        setStoreData(updatedStoreData);
        setStoreDataUpdateForm(false)
    };

    const handleSchedulesUpdated = async () => {
        const updatedStoreData = await getMyStoreData();
        setStoreData(updatedStoreData);
        setShowStoreSchedulesUpdateForm(false);
    };

    const handleLogoChange = async () => {
        const updatedStoreData = await getMyStoreData();
        setLogoUrl(
            updatedStoreData?.logoUrl && updatedStoreData.logoUrl.startsWith('https://s3.us-east-2.amazonaws.com/bucket.rangos/')
                ? updatedStoreData.logoUrl
                : updatedStoreData?.logoUrl
                    ? `${VITE_API_URL}/uploads/store${updatedStoreData.id}-logo${getExtension(updatedStoreData?.logoUrl)}`
                    : "/store-logo-default.png"
        );
    };

    return (
        <>
            {error ? (
                <div className="flex flex-col items-center">
                    <ErrorComponent message={error} />
                </div>
            ) : (loading || !styleStore) ? (
                <LoadingComponent />
            ) : (
                <div
                    style={{ backgroundColor: tempBackgroundColor }}
                    className="w-screen h-full min-h-screen px-[5%] lg:px-[15%] flex flex-col items-center text-black lg:text-base"
                >
                    <StyleToolbar />
                    <Header />
                    {/* {showStoreDataUpdateForm && (
                            <UpdateStoreDataForm
                                onClose={handleStoreDataUpdated}
                            />
                        )}
                        {showStoreSchedulesUpdateForm && (
                            <UpdateSchedulesForm
                                onClose={handleSchedulesUpdated}
                            />
                        )}
                        <main className="w-full max-w-[1140px] flex flex-col items-center justify-center realtive">
                            <StoreBanner
                                banner={
                                    bannerUrl && bannerUrl.startsWith('https://s3.us-east-2.amazonaws.com/')
                                        ? bannerUrl
                                        : bannerUrl
                                            ? `${VITE_API_URL}/uploads/store${storeData?.id}-banner${getExtension(storeData?.bannerUrl)}`
                                            : "/store-banner-default.png"
                                }
                                onBannerChange={async () => {
                                    const updatedStoreData = await getMyStoreData();
                                    setBannerUrl(updatedStoreData.bannerUrl ?? '');
                                }}
                            />
                            {categories.length > 0 && (
                                <CategoryButtons
                                    backgroundColor={backgroundColor ?? ''}
                                    buttonColor={buttonColor}
                                    textColor={textColorButtons}
                                />
                            )}
                            <MenuItems
                                storeId={storeData?.id ?? 0}
                                backgroundColor={backgroundColor ?? ''}
                                buttonColor={buttonColor ?? ''}
                            />
                        </main>
                        <footer className={`${backgroundColor === 'black' ? 'bg-black text-white' : 'bg-white text-black'} ${categories.length === 0 ? 'hidden' : ''} h-40 flex items-center`}>
                            {backgroundColor === 'black' ? (
                                <img
                                    src="../logo-text-dark.png"
                                    alt="Footer Dark Mode"
                                    width={200}
                                />
                            ) : (
                                <img
                                    src="../logo-text-light.png"
                                    alt="Footer Light Mode"
                                    width={200}
                                />
                            )}
                        </footer> */}
                </div>
            )}
        </>
    )
};
