import { StoreBanner } from "./store-banner-customer"
import { CategoryButtons } from "./store-categories-buttons-customer"
import { MenuItems } from "./store-container-items"

export const StoreMain = () => {
    return (
        <main className="w-full max-w-[1140px] flex flex-col items-center justify-center relative">
            <StoreBanner />
            <CategoryButtons />
            <MenuItems />
        </main>
    )
}