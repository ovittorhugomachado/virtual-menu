import { StoreBanner } from "./store-banner"
import { CategoryButtons } from "./store-categories-buttons"
import { MenuItems } from "./store-container-items"
import { OptionsButtons } from "./store-options-buttons"

export const StoreMain = () => {
    return (
        <main className="w-full max-w-[1140px] flex flex-col items-center justify-center relative">
            <StoreBanner />
            <CategoryButtons />
            <OptionsButtons />
            <MenuItems />
        </main>
    )
}