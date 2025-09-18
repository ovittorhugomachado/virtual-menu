import { LoadingComponent } from "../components/component-loading";
import { ErrorComponent } from "../components/component-error";
import { StoreHeader } from "../components/customer-side/store-page-components/store-header-customer.tsx";
import { StoreMain } from "../components/customer-side/store-page-components/store-main-customer.tsx";
import { StoreFooter } from "../components/customer-side/store-page-components/store-footer-customer.tsx";
import { useGetMenu } from "../context/get-menu/get-menu-context.ts";

export const StorePage = () => {

    const { restaurantData, isLoading, error } = useGetMenu();
    const backgroundColor = restaurantData?.style.backgroundColor

    return (
        <>
            {error ? (
                <div className="w-full flex flex-col items-center justify-center">
                    <ErrorComponent message={error} />
                </div>
            ) : isLoading ? (
                <LoadingComponent />
            ) : (

                <div style={{
                    backgroundColor: backgroundColor ?? undefined,
                    color: backgroundColor === 'white' ? "black" : "white"
                }} className="w-screen min-h-[100vh] px-[5%] lg:px-[15%] flex flex-col items-center justify-between"
                >
                    <StoreHeader />
                    <StoreMain />
                    <StoreFooter />
                </div>
            )}
        </>
    );
};