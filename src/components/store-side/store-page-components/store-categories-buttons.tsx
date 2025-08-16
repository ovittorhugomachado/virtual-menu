import React, { useState } from "react";
import { createCategoryService, deleteCategoryService, RenameCategoryService } from "../../../services/service-manage-menu-store";
import { Category } from "../../../types/types-menu.d";
import { CreateCategoryForm, UpdateCategoryForm } from "../forms/form-create-update-categories";
import { IoCloseOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";

interface CategoryButtonsProps {
    backgroundColor?: string;
    categories: Category[];
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
    buttonColor?: string;
    textColor?: string;
}

export const CategoryButtons = ({ categories, setCategories, buttonColor, textColor }: CategoryButtonsProps) => {

    const [showForm, setShowForm] = useState(false);
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

    const deleteCategory = async (categoryId: number) => {
        try {
            await deleteCategoryService(categoryId);
            setCategories(prev => prev.filter(cat => cat.id !== categoryId));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="w-full flex flex-wrap justify-center gap-4 p-2.5 my-3.5">
            {categories.map((category) => (
                <div
                    key={category.id}
                    className={`min-w-28 h-8 lg:h-10 px-3 rounded-3xl text-${textColor} relative flex-grow flex items-center justify-center cursor-pointer transition-transform duration-200`}
                    style={{ backgroundColor: buttonColor ?? '' }}
                >
                    <button
                        type="button"
                        className="w-full h-full flex items-center justify-center"
                    >
                        {category.name}
                    </button>
                    <div className="absolute top-[-11px] left-[10px] flex">
                        <button
                            title="Excluir categoria"
                            className="w-5 h-5 border-[1px] rounded-full bg-red-600 text-white border-amber-50 z-2 flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-200"
                            onClick={() => deleteCategory(category.id)}
                        >
                            <IoCloseOutline className="text-lg" />
                        </button>
                        <button
                            title="Renomear categoria"
                            className="ml-2 w-5 h-5 border-[1px] rounded-full bg-blue-800 text-white border-amber-50 z-2 flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-200"
                            onClick={() => {
                                setEditCategoryId(category.id);
                                setEditCategoryName(category.name);
                            }}
                        >
                            <MdOutlineEdit className="text-sm" />
                        </button>
                    </div>
                </div>
            ))}
            {showForm ? (
                <CreateCategoryForm
                    onClose={() => setShowForm(false)}
                    onSubmit={async (name) => {
                        await createCategory(name);
                        setShowForm(false);
                    }}
                />
            ) : (
                <button
                    title="Criar nova categoria"
                    className="w-[35px] max-w-[35px] h-8 lg:h-10 rounded-3xl font-extrabold text-black bg-primary flex-grow cursor-pointer hover:scale-103 transition-transform duration-200"
                    onClick={() => setShowForm(true)}
                >
                    +
                </button>
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
                        setEditCategoryId(null);
                        setEditCategoryName(null);
                    }}
                    initialName={editCategoryName}
                />
            )}
        </div>
    );
};