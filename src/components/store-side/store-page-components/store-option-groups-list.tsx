import { useState } from "react";
import { createPortal } from "react-dom";
import { useManageMenu } from "../../../context/manage-menu/manage-menu-context";
import { ConfirmDeletion } from "../forms/deafult/confirm-deletion";
import { CreateOptionGroupForm, UpdateOptionGroupForm } from "../forms/form-create-update-option-group";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { BsFillTrash3Fill } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import { FaGear } from "react-icons/fa6";

export const OptionGroupsList = ({
    onClose
}: {
    onClose: () => void;
}) => {

    const { optionGroups, deleteOptionGroup } = useManageMenu();

    const [showFormUpdateOptionGroup, setShowFormUpdateOptionGroup] = useState<number>(0)
    const [showFormCreateOptionGroup, setShowFormCreateOptionGroup] = useState(false);
    const [showConfirm, setShowConfirm] = useState<number | null | undefined>(null);

    const handleDeleteOptionGroup = async (optionGroupId: number) => {
        try {
            await deleteOptionGroup(optionGroupId);
            setShowConfirm(null);
        } catch (error) {
            console.error(error);
        }
    };

    return createPortal(
        <div
            className="fixed inset-0 z-[9999] bg-white/10 backdrop-blur-sm overflow-hidden"
            onClick={onClose}
        >
            <div className="h-full w-full overflow-y-auto">
                <div className="min-h-full min-w-full flex justify-center items-center">
                    <div
                        className="w-[90%] max-w-[950px] flex flex-col md:shadow-2xl dark:shadow-none my-4 transition-all duration-300 ease-in-out"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="h-30 bg-primary dark:bg-[#161a21] flex justify-center items-center rounded-t-xl relative overflow-hidden">
                            <div className="flex mx-13">
                                <div className="text-white dark:text-primary mx-2 hidden md:block">
                                    <HiOutlineViewGridAdd className="h-12 w-12" />
                                </div>
                                <h1 className="text-center dark:text-white">Editar Adicionais</h1>
                            </div>
                            <button
                                type="button"
                                className="absolute top-2 right-2 p-2 rounded-full bg-red-600 text-white cursor-pointer transition-all duration-200"
                                onClick={onClose}
                            >
                                <IoCloseOutline className="text-lg" />
                            </button>
                        </div>
                        <div className="w-full min-h-75 relative rounded-xl rounded-t-none py-12 px-4 flex flex-col justify-start md:justify-between items-center gap-4 bg-white dark:bg-[#202326] dark:text-white">
                            {optionGroups.map((opt, index) => (
                                <div
                                    key={index}
                                    className={`w-full max-w-150 mx-8 flex items-center pl-6 pr-2 py-3 bg-primary dark:bg-[#161a21] rounded-full`}
                                >
                                    <span className="flex flex-1 truncate text-white dark:text-white">
                                        {opt.title}
                                    </span>
                                    <button
                                        title="Editar adicional"
                                        type="button"
                                        className={`w-8 h-8 rounded-full bg-white dark:bg-gray-700 text-gray-700 dark:text-white flex items-center justify-center cursor-pointer`}
                                        onClick={() => setShowFormUpdateOptionGroup(opt.id || 0)}
                                    >
                                        <FaGear size={14} />
                                    </button>
                                    <button
                                        title="Exlcluir adicional"
                                        type="button"
                                        className={`w-8 h-8 ml-2 rounded-full bg-white dark:bg-gray-700 text-gray-700 dark:text-white flex items-center justify-center cursor-pointer`}
                                        onClick={() => setShowConfirm(opt.id)}
                                    >
                                        <BsFillTrash3Fill size={14} />
                                    </button>
                                    {showConfirm === opt.id && (
                                        <ConfirmDeletion
                                            question="Tem certeza de que deseja excluir esse adicional?"
                                            description="O opcional será excluído permanentemente. Esta ação não pode ser desfeita."
                                            close={() => setShowConfirm(null)}
                                            onDelete={() => handleDeleteOptionGroup(opt.id || 0)}
                                        />
                                    )}
                                    {showFormUpdateOptionGroup === opt.id &&
                                        <UpdateOptionGroupForm
                                            optionGroupId={opt.id}
                                            optionGroup={opt}
                                            onClose={() => setShowFormUpdateOptionGroup(0)}
                                            childrenForm={true}
                                        />
                                    }
                                </div>
                            ))}
                            <button
                                className="primary-button m-auto"
                                onClick={() => setShowFormCreateOptionGroup(true)}
                            >
                                Criar novo adicional
                            </button>
                            {showFormCreateOptionGroup &&
                                <CreateOptionGroupForm
                                    onClose={() => setShowFormCreateOptionGroup(false)}
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}