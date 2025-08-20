import { Link } from "react-router-dom";
import { OpeningHour } from "../../../types/types-schedules.d";
import { getRestaurantStatus } from "../../../utils/function-restaurant-status";
import { Logo} from "./store-logo";
import { RiListSettingsFill } from "react-icons/ri";
import { GoHomeFill } from "react-icons/go";
import { FaGear } from "react-icons/fa6";

interface HeaderProps {
    backgroundColor?: string;
    restaurantImage?: string;
    restaurantName?: string;
    openingHours?: OpeningHour[];
    openFormUpdateDataStore: () => void;
    openFormUpdateSchedules: () => void;
}

export const Header: React.FC<HeaderProps> = ({
    backgroundColor = 'white',
    restaurantImage,
    restaurantName,
    openingHours = [],
    openFormUpdateDataStore,
    openFormUpdateSchedules,
}) => {

    const { isOpen, message } = getRestaurantStatus(openingHours);

    return (
        <header
            className={`w-screen h-[124px] max-h-[387px] px-[5%] lg:px-[15%] py-2 xl:py-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between border-b-[1px] sticky top-0 z-20 ${backgroundColor === 'white' ? 'text-black bg-white' : 'text-white bg-black'}`}
        >
            <div className="flex items-center gap-3.5">
                <Logo
                    logo={restaurantImage || 'store-logo-default.png'}
                    onImageChange={() => { }}
                />
                <div className="mx-1.5 text-center">
                    <div className="flex items-center gap-1 m-1">
                        <h2 className="text-md font-bold mb-1">{restaurantName}</h2>
                        <button
                            onClick={openFormUpdateDataStore}
                            title="Configurar dados da loja"
                            className="w-6 h-6 sm:w-8 sm:h-8 border-2 rounded-full bg-white bg-opacity-70 text-black flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-200"
                        >
                            <FaGear />
                        </button>
                    </div>
                    {isOpen ? (
                        <div className="flex items-center flex-shrink-0">
                            <p
                                aria-live="polite"
                                className="min-w-28 text-xs sm:text-base font-extralight mb-1 flex flex-col"
                            >
                                <span className="bg-green-600 text-white p-0.5 rounded-md">aberto</span>
                                {message}
                            </p>
                            <button
                                onClick={openFormUpdateSchedules}
                                title="Configurar dados da loja"
                                className="w-6 h-6 sm:w-8 sm:h-8 border-2 rounded-full bg-white bg-opacity-70 text-black m-2 flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-200 flex-shrink-0"
                            >
                                <RiListSettingsFill />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <p
                                aria-live="polite"
                                className="min-w-28 text-xs sm:text-base font-extralight mb-1 flex flex-col"
                            >
                                <span className="bg-red-600 text-white p-0.5 rounded-md">fechado</span>
                                {message}
                            </p>
                            <button
                                onClick={openFormUpdateSchedules}
                                title="Configurar horários da loja"
                                className="w-6 h-6 sm:w-8 sm:h-8 border-2 rounded-full bg-white bg-opacity-70 text-black m-2 flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-200 flex-shrink-0"
                            >
                                <RiListSettingsFill />
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <Link
                to="/"
                className="p-2 mt-3 sm:mt-0 rounded-full bg-primary text-white flex items-center gap-2 z-50 hover:scale-105 transition-all duration-200"
            >
                <GoHomeFill />
                voltar para o painel
            </Link>
        </header>
    );
};