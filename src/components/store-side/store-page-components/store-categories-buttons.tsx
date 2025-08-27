import React, { useState } from "react";
import { createCategoryService, toggleStatusCategoryService, RenameCategoryService } from "../../../services/service-manage-menu-store";
import { Category } from "../../../types/types-menu.d";
import { CreateCategoryForm, UpdateCategoryForm } from "../forms/form-create-update-categories";
import { FaGear, FaListUl, FaPause, FaPlay } from "react-icons/fa6";
import { CategoryOrderManager } from "../forms/order-of-categories";
import { IoAddCircle } from "react-icons/io5";

interface CategoryButtonsProps {
    backgroundColor?: string;
    categories: Category[];
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
    buttonColor?: string;
    textColor?: string;
}

export const CategoryButtons = ({ categories, setCategories, buttonColor, textColor }: CategoryButtonsProps) => {

    const [showFormSettings, setShowFormSettings] = useState(false);
    const [showFormOrdered, setShowFormOrdered] = useState(false);
    const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
    const [editCategoryName, setEditCategoryName] = useState<string | null>("");

    const createCategory = async (name: string) => {
        try {
            const createdCategory = await createCategoryService({ name });
            if (createdCategory !== null && createdCategory !== undefined) {
                setCategories(prev => [...prev, createdCategory]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const RenameCategory = async (categoryId: number, newName: string) => {
        try {
            const updatedCategory = await RenameCategoryService(categoryId, newName);
            setCategories(prev => prev.map(cat => cat.id === categoryId ? updatedCategory : cat));
        } catch (error) {
            console.error(error);
        }
    };

    const toggleStatusCategory = async (categoryId: number) => {
        try {
            const updatedCategory = await toggleStatusCategoryService(categoryId);
            setCategories(prev =>
                prev.map(cat =>
                    cat.id === categoryId
                        ? { ...cat, isAvailable: updatedCategory.isAvailable }
                        : cat
                )
            );
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="w-full flex flex-wrap justify-center gap-4 p-2.5 my-3.5">
                {categories
                    .sort((a, b) => a.order - b.order)
                    .map((category) => (
                        <div
                            key={category.id}
                            className={`relative min-w-28 h-8 lg:h-10 mx-auto px-18 rounded-3xl text-${textColor} relative flex-grow flex items-center justify-center cursor-pointer transition-transform duration-200`}
                            style={{
                                backgroundColor: buttonColor ?? ''
                            }}
                        >
                            {!category.isAvailable && (
                                <div className="absolute w-full h-full bg-gray-300/50  rounded-full">
                                </div>
                            )}
                            <button
                                title="Renomear categoria"
                                className="w-7 h-7 lg:w-8 lg:h-8 opacity-100 absolute left-0.5 lg:left-1 rounded-full bg-gray-400 text-black border-1 flex items-center justify-center gap-2 cursor-pointer hover:scale-105 transition-all duration-200"
                                onClick={() => {
                                    setEditCategoryId(category.id);
                                    setEditCategoryName(category.name);
                                }}
                            >
                                <FaGear className="text-lg" />
                            </button>
                            <button
                                title="Renomear categoria"
                                className="w-7 h-7 lg:w-8 lg:h-8 absolute left-9.5 lg:left-10 rounded-full bg-gray-400 text-black border-1 flex items-center justify-center gap-2 cursor-pointer hover:scale-105 transition-all duration-200"
                                onClick={() => toggleStatusCategory(category.id)}
                            >
                                {category.isAvailable ? (
                                    <FaPause className="text-lg" />
                                ) : (
                                    <FaPlay className="text-lg" />
                                )}
                            </button>
                            <button
                                type="button"
                                className="max-w-56 whitespace-nowrap truncate text-start"
                            >
                                {category.name}
                            </button>
                        </div>
                    ))}
                {showFormSettings && (
                    <CreateCategoryForm
                        onClose={() => setShowFormSettings(false)}
                        onSubmit={async (name) => {
                            await createCategory(name);
                        }}
                    />
                )}
                {showFormOrdered && (
                    <CategoryOrderManager
                        categories={categories}
                        setCategories={setCategories}
                        onClose={() => setShowFormOrdered(false)}
                    />
                )}
                {editCategoryId !== null && editCategoryName !== null && (
                    <UpdateCategoryForm
                        onClose={() => {
                            setEditCategoryId(null);
                            setEditCategoryName(null);
                        }}
                        onSubmit={async (newName) => {
                            await RenameCategory(editCategoryId, newName);
                            setCategories(prev =>
                                prev.map(cat =>
                                    cat.id === editCategoryId ? { ...cat, name: newName } : cat
                                )
                            );
                        }}
                        initialName={editCategoryName}
                        categoryId={editCategoryId}
                    />
                )}
            </div>
            <div className="flex gap-4">
                <button
                    title="Criar nova categoria"
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-3xl text-black bg-gray-400 flex-grow cursor-pointer hover:scale-103 transition-transform duration-200"
                    onClick={() => setShowFormSettings(true)}
                >
                   <IoAddCircle className="text-2xl hidden sm:block" /> Criar nova categoria
                </button>
                <button
                    title="Ajustar ordem"
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-3xl text-black bg-gray-400 flex-grow cursor-pointer hover:scale-103 transition-transform duration-200"
                    onClick={() => setShowFormOrdered(true)}
                >
                    <FaListUl className="hidden sm:block" /> Ajustar ordem das categorias
                </button>
            </div>
        </>
    );
};