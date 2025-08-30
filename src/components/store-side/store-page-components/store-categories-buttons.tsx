import React, { useState, useRef, useEffect } from "react";
import { animate, motion, useMotionValue } from "motion/react"
import { createCategoryService, toggleStatusCategoryService, RenameCategoryService } from "../../../services/service-manage-menu-store";
import { Category } from "../../../types/types-menu.d";
import { CreateCategoryForm, UpdateCategoryForm } from "../forms/form-create-update-categories";
import { FaGear, FaListUl, FaPause, FaPlay } from "react-icons/fa6";
import { CategoryOrderManager } from "../forms/order-of-categories";
import { IoAddCircle } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";

interface CategoryButtonsProps {
    backgroundColor?: string;
    categories: Category[];
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
    buttonColor?: string;
    textColor?: string;
}

export const CategoryButtons = ({ backgroundColor, categories, setCategories, buttonColor, textColor }: CategoryButtonsProps) => {

    const x = useMotionValue(0);
    const carousel = useRef<HTMLDivElement>(null);
    const [maxScroll, setMaxScroll] = useState(0);
    const [positionCarousel, setPositionCarousel] = useState(0);
    const [showFormSettings, setShowFormSettings] = useState(false);
    const [showFormOrdered, setShowFormOrdered] = useState(false);
    const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
    const [editCategoryName, setEditCategoryName] = useState<string | null>("");

    const scrollRight = () => {
        const newPosition = x.get() - 200;
        const minPosition = -maxScroll;
        const targetPosition = Math.max(minPosition, newPosition);

        animate(x, targetPosition, {
            type: "spring",
            stiffness: 300,
            damping: 30,
        });
    };

    const scrollLeft = () => {
        const newPosition = x.get() + 200;
        const maxPosition = 0;
        const targetPosition = Math.min(maxPosition, newPosition);

        animate(x, targetPosition, {
            type: "spring",
            stiffness: 300,
            damping: 30,
        });
    };

    useEffect(() => {
        const unsubscribe = x.on("change", (latest) => {
            setPositionCarousel(latest);
        });
        return () => unsubscribe();
    }, [categories, x]);

    useEffect(() => {
        const updateSize = () => {
            if (carousel.current) {
                setTimeout(() => {
                    const newMaxScroll = carousel.current!.scrollWidth - carousel.current!.offsetWidth;

                    setMaxScroll(newMaxScroll);

                    x.stop();
                    x.set(0);
                    setPositionCarousel(0);
                }, 50);
            }
        };

        updateSize();
        window.addEventListener("resize", updateSize);

        return () => {
            window.removeEventListener("resize", updateSize);
        };
    }, [categories, x]);

    useEffect(() => {
        x.set(0);
    }, [categories, x]);

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
        <div
            className={`${backgroundColor === 'black' ? 'bg-black' : 'bg-white'} w-full mx-2 pb-6 sticky -top-1 ms:top-42 sm:top-29 flex justify-center`}
            style={{ zIndex: 4 }}
        >
            <button
                className={`${positionCarousel === 0 ? '' : 'cursor-pointer'} absolute -left-6 top-6 lg:top-7 z-30`}
                onClick={scrollLeft}
                disabled={positionCarousel === 0}
            >
                <IoIosArrowBack
                    className={`${backgroundColor === 'black' ? 'text-white' : 'text-black'} text-3xl font-extrabold`}
                    style={{ opacity: positionCarousel === 0 ? '10%' : '' }}
                />
            </button>
            <motion.div className="w-full overflow-x-hidden relative" ref={carousel} whileTap={{ cursor: "grabbing" }}>
                <motion.div
                    className="w-full flex gap-4 p-2.5 my-3.5 flex-shrink-0"
                    drag="x"
                    dragConstraints={{ right: 0, left: -maxScroll }}
                    style={{ x }} 
                >
                    {categories
                        .sort((a, b) => a.order - b.order)
                        .map((category) => (
                            <motion.div
                                key={category.id}
                                layout
                                className="relative min-w-28 h-8 lg:h-10 px-20 rounded-3xl flex items-center justify-center flex-shrink-0 cursor-pointer transition-transform duration-200"
                                style={{
                                    backgroundColor: buttonColor ?? '',
                                    color: textColor,
                                }}
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
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
                                    title="Ativar ou desativar categoria"
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
                            </motion.div>
                        ))}
                </motion.div>
                <div className="flex gap-4 justify-center">
                    <button
                        title="Criar nova categoria"
                        className="flex items-center justify-center gap-2 px-4 py-2 rounded-3xl text-black bg-gray-400 cursor-pointer hover:scale-103 transition-transform duration-200"
                        onClick={() => setShowFormSettings(true)}
                    >
                        <IoAddCircle className="text-2xl hidden sm:block" /> Criar nova categoria
                    </button>
                    <button
                        title="Ajustar ordem"
                        className="flex items-center justify-center gap-2 px-4 py-2 rounded-3xl text-black bg-gray-400 cursor-pointer hover:scale-103 transition-transform duration-200"
                        onClick={() => setShowFormOrdered(true)}
                    >
                        <FaListUl className="hidden sm:block" /> Ajustar ordem das categorias
                    </button>
                </div>
            </motion.div>
            <button
                className={`${Math.abs(positionCarousel) === maxScroll ? '' : 'cursor-pointer'} absolute -right-6 top-6 lg:top-7 z-30 rotate-180`}
                onClick={scrollRight}
                disabled={positionCarousel === maxScroll}
            >
                <IoIosArrowBack
                    className={`${backgroundColor === 'black' ? 'text-white' : 'text-black'} text-3xl font-extrabold`}
                    style={{ opacity: Math.abs(positionCarousel) === maxScroll ? '10%' : '' }}
                />
            </button>
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
        </div >
    );
};