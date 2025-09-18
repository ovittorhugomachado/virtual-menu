import React, { useEffect, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { LoadingComponentInternal } from "../../component-loading";
import { useRestaurantData } from "../../../context/restaurant-data/restaurant-data-context";
import { useManageMenu } from "../../../context/manage-menu/manage-menu-context";
import { MenuItemImageProps } from "../../../types/types-menu.d";

export const MenuItemImage = ({ id }: MenuItemImageProps) => {

    const { restaurantData } = useRestaurantData();
    const { menuItems, updateImageMenuItem } = useManageMenu();
    const [imageUrl, setImageUrl] = useState("/food-default.png");
    const [imageVersion, setImageVersion] = useState(Date.now());
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        inputRef.current?.click();
    };

    useEffect(() => {
        const image = menuItems.find(item => item.id === id)?.photoUrl || "/food-default.png";
        setImageUrl(image);
    }, [menuItems, id]);

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        const newExtension = file?.name.split('.').pop()?.toLowerCase() ?? 'jpg';
        const newImageUrl = `https://s3.us-east-2.amazonaws.com/bucket.rangos/store-${restaurantData?.user.id}/menu-items/item-${id}.${newExtension}`

        
        if (file && id) {
            setIsLoading(true);
            try {
                await updateImageMenuItem(id, file);
                setImageVersion(Date.now());
                setImageUrl(newImageUrl);
                setError(null);

            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("Erro desconhecido ao enviar logo.");
                }
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <>
            {isLoading ? (
                <div className="w-[130px] h-full inset-0 p-4 flex items-center justify-center bg-transparent rounded-full z-0">
                    <LoadingComponentInternal />
                </div>
            ) : (
                <>
                    <img
                        src={`${imageUrl}?v=${imageVersion}`}
                        alt="item-image"
                        className="w-[130px] h-full ms:w-[150px] object-cover"
                        onError={e => (e.currentTarget.src = "/food-default.png")}
                    />
                    <button
                        style={{ fontSize: '18px', padding: '5px' }}
                        type="button"
                        title="Alterar Logoda loja"
                        className="w-8 h-8 sm:w-8 sm:h-8 rounded-full bg-gray-400 text-black border-1 absolute bottom-2 left-2 flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-200"
                        onClick={handleButtonClick}
                    >
                        <FaCamera className="text-black" />
                    </button>
                    <input
                        type="file"
                        accept="image/*"
                        ref={inputRef}
                        style={{ display: "none" }}
                        onChange={handleImageUpload}
                    />
                </>
            )}
            {error && (
                <div className="text-xs bg-red-600 text-white px-3 py-1 rounded shadow absolute top-2 right-2 z-10">
                    {error}
                </div>
            )}
        </>
    );
};