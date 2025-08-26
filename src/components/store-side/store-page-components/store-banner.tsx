import React, { useRef, useState } from "react";
import { DeleteBannerImage, UploadBannerImage } from "../../../services/service-upload-image";
import { FaCamera } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export const StoreBanner = ({ banner, onBannerChange }: { banner: string, onBannerChange: () => void }) => {
    const [bannerVersion, setBannerVersion] = useState(Date.now());
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        inputRef.current?.click();
    };

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setIsLoading(true);
            try {
                await UploadBannerImage(file);
                setBannerVersion(Date.now());
                setError(null);
                onBannerChange();
            } catch (error) {
                console.error("Erro ao enviar imagem:", error);
                setError("Erro ao enviar imagem. Por favor, tente novamente mais tarde.");
            } finally {
                setIsLoading(false);
            }
        }
    };

    const deleteBanner = async () => {
        setIsLoading(true);
        try {
            await DeleteBannerImage();
            setError(null);
            onBannerChange()
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
            <img
                src={
                    isLoading
                        ? "/store-banner-loading.png"
                        : banner
                            ? `${banner}?v=${bannerVersion}`
                            : "/store-banner-default.png"
                }
                alt="imagem-capa"
                className={`${isLoading ? "animate-pulse duration-700" : "opacity-100"} w-screen min-h-30 max-h-80 object-center object-contain transition-opacity duration-300`}
            />
            <div className="flex items-center gap-2 absolute bottom-2 left-2">
                <button
                    type="button"
                    title="Excluir banner"
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-700 text-black left-0 flex items-center justify-center border-1 cursor-pointer hover:scale-105 transition-all duration-200"
                    onClick={deleteBanner}
                >
                    <IoClose className="text-white scale-160" />
                </button>
                <button
                    type="button"
                    title="Configurar Banner da loja"
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-400 text-black left-0 flex items-center justify-center border-1 cursor-pointer hover:scale-105 transition-all duration-200"
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