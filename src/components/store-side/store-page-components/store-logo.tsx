import React, { useRef, useState } from "react";
import { UploadWhiteLogo} from "../../../services/service-upload-image";
import { FaCamera } from "react-icons/fa";

export const WhiteLogo= ({ logo, onImageChange }: { logo: string; onImageChange: () => void; }) => {
    const [logoVersion, setLogoVersion] = useState(Date.now());
    const [error, setError] = useState<string | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        inputRef.current?.click();
    };

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                await UploadLogo(file);
                setLogoVersion(Date.now());
                setError(null);
                onImageChange();
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("Erro ao enviar imagem. Por favor, tente novamente mais tarde.");
                }
            }
        }
    };

    return (
        <div className="w-16 h-16 sm:w-23 sm:h-23 rounded-full relative">
            <img
                src={WhiteLogo? `${logo}?v=${logoVersion}` : "/logo-default.png"}
                alt="logo"
                className="w-full h-full object-cover rounded-full"
            />
            <button
                type="button"
                title="Alterar WhiteLogoda loja"
                className="w-6 h-6 sm:w-8 sm:h-8 border-2 rounded-full bg-white bg-opacity-70 text-black absolute bottom-0 left-0 flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-200"
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