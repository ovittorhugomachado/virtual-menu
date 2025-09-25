import { HiOutlineViewGridAdd } from "react-icons/hi";
import { useManageMenu } from "../../../context/manage-menu/manage-menu-context";
import { IoCloseOutline } from "react-icons/io5";
import { FaGear } from "react-icons/fa6";
import { BsFillTrash3Fill } from "react-icons/bs";
import { useState } from "react";
import { UpdateOptionGroupForm } from "../forms/form-create-update-option-group";

export const OptionGroupsList = ({
    onClose
}: {
    onClose: () => void;
}) => {

    const { optionGroups } = useManageMenu();

    const [showFormUpdateOptionGroup, setShowFormUpdateOptionGroup] = useState<number>(0)
    console.log(optionGroups);
    return (
        <>
            return createPortal(
            <div
                className="fixed inset-0 z-[9999] bg-white/10 backdrop-blur-sm overflow-hidden"
                onClick={onClose}
            >
                <div className="h-full w-full overflow-y-auto">
                    <div className="min-h-full min-w-full flex justify-center items-center">
                        <div
                            className="w-[90%] max-w-[950px] flex flex-col my-4 transition-all duration-300 ease-in-out"
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
                                        className={`w-full max-w-150 mx-8 flex items-center px-6 py-3 bg-primary dark:bg-[#161a21] rounded-full`}
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
                                            //onClick={() => setShowFormUpdateOptionGroup(opt.id)}
                                        >
                                            <BsFillTrash3Fill size={14} />
                                        </button>
                                        {showFormUpdateOptionGroup === opt.id &&
                                            <UpdateOptionGroupForm
                                                optionGroupId={opt.id}
                                                optionGroup={opt}
                                                onClose={() => setShowFormUpdateOptionGroup(0)}
                                            />
                                        }
                                        {/* 
                                            <div className="flex gap-2">
                                            <button
                                                title="Mover para baixo"
                                                type="button"
                                                className={`w-8 h-8 rounded-full bg-white dark:bg-gray-700 text-gray-700 dark:text-white flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200 ${index === localCategories.length - 1 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'
                                                    }`}
                                                onClick={() => moveCategoryDown(index)}
                                                disabled={index === localCategories.length - 1 || isReordering}
                                            >
                                                <FaArrowDown size={14} />
                                            </button>
                                        </div> */}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>,
            document.body
            );
        </>
    )
}