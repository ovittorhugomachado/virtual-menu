import { StyleToolbar } from "../components/store-side/store-page-components/store-style-toolbar";
import { StoreBanner } from "../components/store-side/store-page-components/store-banner";
import { CategoryButtons } from "../components/store-side/store-page-components/store-categories-buttons";
import { Header } from "../components/store-side/store-page-components/store-header";
import { MenuItems } from "../components/store-side/store-page-components/store-container-items";
import { useManageMenu } from "../context/manage-menu/manage-menu-context.ts";
import { LoadingComponent } from "../components/component-loading.tsx";
import { ErrorComponent } from "../components/component-error.tsx";

export const CustomizeMenuPage = () => {

    const {
        isLoading,
        error,
        tempBackgroundColor,
    } = useManageMenu();


    return (
        <>
            {isLoading && (
                <LoadingComponent />
            )}
            {error ? (
                <ErrorComponent message={error} />
            ) : (
                <div
                    style={{ backgroundColor: tempBackgroundColor }}
                    className="w-screen h-full min-h-screen px-[5%] lg:px-[15%] flex flex-col items-center text-black lg:text-base"
                >
                    <StyleToolbar />
                    <Header />
                    <StoreBanner />

                    <main className="w-full max-w-[1140px] flex flex-col items-center justify-center realtive">
                        <CategoryButtons />

                        <MenuItems
                        />
                    </main>

                    {/* <footer className={`${backgroundColor === 'black' ? 'bg-black text-white' : 'bg-white text-black'} ${categories.length === 0 ? 'hidden' : ''} h-40 flex items-center`}>
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
