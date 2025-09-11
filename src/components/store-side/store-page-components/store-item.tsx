import { useEffect, useRef, useState } from "react";
import { useManageMenu } from "../../../context/manage-menu/manage-menu-context";
import { uploadMenuItemImage } from "../../../services/service-upload-image";
import { UpdateMenuItemForm } from "../forms/form-create-update-menu-item";
import { MdOutlineEdit } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import { FaCamera } from "react-icons/fa";

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
    image,
    name,
    description,
    price,
    categoryId,
    id,
    onUpdated,
}: ItemProps) => {

    const { deleteMenuItem } = useManageMenu();

    const [error, setError] = useState<string | null>(null);
    const [imageVersion, setImageVersion] = useState(Date.now());
    const [showFormUpdateMenuItem, setShowFormUpdateMenuItem] = useState<number | null>(null);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(null), 2000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const inputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        inputRef.current?.click();
    };

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                await uploadMenuItemImage(categoryId, id, file);
                setImageVersion(Date.now());
                setError(null);
                if (onUpdated) onUpdated();
            } catch (error) {
                console.error("Erro ao enviar imagem:", error);
                setError(error instanceof Error ? error.message : 'Erro ao enviar imagem');
            }
        }
    };

    return (
        <>
            <div className="w-[130px] h-[165px] ms:w-[150px] ms:h-[150px] relative shrink-0">
                <img
                    src={image ? `${image}?v=${imageVersion}` : "../food-default.png"}
                    alt=""
                    className="w-[130px] h-[165px] ms:w-[150px] ms:h-[150px] object-cover"
                />
                <button
                    type="button"
                    title="Configurar Banner da loja"
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary text-black absolute bottom-0 m-2 flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-200"
                    onClick={handleButtonClick}
                >
                    <FaCamera className="text-black scale-120" />
                </button>
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
                    categoryId={categoryId}
                    onUpdated={() => onUpdated && onUpdated()}
                    itemId={id}
                    initialData={{ name, description, price }}
                />
            )}
            <div className="absolute top-[-11px] right-[10px] flex">
                <button
                    title="Renomear categoria"
                    className="w-5 h-5 border-[1px] rounded-full bg-blue-800 text-white border-amber-50 z-2 flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-200"
                    onClick={() => setShowFormUpdateMenuItem(id)}
                >
                    <MdOutlineEdit className="text-sm" />
                </button>
                <button
                    title="Excluir categoria"
                    className="w-5 h-5 ml-2 border-[1px] rounded-full bg-red-600 text-white border-amber-50 z-2 flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-200"
                    onClick={async () => {
                        await deleteMenuItem(id);
                        if (onUpdated) onUpdated();
                    }}
                >
                    <IoCloseOutline className="text-lg" />
                </button>
            </div>
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                style={{ display: "none" }}
                onChange={handleImageUpload}
            />
            {error && (
                <div className="absolute top-2 right-2 text-xs bg-red-600 text-white px-3 py-1 rounded shadow z-10">
                    {error}
                </div>
            )}
        </>
    );
};