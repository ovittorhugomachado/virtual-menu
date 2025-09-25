import React, { useRef, useState } from "react";
import { useRestaurantData } from "../../../context/restaurant-data/restaurant-data-context";
import { LoadingComponentInternal } from "../../component-loading";
import { DeleteBannerImage, UploadBannerImage } from "../../../services/service-upload-image";
import { FaCamera } from "react-icons/fa";
import { BsFillTrash3Fill } from "react-icons/bs";

export const StoreBanner = () => {

    const { bannerUrl, setBannerUrl, restaurantData } = useRestaurantData();
    const [bannerVersion, setBannerVersion] = useState(Date.now());
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        inputRef.current?.click();
    };

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        const newExtension = file?.name.split('.').pop()?.toLowerCase() ?? 'jpg';
        const newBannerUrl = `https://s3.us-east-2.amazonaws.com/bucket.rangos/store-${restaurantData?.user.id}/banner.${newExtension}`
        
        if (file && restaurantData) {
            setIsLoading(true);
            try {
                await UploadBannerImage(file);
                setBannerVersion(Date.now());
                setBannerUrl(newBannerUrl);
                setError(null);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("Erro desconhecido ao enviar banner.");
                }
            } finally {
                setIsLoading(false);
            }
        }
    };

    const deleteBanner = async () => {
        setIsLoading(true);
        try {
            await DeleteBannerImage();
            setBannerUrl("/store-banner-default.png")
            setError(null);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Erro ao excluir banner. Tente novamente.");
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="w-full relative hidden xs:block">
            {isLoading ? (
                <div className="w-full min-h-70 flex items-center justify-center max-h-80 object-center object-contain">
                    <LoadingComponentInternal />
                </div>
            ) : (
                <img
                    src={
                        bannerUrl
                            ? `${bannerUrl}?v=${bannerVersion}`
                            : "/store-banner-default.png"
                    }
                    alt="banner"
                    className="w-full min-h-30 max-h-80 object-center object-contain"
                />
            )}
            <div className="flex items-center gap-2 absolute bottom-2 left-2">
                {bannerUrl !== "/store-banner-default.png" && (
                    <button
                        type="button"
                        title="Excluir banner"
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-400 text-black left-0 flex items-center justify-center border-1 cursor-pointer"
                        onClick={deleteBanner}
                    >
                        <BsFillTrash3Fill className="text-black scale-120" />
                    </button>
                )}
                <button
                    type="button"
                    title="Configurar Banner da loja"
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-400 text-black left-0 flex items-center justify-center border-1 cursor-pointer"
                    onClick={handleButtonClick}
                >
                    <FaCamera className="text-black scale-120" />
                </button>
                <span className="h-5 text-[13px] bg-gray-400 rounded-full text-black px-8 py-1 border-1 shadow hidden sm:flex items-center">
                    *Recomenda-se 1600x400px
                </span>
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
        </div>
    );
};