import { IoAddCircle } from "react-icons/io5";
import { useManageMenu } from "../../../context/manage-menu/manage-menu-context";
import { LuArrowDownWideNarrow } from "react-icons/lu";
import { useState } from "react";
import { FaGear } from "react-icons/fa6";
import { CreateOptionGroupForm } from "../forms/form-create-update-option-group";
import { OptionGroupsList } from "./store-option-groups-list";

export const OptionsButtons = () => {

    const { optionGroups } = useManageMenu();

    const [showFormfCreateOptionsGroup, setShowFormCreateOptionsGroup] = useState(false);
    const [showFormfUpdateOptionsGroup, setShowFormUpdateOptionsGroup] = useState(false);

    return (
        <>
            <h1>grupos de opções teste</h1>
            <div className="flex px-4 gap-4 justify-center overflow-hidden">
                <button
                    title="Criar novo adicional"
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-3xl text-black bg-gray-400 cursor-pointer"
                    onClick={() => setShowFormCreateOptionsGroup(true)}
                >
                    <IoAddCircle className="text-2xl hidden sm:block" /> Criar novo adicional
                </button>
                {optionGroups.length > 0 &&
                    <button
                        title="Editar adicionais"
                        className="flex items-center justify-center gap-2 px-4 py-2 rounded-3xl text-black bg-gray-400 cursor-pointer"
                        onClick={() => setShowFormUpdateOptionsGroup(true)}
                    >
                        <FaGear className="hidden sm:block" /> Editar adicionais
                    </button>
                }

            </div>
            {showFormfCreateOptionsGroup &&
                <CreateOptionGroupForm
                    onClose={() => setShowFormCreateOptionsGroup(false)}
                />
            }
            {showFormfUpdateOptionsGroup &&
                <OptionGroupsList />

            }
        </>
    )
}