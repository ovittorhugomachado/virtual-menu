import { useGetMenu } from "../../../context/get-menu/get-menu-context";
import { StoreBanner } from "./store-banner-customer"
import { CategoryButtons } from "./store-categories-buttons-customer"
import { MenuItems } from "./store-container-items"

export const StoreMain = () => {


    const { restaurantData, menu } = useGetMenu();

    return (
        <main className="w-full max-w-[1140px] flex flex-col items-center justify-center relative">
            { restaurantData?.bannerUrl && <StoreBanner /> }
            { menu?.length !== 0 && <CategoryButtons /> }
            
            <MenuItems />
        </main>
    )
}