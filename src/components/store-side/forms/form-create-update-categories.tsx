import { useEffect, useState } from "react";
import { useManageMenu } from "../../../context/manage-menu/manage-menu-context";
import { CategoryData, MenuItem } from "../../../types/types-menu.d";
import { UpdateDataForm } from "./deafult/form-update-data";
import { ConfirmDeletion } from "./deafult/confirm-deletion";
import { BsFillTrash3Fill } from "react-icons/bs";
import { IoIosAddCircle, IoIosArrowDown } from "react-icons/io";
import { useForm } from "react-hook-form";
import { FaGear } from "react-icons/fa6";

export const CreateCategoryForm = ({ onClose, error }: { onClose: () => void; error?: string }) => {

    const { createCategory, menuItems } = useManageMenu();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setValue,
        watch
    } = useForm<CategoryData>();

    const [openArrayItems, setOpenArrayItems] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const selectedItems = watch("menuItems", []);


    const handleFormSubmit = async (data: CategoryData) => {
        try {
            await createCategory(data.name.trim(), data.menuItems || []);
            reset();
            setSuccessMessage("Categoria criada com sucesso!");
        } catch (error) {
            console.error("Erro ao criar categoria:", error);
        }
    };

    const handleCheckboxChange = (itemId: number, isChecked: boolean) => {
        const currentItems = selectedItems || [];
        if (isChecked) {
            setValue("menuItems", [...currentItems, itemId]);
        } else {
            setValue("menuItems", currentItems.filter(id => id !== itemId));
        }
    };

    return (
        <UpdateDataForm
            onClose={onClose}
            formIcon={<IoIosAddCircle />}
            title="Criar categoria"
            successMessage={successMessage}
            textButtonSubmit="Criar categoria"
            submitFunction={handleSubmit(handleFormSubmit)}
            isLoadingSubmit={isSubmitting}
        >
            <div className="flex flex-col items-start justify-center relative">
                <label htmlFor="category-name" className="text-md ml-2">
                    Nome
                    {errors.name && (
                        <span className="span-error">
                            {errors.name.message?.toString()}
                        </span>
                    )}
                </label>
                <input
                    type="text"
                    id="name"
                    placeholder="Nome da categoria"
                    className={`input ${errors.name ? " input-error" : ""}`}
                    {...register("name", {
                        required: "Obrigatório",
                        minLength: {
                            value: 2,
                            message: "Mínimo 2 caracteres",
                        },
                    })}
                />
            </div>
            <input type="hidden" {...register("menuItems")} />
            {menuItems.length > 0 &&
                <div className="w-full flex flex-col items-center mt-4">
                    <button
                        type="button"
                        className="flex items-center px-8 gap-2 bg-zinc-300 dark:bg-[#161a21] rounded-2xl cursor-pointer mb-2 hover:scale-103 transition-all duration-300"
                        onClick={() => setOpenArrayItems(!openArrayItems)}
                        style={{ fontSize: '18px' }}
                    >
                        <IoIosArrowDown className={`${openArrayItems ? 'rotate-180' : ''} transition-all duration-300`} />
                        Itens ({(selectedItems ?? []).length}/{menuItems.length})
                    </button>

                    <div className={`${openArrayItems ? 'opacity-100 mt-3 pointer-events-auto' : 'opacity-0 max-h-0 pointer-events-none'} transition-all duration-300 ease-in-out`}>
                        <p className="text-center text-zinc-600 dark:text-zinc-400 font-extralight text-sm mb-2">
                            Você pode usar os items abaixo na nova categoria
                        </p>
                        <ul className="flex flex-col gap-2">
                            {menuItems.map((item: MenuItem) => (
                                <li key={item.id} className="">
                                    <label htmlFor={`item-${item.id}`} className="w-full flex items-center px-6 py-3 bg-zinc-200 dark:bg-[#161a21] rounded-full hover:scale-103 transition-all duration-200 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            id={`item-${item.id}`}
                                            checked={selectedItems?.includes(Number(item.id))}
                                            onChange={(e) => handleCheckboxChange(Number(item.id), e.target.checked)}
                                            className="flex items-center justify-center peer appearance-none w-5 h-5 rounded-full border border-black dark:border-white checked:bg-primary checked:border-blue-600 mr-2 relative cursor-pointer before:content-['✔'] before:absolute before:text-[#161a21] before:text-[12px] before:opacity-0 checked:before:opacity-100"
                                        />
                                        <p className="flex items-center justify-center gap-3">{item.name}<span className="text-sm font-extralight text-zinc-600 dark:text-zinc-400">R${item.price}</span></p>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            }
            {error && (
                <p className="text-error">{error}</p>
            )}
        </UpdateDataForm>
    );
};

export const UpdateCategoryForm = ({
    onClose,
    initialName = "",
    categoryId,
    initialMenuItems = [],
    error
}: {
    onClose: () => void;
    initialName?: string;
    categoryId: number;
    initialMenuItems?: number[];
    error?: string;
}) => {

    const { setCategories, categories, updateCategory, deleteCategory, menuItems } = useManageMenu();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
        watch
    } = useForm<CategoryData>({
        defaultValues: {
            name: initialName,
            menuItems: initialMenuItems
        }
    });
    const [openArrayItems, setOpenArrayItems] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    const selectedItems = watch("menuItems", []);
    const category = categories.find(c => c.id === categoryId);

    useEffect(() => {
        const selectedIds = menuItems
            .filter(item =>
                item.categories?.some(category => category.id === categoryId)
            )
            .map(item => item.id)
            .filter((id): id is number => typeof id === "number");

        setValue("menuItems", selectedIds);
    }, [categoryId, menuItems, setValue]);

    useEffect(() => {
        if (isDeleted || !category) {
            onClose();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDeleted, category]);

    const handleFormSubmit = async (data: CategoryData) => {
        if (isDeleted) {
            onClose();
            return;
        }

        try {
            await updateCategory(categoryId, data.name.trim(), data.menuItems || []);
            setSuccessMessage("Categoria atualizada com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar categoria:", error);
        }
    };

    const handleCheckboxChange = (itemId: number, isChecked: boolean) => {
        const currentItems = selectedItems || [];
        if (isChecked) {
            setValue("menuItems", [...currentItems, itemId]);
        } else {
            setValue("menuItems", currentItems.filter(id => id !== itemId));
        }
    };

    const handleDeleteCategory = async () => {
        try {
            setIsDeleted(true); 
            await deleteCategory(categoryId);
            setCategories(prev => prev.filter(cat => cat.id !== categoryId));
            setShowConfirm(false);
            onClose(); 
        } catch (error) {
            console.error(error);
            setIsDeleted(false); 
        }
    };

    useEffect(() => {
        const selectedIds = menuItems
            .filter(item =>
                item.categories?.some(category => category.id === categoryId)
            )
            .map(item => item.id)
            .filter((id): id is number => typeof id === "number");

        setValue("menuItems", selectedIds);
    }, [categoryId, menuItems, setValue]);

    useEffect(() => {
        if (isDeleted || !category) {
            onClose();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDeleted, category]);

    if (isDeleted || !category) {
        return null;
    }
    return (
        <UpdateDataForm
            onClose={onClose}
            formIcon={<FaGear />}
            title="Editar categoria"
            successMessage={successMessage}
            textButtonSubmit="Atualizar categoria"
            submitFunction={handleSubmit(handleFormSubmit)}
            isLoadingSubmit={isSubmitting}
        >
            <div className="flex flex-col items-start justify-center relative">
                <label htmlFor="category-name" className="text-md ml-2">
                    Nome
                    {errors.name && (
                        <span className="span-error">
                            {errors.name.message?.toString()}
                        </span>
                    )}
                </label>
                <input
                    type="text"
                    id="name"
                    placeholder="Nome da categoria"
                    className={`input ${errors.name ? " input-error" : ""}`}
                    {...register("name", {
                        required: "Obrigatório",
                        minLength: {
                            value: 2,
                            message: "Mínimo 2 caracteres",
                        },
                    })}
                />
            </div>
            <input type="hidden" {...register("menuItems")} />
            {menuItems.length > 0 &&
                <div className="w-full flex flex-col items-center mt-4">
                    <button
                        type="button"
                        className="flex items-center px-8 gap-2 bg-zinc-300 dark:bg-[#161a21] rounded-2xl cursor-pointer mb-2 hover:scale-103 transition-all duration-300"
                        onClick={() => setOpenArrayItems(!openArrayItems)}
                        style={{ fontSize: '18px' }}
                    >
                        <IoIosArrowDown className={`${openArrayItems ? 'rotate-180' : ''} transition-all duration-300`} />
                        Itens ({(selectedItems ?? []).length}/{menuItems.length})
                    </button>
                    <div className={`${openArrayItems ? 'opacity-100 mt-3 pointer-events-auto' : 'opacity-0 max-h-0 pointer-events-none'} transition-all duration-300 ease-in-out`}>
                        <p className="text-zinc-600 dark:text-zinc-400 font-extralight text-sm mb-2">
                            Você pode usar os items abaixo na nova categoria
                        </p>
                        <ul className="flex flex-col gap-2">
                            {menuItems.map((item: MenuItem) => (
                                <li key={item.id} className="">
                                    <label htmlFor={`item-${item.id}`} className="w-full flex items-center px-6 py-3 bg-zinc-200 dark:bg-[#161a21] rounded-full hover:scale-103 transition-all duration-200 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            id={`item-${item.id}`}
                                            checked={selectedItems?.includes(Number(item.id))}
                                            onChange={(e) => handleCheckboxChange(Number(item.id), e.target.checked)}
                                            className="flex items-center justify-center peer appearance-none w-5 h-5 rounded-full border border-black dark:border-white checked:bg-primary checked:border-blue-600 mr-2 relative cursor-pointer before:content-['✔'] before:absolute before:text-[#161a21] before:text-[12px] before:opacity-0 checked:before:opacity-100"
                                        />
                                        <p className="flex items-center justify-center gap-3">{item.name}<span className="text-sm font-extralight text-zinc-600 dark:text-zinc-400">R${item.price}</span></p>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            }
            <button
                type="button"
                className="w-50 mt-4 mx-auto text-red-500 px-3 py-2 flex justify-center items-center rounded-full cursor-pointer hover:scale-105 transition-all duration-300 Z-30"
                onClick={(e) => {
                    e.stopPropagation();
                    setShowConfirm(true);
                }}
            >
                <BsFillTrash3Fill className="mr-2" />
                Excluir categoria
            </button>
            {showConfirm && (
                <ConfirmDeletion
                    question="Tem certeza de que deseja excluir esta categoria?"
                    description="A categoria será excluída permanentemente. Esta ação não pode ser desfeita."
                    close={() => setShowConfirm(false)}
                    onDelete={handleDeleteCategory}
                />
            )}
            {error && (
                <p className="text-error">{error}
                </p>
            )}
        </UpdateDataForm>
    );
};