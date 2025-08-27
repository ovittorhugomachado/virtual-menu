import { useCallback, useEffect, useState } from "react"
import { getMenuItemService } from "../../../services/service-manage-menu-store"
import { Item } from "./store-item";
import { ErrorComponent } from "../../component-error"
import { LoadingComponent } from "../../component-loading"
import { MenuItemCreationForm } from "../forms/form-create-update-menu-item";
import { IoMdAddCircle } from "react-icons/io";
import { MenuItem, MenuItemsContainerProps } from "../../../types/types-menu.d";
import { getExtension } from "../../../utils/function-get-extension";
import { FaPause, FaPlay } from "react-icons/fa";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const MenuItems = ({
    storeId,
    categories,
    backgroundColor,
    buttonColor,
    onToggleStatusCategory
}: MenuItemsContainerProps) => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [menuItemsByCategory, setMenuItemsByCategory] = useState<{ [categoryId: number]: MenuItem[] }>({});
    const [showFormCreateMenuItem, setShowFormCreateMenuItem] = useState<number | null>(null);

    const fetchMenuItems = useCallback(async () => {
        setLoading(true);
        try {
            const itemsObj: { [categoryId: number]: MenuItem[] } = {};
            for (const category of categories) {
                const response = await getMenuItemService(storeId, category.id);
                itemsObj[category.id] = response.data;
            }
            setMenuItemsByCategory(itemsObj);
        } catch (error) {
            console.error(error)
            setError('Erro ao buscar itens do menu');
        } finally {
            setLoading(false);
        }
    }, [categories, storeId]);

    useEffect(() => {
        if (categories.length > 0) {
            fetchMenuItems();
        }
    }, [categories, fetchMenuItems]);



    return (
        <>
            {error ? (
                <div className="w-full flex flex-col items-center">
                    <ErrorComponent message={error} />
                </div>
            ) : loading ? (
                <LoadingComponent />
            ) : (
                <section className="w-full">
                    {categories.map(category => (
                        <div
                            key={category.id}
                            className={`w-full mt-4 ${backgroundColor === 'white' ? 'text-black' : 'text-white'}`}
                        >
                            <div className="relative">
                                <button
                                    title="Ativar ou desativar categoria"
                                    className="w-7 h-7 lg:w-8 lg:h-8 absolute top-1 rounded-full bg-gray-400 text-black border-1 flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-200 z-90"
                                    onClick={() => onToggleStatusCategory(category.id)}
                                >
                                    {category.isAvailable ? (
                                        <FaPause className="text-lg" />
                                    ) : (
                                        <FaPlay className="text-lg" />
                                    )}
                                </button>
                                <h1
                                    style={{ borderColor: category.isAvailable ? buttonColor : 'gray' }}
                                    className={`${category.isAvailable ? '' : 'opacity-30'} max-w-full flex flex-col truncate text-2xl font-semibold border-b-4 pr-6 mb-2 pl-10 inline-block`}
                                >
                                    {category.name}{category.isAvailable ? '' : ' (Pausado)'}
                                </h1>
                            </div>
                            {!category.isAvailable && (
                                <span className="text-md text-gray-500">Todos os itens dessa categoria não aparecem para o cliente, para voltar a oferecer esses itens ative a categoria no botão acima</span>
                            )}
                            <ul className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 py-1 ">
                                {Array.isArray(menuItemsByCategory[category.id]) && menuItemsByCategory[category.id].length > 0 ? (
                                    menuItemsByCategory[category.id].map(item => (
                                        <li
                                            key={item.id}
                                            className={`relative flex border-[1px] ${backgroundColor === 'white' ? 'border-zinc-400' : 'border-zinc-900'}`}
                                        >
                                            <Item
                                                image={
                                                    item.photoUrl && item.photoUrl.startsWith('https://s3.us-east-2.amazonaws.com/')
                                                        ? item.photoUrl
                                                        : item.photoUrl
                                                            ? `${VITE_API_URL}/uploads/store${storeId}-category${category.id}-product${item.id}${getExtension(item.photoUrl)}`
                                                            : '/food-default.png'
                                                }
                                                name={item.name}
                                                description={item.description}
                                                price={item.price}
                                                categoryId={category.id}
                                                id={item.id}
                                                onUpdated={fetchMenuItems}
                                            />
                                        </li>
                                    ))
                                ) : (
                                    <li className="flex items-center">Nenhum item nesta categoria</li>
                                )}

                                <button
                                    className="h-[150px] flex flex-col-reverse items-center justify-center border-[4px] border-primary cursor-pointer hover:scale-103 transition-transform duration-200"
                                    onClick={() => setShowFormCreateMenuItem(category.id)}
                                >
                                    Criar novo item na categoria {category.name}
                                    <span>
                                        <IoMdAddCircle className="text-4xl text-primary" />
                                    </span>
                                </button>
                            </ul>
                            {showFormCreateMenuItem === category.id && (
                                <MenuItemCreationForm
                                    onClose={() => setShowFormCreateMenuItem(null)}
                                    categoryId={category.id}
                                    onCreated={fetchMenuItems}
                                />
                            )}
                        </div>
                    ))}
                </section>
            )}
        </>
    );
};


