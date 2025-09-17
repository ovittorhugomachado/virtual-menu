import { useGetMenu } from "../../../context/get-menu/get-menu-context";
import { StoreBanner } from "./store-banner-customer"
import { CategoryButtons } from "./store-categories-buttons-customer"
import { MenuItems } from "./store-container-items-customer"
import { useRef } from "react";

export const StoreMain = () => {

    const { restaurantData, menuCategories } = useGetMenu();
    const categoryRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

    const handleCategoryClick = (categoryId: number) => {
        const el = categoryRefs.current[categoryId];
        if (el) {
            const isSmallScreen = window.innerWidth < 640;
            const yOffset = isSmallScreen ? -80 : -170;
            const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <main className="w-full max-w-[1140px] flex flex-col items-center justify-center relative">
            {restaurantData?.bannerUrl && <StoreBanner />}
            {menuCategories?.length !== 0 &&
                <>
                    <CategoryButtons onCategoryClick={handleCategoryClick} />
                    {categoryRefs && <MenuItems categoryRefs={categoryRefs} />}
                </>
            }

        </main>
    )

}