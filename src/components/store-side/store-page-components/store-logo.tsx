import React, { useRef, useState } from "react";
import { UploadLogo } from "../../../services/service-upload-image";
import { FaCamera } from "react-icons/fa";
import { LoadingComponent } from "../../component-loading";
import { useRestaurantData } from "../../../context/restaurant-data/restaurant-data-context";

export const Logo = () => {

    const { logoUrl, setLogoUrl, restaurantData } = useRestaurantData();
    const [logoVersion, setLogoVersion] = useState(Date.now());
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        inputRef.current?.click();
    };

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        const newExtension = file?.name.split('.').pop()?.toLowerCase() ?? 'jpg';
        const newLogoUrl = `https://s3.us-east-2.amazonaws.com/bucket.rangos/store${restaurantData?.user.id}/logo.${newExtension}`
           
        if (file && restaurantData) {
            setIsLoading(true);
            try {
                await UploadLogo(file);
                setLogoVersion(Date.now());
                setLogoUrl(newLogoUrl);
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
        <div className="w-24 h-24 sm:w-23 sm:h-23 rounded-full relative">
            {isLoading ? (
                <div className="absolute inset-0 p-4 flex items-center justify-center bg-transparent rounded-full z-0">
                    <LoadingComponent />
                </div>
            ) : (
                <img
                    src={`${logoUrl}?v=${logoVersion}`}
                    alt="logo"
                    className="w-full h-full object-cover rounded-full"
                    onError={e => (e.currentTarget.src = "/store-logo-default.png")}
                />
            )}
            <button
                style={{ fontSize: '18px', padding: '5px' }}
                type="button"
                title="Alterar Logoda loja"
                className="w-8 h-8 sm:w-8 sm:h-8 rounded-full bg-gray-400 text-black border-1 absolute bottom-0 left-0 flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-200"
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
            {error && (
                <div className="text-xs bg-red-600 text-white px-3 py-1 rounded shadow absolute top-2 right-2 z-10">
                    {error}
                </div>
            )}
        </div>
    );
};