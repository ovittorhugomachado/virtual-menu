import { useState } from "react";
import { useManageMenu } from "../../../context/manage-menu/manage-menu-context";
import { CreateOptionGroupForm } from "../forms/form-create-update-option-group";
import { OptionGroupsList } from "./store-option-groups-list";
import { FaGear } from "react-icons/fa6";
import { IoAddCircle } from "react-icons/io5";

export const OptionsButtons = () => {

    const { optionGroups } = useManageMenu();

    const [showFormfCreateOptionsGroup, setShowFormCreateOptionsGroup] = useState(false);
    const [showFormfUpdateOptionsGroup, setShowFormUpdateOptionsGroup] = useState(false);

    return (
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
            {showFormfCreateOptionsGroup &&
                <CreateOptionGroupForm
                    onClose={() => setShowFormCreateOptionsGroup(false)}
                />
            }
            {showFormfUpdateOptionsGroup &&
                <OptionGroupsList
                    onClose={() => setShowFormUpdateOptionsGroup(false)}
                />
            }
        </div>
    )
}