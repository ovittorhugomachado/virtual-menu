import React, { useState, useEffect } from "react";
import { useManageMenu } from "../../../context/manage-menu/manage-menu-context";
import { CategoryData } from "../../../types/types-menu.d";
import { UpdateDataForm } from "./deafult/form-update-data";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { LuArrowDownWideNarrow } from "react-icons/lu";

interface CategoryOrderManagerProps {
    onClose: () => void;
    categories: CategoryData[];
    setCategories: React.Dispatch<React.SetStateAction<CategoryData[]>>;
    buttonColor?: string;
    textColor?: string;
}

export const CategoryOrderManager: React.FC<CategoryOrderManagerProps> = ({
    onClose,
    categories,
    setCategories,
    buttonColor
}) => {
    const { reorderCategories } = useManageMenu();

    const [isReordering, setIsReordering] = useState(false);
    const [animatedIndexes, setAnimatedIndexes] = useState<number[]>([]);
    const [animationDirection, setAnimationDirection] = useState<"up" | "down" | null>(null);
    const [localCategories, setLocalCategories] = useState<CategoryData[]>([]);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        setLocalCategories([...categories].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
    }, [categories]);

    const moveCategoryUp = (index: number) => {
        if (index <= 0) return;
        setAnimatedIndexes([index, index - 1]);
        setAnimationDirection("up");

        setTimeout(() => {
            const newCategories = [...localCategories];
            const tempOrder = newCategories[index].order;
            newCategories[index].order = newCategories[index - 1].order;
            newCategories[index - 1].order = tempOrder;

            [newCategories[index], newCategories[index - 1]] =
                [newCategories[index - 1], newCategories[index]];

            setLocalCategories(newCategories);

            setAnimatedIndexes([]);
            setAnimationDirection(null);
        }, 600);
    };

    const moveCategoryDown = (index: number) => {
        if (index >= localCategories.length - 1) return;
        setAnimatedIndexes([index, index + 1]);
        setAnimationDirection("down");

        setTimeout(() => {
            const newCategories = [...localCategories];

            const tempOrder = newCategories[index].order;
            newCategories[index].order = newCategories[index + 1].order;
            newCategories[index + 1].order = tempOrder;

            [newCategories[index], newCategories[index + 1]] =
                [newCategories[index + 1], newCategories[index]];

            setLocalCategories(newCategories);

            setAnimatedIndexes([]);
            setAnimationDirection(null);
        }, 600);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsReordering(true);
        try {
            const orderData = localCategories.map(cat => ({
                id: cat.id,
                order: cat.order ?? 0
            }));
            await reorderCategories(orderData);
            setCategories(localCategories);
            setSuccessMessage("Ordem das categorias atualizada com sucesso!");
        } catch (error) {
            console.error("Erro ao reordenar categorias:", error);
        } finally {
            setIsReordering(false);
        }
    };

    const getAnimationClass = (index: number) => {
        if (!animatedIndexes.includes(index)) return "";

        if (animationDirection === "up") {
            return index === animatedIndexes[0] ? "animate-move-up" : "animate-move-down";
        } else if (animationDirection === "down") {
            return index === animatedIndexes[0] ? "animate-move-down" : "animate-move-up";
        }
        return "";
    };

    return (
        <UpdateDataForm
            title="Ordenar categorias"
            formIcon={<LuArrowDownWideNarrow />}
            onClose={onClose}
            textButtonSubmit="Salvar ordem"
            submitFunction={handleSubmit}
            successMessage={successMessage}
        >
            <div className="space-y-3 pt-8 relative">
                {isReordering && (
                    <div className="w-full text-center absolute -top-2 text-gray-500 mt-2">
                        Atualizando ordem...
                    </div>
                )}
                {localCategories
                    .sort((a, b) => (b.order ?? 0) - (a.order ?? 0))
                    .map((category, index) => (
                        <div
                            key={category.id}
                            className={`w-full flex items-center px-6 py-3 bg-primary dark:bg-[#161a21] rounded-full transition-all duration-200 ${getAnimationClass(index)}`}
                            style={{
                                backgroundColor: buttonColor ?? ''
                            }}
                        >
                            <span className="flex flex-1 truncate text-white dark:text-white">
                                {category.name}
                            </span>
                            <div className="flex gap-2">
                                <button
                                    title="Mover para cima"
                                    type="button"
                                    className={`w-8 h-8 rounded-full bg-white dark:bg-gray-700 text-gray-700 dark:text-white flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200 ${index === 0 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer hover:scale-110'
                                        }`}
                                    onClick={() => moveCategoryUp(index)}
                                    disabled={index === 0 || isReordering}
                                >
                                    <FaArrowUp size={14} />
                                </button>
                                <button
                                    title="Mover para baixo"
                                    type="button"
                                    className={`w-8 h-8 rounded-full bg-white dark:bg-gray-700 text-gray-700 dark:text-white flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200 ${index === localCategories.length - 1 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer hover:scale-110'
                                        }`}
                                    onClick={() => moveCategoryDown(index)}
                                    disabled={index === localCategories.length - 1 || isReordering}
                                >
                                    <FaArrowDown size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                <div className="text-sm mt-4 text-center text-gray-600 dark:text-gray-400">
                    <p>Use as setas para reordenar as categorias</p>
                </div>
            </div>
        </UpdateDataForm>
    );
};