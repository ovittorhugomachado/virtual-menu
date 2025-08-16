import React, { useEffect, useState } from "react";
import { categoryFormProps } from "../../../types/types-data-forms.d";
import { IoCloseOutline } from "react-icons/io5";

export const CreateCategoryForm = ({
    onClose,
    onSubmit,
}: categoryFormProps) => {
    const [name, setName] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onSubmit(name.trim());
            setName("");
        }
    };

    return (
        <div className="fixed inset-0 z-30 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center bg-white/10 backdrop-blur-sm">
                <form
                    className="w-120 max-w-[600px] h-[300px] min-h-[270px] mx-1.5 p-6 py-10 rounded-xl border border-zinc-300 bg-white  shadow-lg flex flex-col items-center justify-between gap-4 relative"
                    onSubmit={handleSubmit}
                >
                    <button
                        type="button"
                        className="absolute top-2 right-2 p-2 rounded-full bg-red-600 text-white cursor-pointer transition-all duration-200"
                        onClick={onClose}
                    >
                        <IoCloseOutline className="text-lg" />
                    </button>
                    <h3 className="text-lg md:text-2xl">Criar nova categoria</h3>
                    <div className="w-full flex flex-col items-start justify-center">
                        <label htmlFor="category-name" className="text-md ml-2">
                            Nome
                        </label>
                        <input
                            type="text"
                            id="category-name"
                            placeholder="Nome da categoria"
                            className="input"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            autoFocus
                        />
                    </div>
                    <div className="flex flex-wrap justify-center gap-2">
                        <button
                            type="submit"
                            className="primary-button"
                        >
                            Criar categoria
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export const UpdateCategoryForm = ({ 
    onClose,
    onSubmit,
    initialName = "",
}: categoryFormProps & { initialName?: string }) => {
    const [name, setName] = useState("");

    useEffect(() => {
        setName(initialName);
    }, [initialName]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onSubmit(name.trim());
            setName("");
        }
    };

    return (
        <div className="fixed inset-0 z-30 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center bg-white/10 backdrop-blur-sm">
                <form
                    className="w-120 max-w-[600px] h-[300px] min-h-[270px] mx-1.5 p-6 py-10 rounded-xl border border-zinc-300 bg-white shadow-lg flex flex-col items-center justify-between gap-4 relative"
                    onSubmit={handleSubmit}
                >
                    <button
                        type="button"
                        className="absolute top-2 right-2 p-2 rounded-full bg-red-600 text-white cursor-pointer transition-all duration-200"
                        onClick={onClose}
                    >
                        <IoCloseOutline className="text-lg" />
                    </button>
                    <h3 className="text-lg md:text-2xl">Renomear categoria</h3>
                    <div className="w-full flex flex-col items-start justify-center">
                        <label htmlFor="category-name" className="text-md ml-2">
                            Nome
                        </label>
                        <input
                            type="text"
                            id="category-name"
                            placeholder="Nome da categoria"
                            className="input"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            autoFocus
                        />
                    </div>
                    <div className="flex flex-wrap justify-center gap-2">
                        <button
                            type="submit"
                            className="primary-button"
                        >
                            Confirmar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};