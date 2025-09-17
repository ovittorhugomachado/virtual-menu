import { useState } from "react";
import { useCart } from "../../../context/cart/cart-context";
import { OpeningHour } from "../../../types/types-schedules.d";
import { getRestaurantStatus } from "../../../utils/function-restaurant-status";
import { toMoney } from "../../../utils/function-transform-to-money";
import { OrderForm } from "../forms/form-order";
import { CiShoppingCart } from "react-icons/ci";

interface HeaderProps {
    backgroundColor: string;
    restaurantImage?: string;
    restaurantName?: string;
    openingHours?: OpeningHour[];
};

export const StoreHeader: React.FC<HeaderProps> = ({
    backgroundColor = '',
    restaurantImage,
    restaurantName,
    openingHours = [],
}) => {

    const { cart } = useCart();

    const { isOpen, message } = getRestaurantStatus(openingHours);
    const [showOrderForm, setShowOrderForm] = useState(false);

    const handleCartClick = () => {
        setShowOrderForm(true);
    };
    return (
        <header
            className={`w-screen max-h-[387px] px-[5%] lg:px-[15%] py-4 xl:py-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between shadow-md ms:sticky top-0 `}
            style={{ zIndex: 5 }}
        >
            <div className="w-full flex items-center justify-center xs:justify-start gap-3.5">
                <img
                    src={restaurantImage ?? '/store-logo-default.png'}
                    className="w-24 h-24 rounded-full"
                />
                <div className="mx-1.5 text-center">
                    <div className="flex items-center gap-1 m-1">
                        <h5 className="text-md xl:text-base font-bold mb-1">{restaurantName}</h5>
                    </div>
                    {isOpen ? (
                        <div className="flex items-center flex-shrink-0">
                            <p aria-live="polite" className="min-w-28 mb-1 flex flex-col text-xs sm:text-base font-extralight">
                                <span className="bg-green-600 p-0.5 rounded-md text-white">aberto</span>
                                {message}
                            </p>
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <p aria-live="polite" className="min-w-28 mb-1 flex flex-col text-xs sm:text-base font-extralight">
                                <span className="bg-red-600 p-0.5 rounded-md text-white">fechado</span>
                                {message}
                            </p>
                        </div>
                    )}
                </div>
            </div>
            {cart.total !== undefined && cart.total > 0 && (
                <button aria-label="Carrinho de compras" className="flex xs:flex-col items-center text-center cursor-pointer transition-all duration-200 hover:scale-105" onClick={handleCartClick}>
                    <CiShoppingCart className="text-2xl sm:text-3xl" />
                    <h3 className="text-xs sm:text-base">{toMoney(Number(cart.total), 'BRL')}</h3>
                </button>
            )}
            {showOrderForm && (
                <OrderForm
                    onClose={() => setShowOrderForm(false)}
                    initialValues={{}}
                    backgroundColor={backgroundColor}
                />
            )}
        </header>
    );
};