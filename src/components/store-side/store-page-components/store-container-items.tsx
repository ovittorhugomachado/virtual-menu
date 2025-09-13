import { useState } from "react"
import { Item } from "./store-item";
import { CreateMenuItemForm } from "../forms/form-create-update-menu-item";
import { IoMdAddCircle } from "react-icons/io";
import { getExtension } from "../../../utils/function-get-extension";
import { FaPause, FaPlay } from "react-icons/fa";
import { useManageMenu } from "../../../context/manage-menu/manage-menu-context";
import { useRestaurantData } from "../../../context/restaurant-data/restaurant-data-context";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const MenuItems = () => {

    const { restaurantData } = useRestaurantData();
    const {
        categories,
        toggleStatusCategory,
        menuItems,
        tempBackgroundColor,
        tempButtonColor
    } = useManageMenu();

    const [showCreateMenuItemForm, setShowCreateMenuItemForm] = useState<number | null>(null);

    return (
        <section className="w-full px-2">
            {categories.map(category => (
                <div
                    key={category.id}
                    className={`w-full mt-4 ${tempBackgroundColor === 'white' ? 'text-black' : 'text-white'}`}
                >
                    <div className="relative">
                        <button
                            title="Ativar ou desativar categoria"
                            className="w-7 h-7 lg:w-8 lg:h-8 absolute top-1 rounded-full bg-gray-400 text-black border-1 flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-200 z-1"
                            onClick={() => toggleStatusCategory(category.id)}
                        >
                            {category.isAvailable ? (
                                <FaPause className="text-lg" />
                            ) : (
                                <FaPlay className="text-lg" />
                            )}
                        </button>
                        <h1
                            style={{ borderColor: category.isAvailable ? tempButtonColor : 'gray' }}
                            className={`${category.isAvailable ? '' : 'opacity-30'} max-w-full truncate text-2xl font-semibold border-b-4 pr-6 mb-2 pl-10 inline-block`}
                        >
                            {category.name}{category.id}{category.isAvailable ? '' : ' (Pausado)'}
                        </h1>
                    </div>
                    {!category.isAvailable && (
                        <span className="text-md text-gray-500">Todos os itens dessa categoria não aparecem para o cliente, para voltar a oferecer esses itens ative a categoria no botão acima</span>
                    )}
                    <ul className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 py-1 ">
                        {menuItems.length > 0 ? (
                            menuItems
                                .filter(item =>
                                    item.categories &&
                                    item.categories.some(cat => cat.id === category.id)
                                )
                                .map(item => (
                                    <li
                                        key={item.id}
                                        className={`relative flex border-[1px] ${tempBackgroundColor === 'white' ? 'border-zinc-400' : 'border-zinc-900'}`}
                                    >
                                        <Item
                                            image={
                                                item.photoUrl && item.photoUrl.startsWith('https://s3.us-east-2.amazonaws.com/')
                                                    ? item.photoUrl
                                                    : item.photoUrl
                                                        ? `${VITE_API_URL}/uploads/store-${restaurantData?.id}-category${category.id}-product${item.id}${getExtension(item.photoUrl)}`
                                                        : '/food-default.png'
                                            }
                                            name={item.name}
                                            description={item.description}
                                            price={item.price}
                                            categoryId={category.id}
                                            id={Number(item.id)}
                                        />
                                    </li>
                                ))
                        ) : (
                            <li className="flex items-center">Nenhum item nesta categoria</li>
                        )}

                        <button
                            className="h-[150px] flex flex-col-reverse items-center justify-center border-[4px] border-primary cursor-pointer hover:scale-103 transition-transform duration-200"
                            onClick={() => setShowCreateMenuItemForm(category.id)}
                        >
                            Criar novo item na categoria {category.name}
                            <span>
                                <IoMdAddCircle className="text-4xl text-primary" />
                            </span>
                        </button>
                    </ul>
                    {showCreateMenuItemForm === category.id && (
                        <CreateMenuItemForm
                            onClose={() => setShowCreateMenuItemForm(null)}
                            categoryId={category.id}
                        />
                    )}
                </div>
            ))}
        </section>
    );
};


