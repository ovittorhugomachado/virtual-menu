import { useState } from "react"
import { useManageMenu } from "../../../context/manage-menu/manage-menu-context";
import { useRestaurantData } from "../../../context/restaurant-data/restaurant-data-context";
import { getExtension } from "../../../utils/function-get-extension";
import { CategoryData } from "../../../types/types-menu.d";
import { Item, ItemList } from "./store-item";
import { UpdateCategoryForm } from "../forms/form-create-update-categories";
import { CreateMenuItemForm } from "../forms/form-create-update-menu-item";
import { MenuItemOrderManager } from "../forms/form-order-of-menu-items";
import { LuArrowDownWideNarrow } from "react-icons/lu";
import { FaPause, FaPlay } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { FaGear } from "react-icons/fa6";

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
    const [showFormOrderedItems, setShowFormOrderedItems] = useState<CategoryData | null>(null);
    const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
    const [editCategoryName, setEditCategoryName] = useState<string>("");

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
                            className="w-7 h-7 lg:w-8 lg:h-8 top-1 opacity-100 absolute rounded-full bg-gray-400 text-black border-1 flex items-center justify-center gap-2 cursor-pointer z-1"
                            onClick={() => {
                                setEditCategoryId(category.id);
                                setEditCategoryName(category.name);
                            }}
                        >
                            <FaGear className="text-lg" />
                        </button>
                        <button
                            title="Ativar ou desativar categoria"
                            className={`${category.categoryItems?.length === 0 ? "text-gray-500" : "text-black cursor-pointer"} w-7 h-7 lg:w-8 lg:h-8 absolute left-9 top-1 rounded-full bg-gray-400 text-black border-1 flex items-center justify-center transition-all duration-200 z-1`}
                            onClick={() => toggleStatusCategory(category.id)}
                            disabled={category.categoryItems?.length === 0}
                        >
                            {category.isAvailable ? (
                                <FaPause className="text-lg" />
                            ) : (
                                <FaPlay className="text-lg" />
                            )}
                        </button>
                        <button
                            title="Ajustar ordem dos itens"
                            className={`${(category.categoryItems?.length ?? 0) <= 1 ? "text-gray-500" : "text-black cursor-pointer"} w-7 h-7 lg:w-8 lg:h-8 absolute left-18 top-1 rounded-full bg-gray-400 text-black border-1 flex items-center justify-center transition-all duration-200 z-1`}
                            onClick={() => setShowFormOrderedItems(category)}
                            disabled={(category.categoryItems?.length ?? 0) <= 1}
                        >
                            <LuArrowDownWideNarrow />
                        </button>
                        <h1
                            style={{ borderColor: !category.isAvailable || (category.categoryItems?.length ?? 0) == 0 ? 'gray' : tempButtonColor }}
                            className={`max-w-full truncate text-2xl font-semibold border-b-4 pr-6 mb-2 pl-28 inline-block
                                ${!category.isAvailable || (category.categoryItems?.length ?? 0) == 0 ? 'opacity-40 text-black' : ''}
                            `}
                        >
                            {category.name}
                            {category.categoryItems?.length === 0 && category.isAvailable ? " (sem itens)" : ""}
                            {category.isAvailable ? '' : ' (Pausado)'}
                        </h1>
                    </div>
                    {!category.isAvailable && (
                        <span className="text-md text-gray-500">Todos os itens dessa categoria não são visíveis para o cliente, para voltar a oferecer esses itens ative a categoria no botão acima</span>
                    )}
                    {(category.categoryItems?.length ?? 0) == 0 && (
                        <span className="text-md text-gray-500">Categorias sem itens não são visíveis para o cliente, adicione itens para a categoria {category.name} ficar disponível.</span>
                    )}
                    <ul className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 py-1">
                        {(category.categoryItems ?? []).length > 0 ? (
                            (category.categoryItems ?? [])
                                .sort((a, b) => b.order - a.order)
                                .map(item => (
                                    <li
                                        key={item.id}
                                        className={`relative min-h-40 flex border-[1px] ${tempBackgroundColor === 'white' ? 'border-zinc-300' : 'border-zinc-900'}`}
                                    >
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
                                className="h-[150px] w-full flex flex-col-reverse items-center justify-center border-[4px] border-primary cursor-pointer"
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
            {showFormOrderedItems && (
                <MenuItemOrderManager
                    category={showFormOrderedItems}
                    onClose={() => setShowFormOrderedItems(null)}
                />
            )}
        </section>
    );
};


