import { useState } from "react"
import { Item, ItemList } from "./store-item";
import { UpdateCategoryForm } from "../forms/form-create-update-categories";
import { CreateMenuItemForm } from "../forms/form-create-update-menu-item";
import { IoMdAddCircle } from "react-icons/io";
import { getExtension } from "../../../utils/function-get-extension";
import { FaPause, FaPlay } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { useManageMenu } from "../../../context/manage-menu/manage-menu-context";
import { useRestaurantData } from "../../../context/restaurant-data/restaurant-data-context";
import { MenuItemOrderManager } from "../forms/form-order-of-menu-items";

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
    const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
    const [editCategoryName, setEditCategoryName] = useState<string>("");
console.log('categories', categories);
    return (
        <section className={`w-full px-2 ${tempBackgroundColor === 'white' ? 'text-black' : 'text-white'}`}>
            {categories.map(category => (
                <div
                    key={category.id}
                    className="w-full mt-4 mb-6"
                >
                    <div className="relative">
                        <button
                            title="Configurar categoria"
                            className="w-7 h-7 lg:w-8 lg:h-8 top-1 opacity-100 absolute rounded-full bg-gray-400 text-black border-1 flex items-center justify-center gap-2 cursor-pointer hover:scale-105 transition-all duration-200 z-1"
                            onClick={() => {
                                setEditCategoryId(category.id);
                                setEditCategoryName(category.name);
                            }}
                        >
                            <FaGear className="text-lg" />
                        </button>
                        <button
                            title="Ativar ou desativar categoria"
                            className="w-7 h-7 lg:w-8 lg:h-8 absolute left-9 top-1 rounded-full bg-gray-400 text-black border-1 flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-200 z-1"
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
                            className={`${category.isAvailable ? '' : 'opacity-30'} max-w-full truncate text-2xl font-semibold border-b-4 pr-6 mb-2 pl-18 inline-block`}
                        >
                            {category.name}{category.isAvailable ? '' : ' (Pausado)'}
                        </h1>
                    </div>
                    {!category.isAvailable && (
                        <span className="text-md text-gray-500">Todos os itens dessa categoria não aparecem para o cliente, para voltar a oferecer esses itens ative a categoria no botão acima</span>
                    )}
                    <ul className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 py-1">
                        {(category.categoryItems ?? []).length > 0 ? (
                            (category.categoryItems ?? [])
                                .map(item => (
                                    <li
                                        key={item.id}
                                        className={`relative flex border-[1px] ${tempBackgroundColor === 'white' ? 'border-zinc-400' : 'border-zinc-900'}`}
                                    >
                                        <p>{item.order}</p>
                                        <Item
                                            image={
                                                item.menuItem.photoUrl && item.menuItem.photoUrl.startsWith('https://s3.us-east-2.amazonaws.com/')
                                                    ? item.menuItem.photoUrl
                                                    : item.menuItem.photoUrl
                                                        ? `${VITE_API_URL}/uploads/store-${restaurantData?.id}-category${category.id}-product${item.id}${getExtension(item.menuItem.photoUrl)}`
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
                        ) : (
                            <li key={`no-item-${category.id}`} className="flex items-center">Nenhum item nesta categoria</li>
                        )}
                        <li key={`add-item-${category.id}`}>
                            <button
                                className="h-[150px] w-full flex flex-col-reverse items-center justify-center border-[4px] border-primary cursor-pointer hover:scale-103 transition-transform duration-200"
                                onClick={() => setShowCreateMenuItemForm(category.id)}
                            >
                                <span className="w-full text-center px-2 break-words overflow-hidden">
                                    Criar novo item na categoria {category.name}
                                </span>
                                <span>
                                    <IoMdAddCircle className="text-4xl text-primary" />
                                </span>
                            </button>
                        </li>
                    </ul>
                    {
                        <MenuItemOrderManager onClose={function (): void {
                            throw new Error("Function not implemented.");
                        } } category={category}                        
                        />
                        }
                    {editCategoryId === category.id && (
                        <UpdateCategoryForm
                            onClose={() => {
                                setEditCategoryId(null);
                                setEditCategoryName("");
                            }}
                            initialName={editCategoryName}
                            categoryId={editCategoryId}
                        />
                    )}
                    {showCreateMenuItemForm === category.id && (
                        <CreateMenuItemForm
                            onClose={() => setShowCreateMenuItemForm(null)}
                            categoryId={category.id}
                        />
                    )}
                </div>
            ))}
            {menuItems.filter(item => !item.categories || item.categories.length === 0).length > 0 && (
                <>
                    <hr />
                    <h1 className="mt-8 px-4 rounded-3xl bg-primary text-black">Itens sem categoria*</h1>
                    <p className="font-light ml-4 my-2">*Os itens que não estiverem dentro de nenhuma categoria não estarão visíveis em seu cardápio.</p>
                    <ul className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 py-1">
                        {menuItems
                            .filter(item => !item.categories || item.categories.length === 0)
                            .map(item => (
                                <li
                                    key={item.id}
                                    className={`relative flex justify-between ${tempBackgroundColor === 'white' ? 'bg-zinc-300' : 'bg-zinc-800'}`}
                                >
                                    <ItemList
                                        id={Number(item.id)}
                                        name={item.name}
                                        price={item.price}
                                    />
                                </li>
                            ))
                        }
                    </ul>
                </>
            )}

        </section>
    );
};


