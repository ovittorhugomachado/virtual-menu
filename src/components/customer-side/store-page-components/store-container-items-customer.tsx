import { getExtension } from "../../../utils/function-get-extension";
import { Item } from "./store-item-customer";
import { useGetMenu } from "../../../context/get-menu/get-menu-context";
import { RefObject } from "react";

interface MenuItemsProps {
    categoryRefs: RefObject<{ [key: number]: HTMLDivElement | null }>;
}

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const MenuItems: React.FC<MenuItemsProps> = ({ categoryRefs }) => {
    const { restaurantData, menuCategories } = useGetMenu();
    const backgroundColor = restaurantData?.style.backgroundColor;
    const buttonColor = restaurantData?.style.primaryColor;

    return (
        <section className={`w-full px-2 ${backgroundColor === 'white' ? 'text-black' : 'text-white'}`}>
            {menuCategories && menuCategories.length > 0 &&
                menuCategories.map(category => (
                    <div
                        key={category.id}
                        ref={el => {
                            if (categoryRefs && categoryRefs.current) {
                                categoryRefs.current[category.id] = el;
                            }
                        }}
                        className="w-full mt-4 mb-6"
                    >
                        <h1
                            style={{ borderColor: buttonColor }}
                            className={`${backgroundColor === 'white' ? 'text-black' : 'text-white'} max-w-full text-black truncate text-2xl font-semibold border-b-4 pr-6 mb-2 inline-block`}
                        >
                            {category.name}
                        </h1>
                        <ul className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 py-1">
                            {(category.categoryItems ?? [])
                                .sort((a, b) => b.order - a.order)
                                .map(item => (
                                    <li
                                        key={item.id}
                                        className={`relative flex border-[1px] ${backgroundColor === 'white' ? 'border-zinc-300' : 'border-zinc-900'}`}
                                    >
                                        <Item
                                            image={
                                                item.menuItem.photoUrl && item.menuItem.photoUrl.startsWith('https://s3.us-east-2.amazonaws.com/')
                                                    ? item.menuItem.photoUrl
                                                    : item.menuItem.photoUrl
                                                        ? `${VITE_API_URL}/uploads/store-${restaurantData?.user.id}-category${category.id}-product${item.id}${getExtension(item.menuItem.photoUrl)}`
                                                        : '/food-default.png'
                                            }
                                            name={item.menuItem.name}
                                            description={item.menuItem.description}
                                            price={item.menuItem.price}
                                            categoryId={category.id}
                                            id={Number(item.menuItem.id)}
                                        />
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                ))}
        </section>
    );
};


