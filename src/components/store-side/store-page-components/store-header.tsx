import { useState } from "react";
import { Link } from "react-router-dom";
import { useRestaurantData } from "../../../context/restaurant-data/restaurant-data-context";
import { useManageMenu } from "../../../context/manage-menu/manage-menu-context";
import { UpdateStoreDataForm } from "../forms/form-update-data-store";
import { UpdateSchedulesForm } from "../forms/form-update-schedules";
import { Logo } from "./store-logo";
import { GoHomeFill } from "react-icons/go";
import { FaGear } from "react-icons/fa6";
import { TbClockHour2Filled } from "react-icons/tb";

export const Header = () => {

    const { restaurantData } = useRestaurantData();
    const { tempBackgroundColor } = useManageMenu();

    const [openFormUpdateDataStore, setOpenFormUpdateDataStore] = useState(false);
    const [openFormUpdateSchedules, setOpenFormUpdateSchedules] = useState(false);
console.log(restaurantData?.user.restaurantName.length)
    return (
        <>
            <header
                className={`w-screen max-h-[387px] px-[5%] lg:px-[15%] py-4 xl:py-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between shadow-md ms:sticky top-0 ${tempBackgroundColor === 'white' ? 'text-black bg-white' : 'text-white bg-black border-b-[1px] border-zinc-800'}`}
                style={{ zIndex: 5 }}
            >
                <div className="flex flex-col ms:flex-row items-center gap-3.5">
                    <Logo />
                    <div className="mx-1.5 text-center sm:text-start">
                        <h5 className="text-md font-bold mb-1 line-clamp-2">
                            {restaurantData?.user.restaurantName}
                        </h5>
                        <div className="flex flex-col items-center sm:items-start justify-center gap-1 ms:justify-start flex-shrink-0">
                            <button
                                style={{ fontSize: '14px' }}
                                onClick={() => setOpenFormUpdateDataStore(true)}
                                title="Configurar dados da loja"
                                className="rounded-full bg-gray-400 text-black border-1 flex items-center justify-center px-3 gap-2 cursor-pointer hover:scale-105 transition-all duration-200"
                            >
                                <FaGear />
                                <span>Configurar Loja</span>
                            </button>
                            <button
                                style={{ fontSize: '14px' }}
                                onClick={() => setOpenFormUpdateSchedules(true)}
                                title="Configurar dados da loja"
                                className="rounded-full bg-gray-400 text-black border-1 flex items-center justify-center px-3 gap-2 cursor-pointer hover:scale-105 transition-all duration-200"
                            >
                                <TbClockHour2Filled />
                                <span>Editar Horários</span>
                            </button>
                        </div>
                    </div>
                </div>
                <Link
                    to="/"
                    className="p-2 mt-3 sm:mt-0 rounded-full bg-primary text-black flex items-center gap-2 z-50 hover:scale-105 transition-all duration-200"
                >
                    <GoHomeFill />
                    voltar
                </Link>
            </header>
            {openFormUpdateDataStore && (
                <UpdateStoreDataForm onClose={() => setOpenFormUpdateDataStore(false)} />
            )}
            {openFormUpdateSchedules && (
                <UpdateSchedulesForm onClose={() => setOpenFormUpdateSchedules(false)} />
            )}
        </>
    );
};