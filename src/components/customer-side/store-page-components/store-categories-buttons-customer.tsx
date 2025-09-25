import { useState, useRef, useEffect } from "react";
import { animate, motion, useMotionValue } from "motion/react";
import { useGetMenu } from "../../../context/get-menu/get-menu-context";
import { IoIosArrowBack } from "react-icons/io";

interface CategoryButtonsProps {
    onCategoryClick: (categoryId: number) => void;
}

export const CategoryButtons = ({ onCategoryClick }: CategoryButtonsProps) => {

    const { restaurantData, menuCategories } = useGetMenu();
    const x = useMotionValue(0);
    const carousel = useRef<HTMLDivElement>(null);
    const [maxScroll, setMaxScroll] = useState(0);
    const [positionCarousel, setPositionCarousel] = useState(0);

    const backgroundColor = restaurantData?.style.backgroundColor
    const buttonColor = restaurantData?.style.primaryColor
    const textButtonColor = restaurantData?.style.textButtonColor

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
    }, [x]);

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
    }, [x]);

    useEffect(() => {
        x.set(0);
    }, [x]);

    return (
        <div
            className={`${backgroundColor === 'black' ? 'bg-black' : 'bg-white'} w-full mx-2 sticky top-0 ms:top-27 sm:top-28 flex justify-center`}
            style={{ zIndex: 4 }}
        >
            <button
                className={`${positionCarousel === 0 ? '' : 'cursor-pointer'} absolute -left-6 top-7 z-30`}
                onClick={scrollLeft}
                disabled={positionCarousel === 0}
            >
                <IoIosArrowBack
                    className={`${backgroundColor === 'black' ? 'text-white' : 'text-black'} text-3xl font-extrabold`}
                    style={{ opacity: positionCarousel === 0 ? 0 : 1 }}
                />
            </button>
            <motion.div className="overflow-x-hidden relative" ref={carousel} whileTap={{ cursor: "grabbing" }}>
                <motion.div
                    className="flex mx-auto gap-4 p-2.5 mt-4 flex-shrink-0"
                    drag="x"
                    dragConstraints={{ right: 0, left: -maxScroll }}
                    style={{ x }}
                >
                    {menuCategories && menuCategories.length > 0 &&
                        menuCategories
                            .sort((a, b) => (b.order ?? 0) - (a.order ?? 0))
                            .map((category) => (
                                <motion.div
                                    key={category.id}
                                    className="text-lg relative min-w-28 h-9 lg:h-10 px-10 rounded-3xl flex items-center justify-center flex-shrink-0 cursor-pointer"
                                    style={{
                                        backgroundColor: buttonColor ?? '',
                                        color: textButtonColor,
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    onClick={() => onCategoryClick(category.id)}
                                >
                                    {category.name}
                                </motion.div>
                            ))}
                </motion.div>
            </motion.div>
            <button
                className={`${Math.abs(positionCarousel) === maxScroll ? '' : 'cursor-pointer'} absolute -right-6 top-7 z-90 rotate-180`}
                onClick={scrollRight}
                disabled={positionCarousel === maxScroll}
            >
                <IoIosArrowBack
                    className={`${backgroundColor === 'black' ? 'text-white' : 'text-black'} text-3xl font-extrabold `}
                    style={{ opacity: Math.abs(positionCarousel) === maxScroll ? 0 : 1 }}
                />
            </button>
        </div >
    );
};