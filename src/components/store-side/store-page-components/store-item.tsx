import { useEffect, useState } from "react";
import { MenuItemProps } from "../../../types/types-menu.d";
import { UpdateMenuItemForm } from "../forms/form-create-update-menu-item";
import { MenuItemImage } from "./store-item-image";
import { FaGear } from "react-icons/fa6";

export const Item = ({
    name,
    description,
    price,
    id,
}: MenuItemProps) => {

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
            <div className="h-full relative shrink-0">
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
                <h5 className="mr-5">R$ {Number((price ?? 0).toString().replace(',', '.')).toFixed(2).replace('.', ',')}</h5>
            </div>
            {showFormUpdateMenuItem === id && (
                <UpdateMenuItemForm
                    onClose={() => setShowFormUpdateMenuItem(null)}
                    itemId={id}
                />
            )}
            <div className="absolute bottom-3 right-2 flex">
                <button
                    title="Editar item"
                    className="p-1.5 rounded-full ms:px-2+1.5 ms:py-0.5 lg:py-1.5 xl:py-0.5 lg:rounded-full border-1 bg-gray-400 text-black z-2 flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-200"
                    onClick={() => setShowFormUpdateMenuItem(id)}
                >
                    <FaGear className="text-xl ms:mr-2 lg:mr-0 xl:mr-2" />
                    <span className="hidden ms:block lg:hidden xl:block">Editar item</span>
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

export const ItemList = ({
    name,
    price,
    id,
}: MenuItemProps) => {

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
            <div className="py-4 px-4 mr-1 flex flex-col justify-between overflow-x-hidden">
                <h5 className="font-bold line-clamp-2">{name}</h5>
                <h6 className="mr-5 text-zinc-600">R$ {Number((price ?? 0).toString().replace(',', '.')).toFixed(2).replace('.', ',')}</h6>
            </div>
            {showFormUpdateMenuItem === id && (
                <UpdateMenuItemForm
                    onClose={() => setShowFormUpdateMenuItem(null)}
                    itemId={id}
                />
            )}
            <div className="flex items-center mr-4">
                <button
                    title="Editar item"
                    className="px-1.5 py-0.5 rounded-full  lg:rounded-full border-1 bg-gray-400 text-black z-2 flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-200"
                    onClick={() => setShowFormUpdateMenuItem(id)}
                >
                    <FaGear className="text-xl ms:mr-2 lg:mr-0 xl:mr-2" />
                    <span className="hidden ms:block lg:hidden xl:block">Editar item</span>
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