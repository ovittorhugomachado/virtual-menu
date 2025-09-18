import { useState } from "react";
import { useCart } from "../../../context/cart/cart-context";
import { getRestaurantStatus } from "../../../utils/function-restaurant-status";
import { toMoney } from "../../../utils/function-transform-to-money";
import { OrderForm } from "../forms/form-order";
import { CiShoppingCart } from "react-icons/ci";
import { useGetMenu } from "../../../context/get-menu/get-menu-context";

export const StoreHeader = () => {
    const { cart } = useCart();
    const { restaurantData } = useGetMenu();
    const { isOpen, message } = getRestaurantStatus(restaurantData?.openingHours || []);
    const [showOrderForm, setShowOrderForm] = useState(false);

    const backgroundColor = restaurantData?.style.backgroundColor;

    const handleCartClick = () => {
        setShowOrderForm(true);
    };

    return (
        <header className={`${backgroundColor === 'white' ? 'text-black bg-white' : 'text-white bg-black border-b-[1px] border-zinc-800'} w-screen max-h-[387px] px-[5%] lg:px-[15%] py-4 xl:py-4 sm:px-6 shadow-md flex flex-col ms:flex-row items-center justify-between ms:sticky top-0`} style={{ zIndex: 5 }}>
            <div className="w-full flex items-center justify-center ms:justify-start gap-3.5">
                <img
                    src={restaurantData?.logoUrl || '/store-logo-default.png'}
                    onError={(e) => {
                        e.currentTarget.src = '/store-logo-default.png';
                    }}
                    className="w-24 h-24 rounded-full bg-white"
                    alt="Logo da loja"
                />
                <div className="mx-1.5 text-center">
                    <div className="flex justify-center gap-1 m-1">
                        <h5 className="text-md xl:text-base font-bold mb-1">{restaurantData?.user.restaurantName || "Nome não disponível"}</h5>
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
            <button
                aria-label={`Carrinho de compras - Total: ${toMoney(Number(cart.total), 'BRL')}`}
                className="flex ms:flex-col mt-4 ms:mt-0 items-center text-center cursor-pointer transition-all duration-200 hover:scale-105"
                onClick={handleCartClick}
            >
                <CiShoppingCart className="text-3xl" />
                <h6>{toMoney(Number(cart.total), 'BRL')}</h6>
            </button>
            {showOrderForm && (
                <OrderForm onClose={() => setShowOrderForm(false)} initialValues={{}} />
            )}
        </header>
    );
};