import { useManageMenu } from "../context/manage-menu/manage-menu-context.ts";
import { LoadingComponent } from "../components/component-loading.tsx";
import { ErrorComponent } from "../components/component-error.tsx";
import { StyleToolbar } from "../components/store-side/store-page-components/store-style-toolbar";
import { StoreHeader } from "../components/store-side/store-page-components/store-header";
import { StoreMain } from "../components/store-side/store-page-components/store-main.tsx";
import { StoreFooter } from "../components/store-side/store-page-components/store-footer.tsx";

export const CustomizeMenuPage = () => {

    const {
        isLoading,
        error,
        tempBackgroundColor,
    } = useManageMenu();

    return (
        <>
            {error ? (
                <ErrorComponent message={error} />
            ) : (
                <div style={{ backgroundColor: tempBackgroundColor }} className="w-screen h-full relative min-h-screen px-[5%] lg:px-[15%] flex flex-col items-center text-black lg:text-base">
                    {isLoading && <LoadingComponent />}
                    <StyleToolbar />
                    <StoreHeader />
                    <StoreMain />
                    <StoreFooter />
                </div>
            )}
        </>
    )
};
