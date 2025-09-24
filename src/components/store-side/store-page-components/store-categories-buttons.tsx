import { useState, useRef, useEffect } from "react";
import { animate, motion, useMotionValue } from "motion/react";
import { useManageMenu } from "../../../context/manage-menu/manage-menu-context";
import { CategoryData } from "../../../types/types-menu.d";
import { CreateCategoryForm, UpdateCategoryForm } from "../forms/form-create-update-categories";
import { MenuItemOrderManager } from "../forms/form-order-of-menu-items";
import { CategoryOrderManager } from "../forms/form-order-of-categories";
import { FaGear, FaPause, FaPlay } from "react-icons/fa6";
import { LuArrowDownWideNarrow } from "react-icons/lu";
import { IoIosArrowBack } from "react-icons/io";
import { IoAddCircle } from "react-icons/io5";

export const CategoryButtons = () => {

    const {
        tempBackgroundColor,
        tempButtonColor,
        tempTextColorButtons,
        categories,
        setCategories,
        toggleStatusCategory
    } = useManageMenu();

    const x = useMotionValue(0);
    const carousel = useRef<HTMLDivElement>(null);
    const [maxScroll, setMaxScroll] = useState(0);
    const [positionCarousel, setPositionCarousel] = useState(0);
    const [showFormCreateCategory, setShowFormCreateCategory] = useState(false);
    const [showFormOrderedCategories, setShowFormOrderedCategories] = useState(false);
    const [showFormOrderedItems, setShowFormOrderedItems] = useState<CategoryData | null>(null);
    const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
    const [editCategoryName, setEditCategoryName] = useState<string>("")

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
        const updateCarousel = () => {
            if (carousel.current) {
                const newMaxScroll = carousel.current.scrollWidth - carousel.current.offsetWidth;
                setMaxScroll(newMaxScroll);
                x.set(0);
            }
        };

        const ro = new ResizeObserver(updateCarousel);
        if (carousel.current) ro.observe(carousel.current);

        return () => ro.disconnect();
    }, [categories, x]);

    useEffect(() => {
        x.set(0);
    }, [categories, x]);

    return (
        <div
            className={`${tempBackgroundColor === 'black' ? 'bg-black' : 'bg-white'} w-full mx-2 pb-6 sticky -top-1 ms:top-42 sm:top-29 flex justify-center`}
            style={{ zIndex: 4 }}
        >
            {categories.length > 0 && (
                <>
                    <button
                        className={`${positionCarousel === 0 ? '' : 'cursor-pointer'} absolute -left-6 top-6 lg:top-7 z-30`}
                        onClick={scrollLeft}
                        disabled={positionCarousel === 0}
                    >
                        <IoIosArrowBack
                            className={`${tempBackgroundColor === 'black' ? 'text-white' : 'text-black'} text-3xl font-extrabold`}
                            style={{ opacity: positionCarousel === 0 ? 0.1 : 1 }}
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
                                .sort((a, b) => (b.order ?? 0) - (a.order ?? 0))
                                .map((category) => (
                                    <motion.div
                                        key={category.id}
                                        className="relative min-w-28 h-9 lg:h-10 pl-16 lg:pl-19.5 pr-5 rounded-3xl flex items-center justify-end flex-shrink-0 transition-transform duration-200"
                                        style={{
                                            backgroundColor: tempButtonColor ?? '',
                                            color: tempTextColorButtons,
                                        }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    >
                                        {(!category.isAvailable || category.categoryItems?.length === 0) && (
                                            <div className="absolute inset-0 w-full h-full bg-gray-300/50 rounded-full pointer-events-none"></div>
                                        )}
                                        <button
                                            title="Configurar categoria"
                                            className="w-7 h-7 lg:w-8 lg:h-8 opacity-100 absolute left-1 lg:left-1 rounded-full bg-gray-400 text-black border-1 flex items-center justify-center gap-2 cursor-pointer hover:scale-105 transition-all duration-200"
                                            onClick={() => {
                                                setEditCategoryId(category.id);
                                                setEditCategoryName(category.name);
                                            }}
                                        >
                                            <FaGear className="text-lg" />
                                        </button>
                                        <button
                                            title="Ativar ou desativar categoria"
                                            className={`${category.categoryItems?.length === 0 ? "text-gray-500" : "text-black cursor-pointer hover:scale-105"} w-7 h-7 lg:w-8 lg:h-8 absolute left-8.5 lg:left-9.5 rounded-full bg-gray-400 border-1 flex items-center justify-center gap-2 transition-all duration-200`}
                                            onClick={() => toggleStatusCategory(category.id)}
                                            disabled={category.categoryItems?.length === 0}
                                        >
                                            {category.isAvailable ? (
                                                <FaPause className="text-lg" />
                                            ) : (
                                                <FaPlay className="text-lg" />
                                            )}
                                        </button>
                                        <button
                                            title="Ajustar ordem dos itens"
                                            className={`${(category.categoryItems?.length ?? 0) <= 1 ? "text-gray-500" : "text-black cursor-pointer hover:scale-105"} w-7 h-7 lg:w-8 lg:h-8 absolute left-16 lg:left-18 rounded-full bg-gray-400 border-1 flex items-center justify-center gap-2 transition-all duration-200`}
                                            onClick={() => setShowFormOrderedItems(category)}
                                            disabled={(category.categoryItems?.length ?? 0) <= 1}
                                        >
                                            <LuArrowDownWideNarrow />
                                        </button>
                                        <button
                                            type="button"
                                            className="ml-8 max-w-56 whitespace-nowrap truncate text-start"
                                        >
                                            {category.name}
                                        </button>
                                    </motion.div>
                                ))}
                        </motion.div>
                        <div className="flex gap-4 justify-center overflow-hidden">
                            <button
                                title="Criar nova categoria"
                                className="flex items-center justify-center gap-2 px-4 py-2 rounded-3xl text-black bg-gray-400 cursor-pointer hover:scale-103 transition-transform duration-200"
                                onClick={() => setShowFormCreateCategory(true)}
                            >
                                <IoAddCircle className="text-2xl hidden sm:block" /> Criar nova categoria
                            </button>
                            <button
                                title="Ajustar ordem das categorias"
                                className="flex items-center justify-center gap-2 px-4 py-2 rounded-3xl text-black bg-gray-400 cursor-pointer hover:scale-103 transition-transform duration-200"
                                onClick={() => setShowFormOrderedCategories(true)}
                            >
                                <LuArrowDownWideNarrow className="hidden sm:block" /> Ajustar ordem das categorias
                            </button>
                        </div>
                    </motion.div>
                    <button
                        className={`${Math.abs(positionCarousel) === maxScroll ? '' : 'cursor-pointer'} absolute -right-6 top-6 lg:top-7 z-90 rotate-180`}
                        onClick={scrollRight}
                        disabled={positionCarousel === maxScroll}
                    >
                        <IoIosArrowBack
                            className={`${tempBackgroundColor === 'black' ? 'text-white' : 'text-black'} text-3xl font-extrabold `}
                            style={{ opacity: Math.abs(positionCarousel) === maxScroll ? 0.1 : 1 }}
                        />
                    </button>
                </>
            )}
            {categories.length === 0 && (
                <div className="w-full flex flex-col items-center gap-4">
                    <h4 className={`${tempBackgroundColor === 'black' ? 'text-white' : 'text-black'} w-full mt-16 text-center`}>Você não tem nenhuma categoria, bora criar uma?</h4>
                    <button
                        title="Criar nova categoria"
                        className="flex items-center justify-center gap-2 px-4 py-2 rounded-3xl text-black bg-primary cursor-pointer hover:scale-103 transition-transform duration-200"
                        onClick={() => setShowFormCreateCategory(true)}
                    >
                        <IoAddCircle className="text-2xl hidden sm:block" /> Criar nova categoria
                    </button>
                    {showFormCreateCategory && (
                        <CreateCategoryForm
                            onClose={() => setShowFormCreateCategory(false)}
                        />
                    )}
                </div>
            )}
            {showFormCreateCategory && (
                <CreateCategoryForm
                    onClose={() => setShowFormCreateCategory(false)}
                />
            )}
            {showFormOrderedCategories && (
                <CategoryOrderManager
                    categories={categories}
                    setCategories={setCategories}
                    onClose={() => setShowFormOrderedCategories(false)}
                />
            )}
            {showFormOrderedItems && (
                <MenuItemOrderManager
                    category={showFormOrderedItems}
                    onClose={() => setShowFormOrderedItems(null)}
                />
            )}
            {editCategoryId !== null && editCategoryName !== null && (
                <UpdateCategoryForm
                    onClose={() => {
                        setEditCategoryId(null);
                        setEditCategoryName("");
                        setShowFormCreateCategory(false);
                    }}
                    initialName={editCategoryName}
                    categoryId={editCategoryId}
                />
            )}
        </div >
    );
};