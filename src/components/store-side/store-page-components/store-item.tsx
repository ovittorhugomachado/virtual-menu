import { useEffect, useState } from "react";
import { useManageMenu } from "../../../context/manage-menu/manage-menu-context";
import { MdOutlineEdit } from "react-icons/md";
import { UpdateMenuItemForm } from "../forms/form-create-update-menu-item";
import { MenuItemImage } from "./store-item-image";

interface ItemProps {
    image?: string;
    name: string;
    description: string;
    price: number | string;
    categoryId: number;
    id: number;
    onUpdated?: () => void;
}

export const Item = ({
    name,
    description,
    price,
    id,
    onUpdated,
}: ItemProps) => {

    const { deleteMenuItem } = useManageMenu();
    const [error, setError] = useState<string | null>(null);
    const [showFormUpdateMenuItem, setShowFormUpdateMenuItem] = useState<number | null>(null);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(null), 2000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    return (
        <>
            <div className="w-[130px] h-[165px] ms:w-[150px] ms:h-[150px] relative shrink-0">
                <MenuItemImage
                    id={id}
                />
            </div>
            <div className="py-4 px-4 mr-1 flex flex-col justify-between overflow-x-hidden">
                <h5 className="font-bold line-clamp-2">{name}</h5>
                <p
                    style={{
                        fontSize: '13px',
                    }}
                    className="font-light line-clamp-2"
                >
                    {description}
                </p>
                <h5>R$ {Number((price ?? 0).toString().replace(',', '.')).toFixed(2).replace('.', ',')}</h5>
            </div>
            {showFormUpdateMenuItem === id && (
                <UpdateMenuItemForm
                    onClose={() => setShowFormUpdateMenuItem(null)}
                    itemId={id}
                />
            )}
            <div className="absolute bottom-3 right-2 flex">
                <button
                    title="Renomear categoria"
                    className="px-2 rounded-xl bg-gray-400 text-black z-2 flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-200"
                    onClick={() => setShowFormUpdateMenuItem(id)}
                >
                    Editar item
                    <MdOutlineEdit className="text-xl" />
                </button>
            </div>
            {error && (
                <div className="absolute top-2 right-2 text-xs bg-red-600 text-white px-3 py-1 rounded shadow z-10">
                    {error}
                </div>
            )}
        </>
    );
};