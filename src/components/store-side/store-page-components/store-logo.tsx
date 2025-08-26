import React, { useRef, useState } from "react";
import { UploadLogo } from "../../../services/service-upload-image";
import { FaCamera } from "react-icons/fa";
import { LoadingComponentLines } from "../../component-loading";

export const Logo = ({ logo, onLogoChange }: { logo: string, onLogoChange: (newLogoUrl: string) => void }) => {
    const [logoVersion, setLogoVersion] = useState(Date.now());
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
                await UploadLogo(file);
                setLogoVersion(Date.now());
                setError(null);
                onLogoChange(logo);
            } catch (error) {
                console.error("Erro ao enviar imagem:", error);
                setError("Erro ao enviar imagem. Por favor, tente novamente mais tarde.");
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="w-24 h-24 sm:w-23 sm:h-23 rounded-full relative">
            {isLoading ? (
                <div className="absolute inset-0 p-4 flex items-center justify-center bg-transparent rounded-full z-0">
                    <LoadingComponentLines />
                </div>
            ) : (
                <img
                    src={
                        logo
                            ? `${logo}?v=${logoVersion}`
                            : "/store-logo-default.png"
                    }
                    alt="logo"
                    className="w-full h-full object-cover rounded-full"
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