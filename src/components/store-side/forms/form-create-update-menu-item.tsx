import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useManageMenu } from "../../../context/manage-menu/manage-menu-context";
import { InputPrice } from "../inputs/input-store-menu-item-price";
import { CategoryData, MenuItem, OptionGroup } from "../../../types/types-menu.d";
import { ConfirmDeletion } from "./deafult/confirm-deletion";
import { UpdateDataForm } from "./deafult/form-update-data";
import { IoIosAddCircle, IoIosArrowDown } from "react-icons/io";
import { BsFillTrash3Fill } from "react-icons/bs";
import { FaGear } from "react-icons/fa6";

export const CreateMenuItemForm = ({
    onClose,
    error,
    categoryId
}: {
    onClose: () => void;
    error?: string;
    categoryId?: number;
}) => {

    const {
        createMenuItem,
        categories,
        optionGroups
    } = useManageMenu();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        clearErrors,
        reset,
        setValue,
        watch
    } = useForm<MenuItem>();

    const [openArrayCategories, setOpenArrayCategories] = useState(true);
    const [openArrayOptions, setOpenArrayOptions] = useState(true);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        if (categoryId !== undefined && categories.length > 0) {
            const categoryObj = categories.find(cat => cat.id === categoryId);
            if (categoryObj) {
                setValue("categories", [categoryObj]);
            }
        }
    }, [categoryId, categories, setValue]);

    const selectedCategories = watch("categories") as CategoryData[] || [];
    const selectedoptions = watch("optionGroups") as OptionGroup[] || [];

    const handleFormSubmit = async (data: MenuItem) => {
        try {
            const categoryIds = Array.isArray(data.categories)
                ? data.categories.map(cat => cat.id)
                : [];

            const optionGroupIds = Array.isArray(data.optionGroups)
                ? data.optionGroups
                    .map(gr => gr.id)
                    .filter((id): id is number => typeof id === "number")
                : [];

            await createMenuItem({
                name: data.name,
                description: data.description,
                price: Number(data.price.toString().replace(',', '.')),
                categoryId: categoryIds,
                optionGroupId: optionGroupIds
            });

            reset();
            setSuccessMessage("Item criado com sucesso!");
        } catch (error) {
            console.error("Erro ao criar item:", error);
        }
    };

    const handleCheckboxCategoryChange = (categoryId: number, isChecked: boolean) => {
        const currentCategories = selectedCategories ?? [];

        if (isChecked) {
            const categoryObj = categories.find(cat => cat.id === categoryId);
            if (categoryObj) {
                setValue("categories", [...currentCategories, categoryObj]);
            }
        } else {
            setValue("categories", currentCategories.filter(cat => cat.id !== categoryId));
        }
    };

    const handleCheckboxOptionsChange = (optionId: number, isChecked: boolean) => {
        const currentOptions = selectedoptions ?? [];

        if (isChecked) {
            const optionsObj = optionGroups.find(gr => gr.id === optionId);
            if (optionsObj) {
                setValue("optionGroups", [...currentOptions, optionsObj]);
            }
        } else {
            setValue("optionGroups", currentOptions.filter(gr => gr.id !== optionId));
        }
    };

    const getSelectedCategories = (): CategoryData[] => {
        const value = watch("categories");
        return Array.isArray(value) ? value : [];
    };

    const getSelectedoptions = (): OptionGroup[] => {
        const value = watch("optionGroups");
        return Array.isArray(value) ? value : [];
    };

    return (
        <UpdateDataForm
            onClose={onClose}
            formIcon={<IoIosAddCircle />}
            title="Criar item"
            successMessage={successMessage}
            textButtonSubmit="Criar categoria"
            submitFunction={handleSubmit(handleFormSubmit)}
            isLoadingSubmit={isSubmitting}
        >
            <div className="flex flex-col items-start justify-center relative">
                <label htmlFor="name" className="text-md ml-2">
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
            <label htmlFor="description" className="ml-2 mt-2 flex justify-between relative">
                Descrição
            </label>
            <textarea
                {...register("description")}
                className={`input h-32 mb-2.5 border rounded px-3 py-2${errors.description ? " border-red-500" : ""}`}
                placeholder="Descrição"
            />
            <InputPrice
                register={register}
                errors={errors}
                clearErrors={clearErrors}
                initialValues={{}}
            />
            <input type="hidden" {...register("categories")} />
            {categories.length > 0 &&
                <div className="w-full bg-zinc-300 dark:bg-[#161a21] border rounded-2xl border-zinc-400 flex flex-col items-center mt-4">
                    <button
                        type="button"
                        className="flex items-center px-8 gap-2 my-2 bg-zinc-300 dark:bg-[#161a21] rounded-2xl cursor-pointer mb-2 hover:scale-103 transition-all duration-300"
                        onClick={() => setOpenArrayCategories(!openArrayCategories)}
                    >
                        <IoIosArrowDown className={`${openArrayCategories ? 'rotate-180' : ''} transition-all duration-300`} />
                        Categorias ({(selectedCategories ?? []).length}/{categories.length})
                    </button>
                    <div className={`${openArrayCategories ? 'opacity-100 mt-3 pointer-events-auto' : 'opacity-0 max-h-0 pointer-events-none'} transition-all duration-300 ease-in-out`}>
                        <ul className="flex flex-col gap-2">
                            {categories.map((category: CategoryData) => (
                                <li key={category.id}>
                                    <label className="w-full flex items-start px-6 py-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={getSelectedCategories().some(cat => cat.id === category.id)}
                                            onChange={(e) =>
                                                handleCheckboxCategoryChange(Number(category.id), e.target.checked)
                                            }
                                            className="flex items-center justify-center peer appearance-none w-5 h-5 min-w-[20px] min-h-[20px] rounded-full border border-black dark:border-white checked:bg-primary  checked:border-none mr-2 relative cursor-pointer before:content-['✔'] before:absolute before:text-[#161a21] before:text-[12px] before:opacity-0 checked:before:opacity-100"
                                        />
                                        <p className="flex items-center justify-center gap-3">
                                            {category.name}
                                        </p>
                                    </label>
                                </li>
                            ))}
                        </ul>

                    </div>
                </div>
            }
            <input type="hidden" {...register("optionGroups")} />
            {optionGroups.length > 0 &&
                <div className="w-full bg-zinc-300 dark:bg-[#161a21] border rounded-2xl border-zinc-400 flex flex-col items-center mt-4">
                    <button
                        type="button"
                        className="w-full flex items-center justify-center px-8 gap-2 my-2 cursor-pointer hover:scale-103 transition-all duration-300"
                        onClick={() => setOpenArrayOptions(!openArrayOptions)}
                    >
                        <IoIosArrowDown className={`${openArrayOptions ? 'rotate-180' : ''} transition-all duration-300`} />
                        Opcionais ({(selectedoptions ?? []).length}/{optionGroups.length})
                    </button>
                    <div className={`${openArrayOptions ? 'opacity-100 mt-3 pointer-events-auto' : 'opacity-0 max-h-0 pointer-events-none'} transition-all duration-300 ease-in-out`}>
                        <ul className="flex flex-col gap-2">
                            {optionGroups.map((group: OptionGroup) => (
                                <li key={group.id}>
                                    <label className="w-full flex items-start px-6 py-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={getSelectedoptions().some(gr => gr.id === group.id)}
                                            onChange={(e) => handleCheckboxOptionsChange(Number(group.id), e.target.checked)}
                                            className="flex items-center justify-center peer appearance-none w-5 h-5 min-w-[20px] min-h-[20px] rounded-full border border-black dark:border-white checked:bg-primary  checked:border-none mr-2 relative cursor-pointer before:content-['✔'] before:absolute before:text-[#161a21] before:text-[12px] before:opacity-0 checked:before:opacity-100"
                                        />
                                        <p className="flex items-center justify-center gap-3">{group.title}</p>
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

export const UpdateMenuItemForm = ({
    onClose,
    itemId,
    error
}: {
    onClose: () => void;
    itemId: number;
    error?: string;
}) => {

    const {
        menuItems,
        setMenuItems,
        updateMenuItem,
        deleteMenuItem,
        categories,
        optionGroups
    } = useManageMenu();

    const item = menuItems.find(i => i.id === itemId);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        clearErrors,
        setValue,
        reset,
        watch
    } = useForm<MenuItem>();

    const [openArrayCategories, setOpenArrayCategories] = useState(true);
    const [openArrayOptions, setOpenArrayOptions] = useState(true);
    const [showConfirm, setShowConfirm] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [isDeleted, setIsDeleted] = useState(false);

    const selectedCategories = watch("categories") as CategoryData[] || [];
    const selectedoptions = watch("optionGroups") as OptionGroup[] || [];

    useEffect(() => {
        if (item) {
            reset({
                name: item.name,
                description: item.description,
                price: item.price,
                categories: item.categories ?? [],
                optionGroups: item.optionGroups ?? []
            });
        }
    }, [item, reset]);

    useEffect(() => {
        if (isDeleted || !item) {
            onClose();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDeleted, item]);

    if (isDeleted || !item) {
        return null;
    }

    const handleFormSubmit = async (data: MenuItem) => {
        try {
            const categoryIds = Array.isArray(data.categories)
                ? data.categories.map(cat => cat.id)
                : [];

            const optionGroupIds = Array.isArray(data.optionGroups)
                ? data.optionGroups
                    .map(gr => gr.id)
                    .filter((id): id is number => typeof id === "number")
                : [];

            await updateMenuItem(
                itemId,
                {
                    name: data.name,
                    description: data.description,
                    price: Number(data.price.toString().replace(',', '.')),
                    categoryId: categoryIds,
                    optionGroupId: optionGroupIds
                }
            );

            reset();
            setSuccessMessage("Item atualizado com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar item:", error);
        }
    };

    const handleCheckboxCategoryChange = (categoryId: number, isChecked: boolean) => {
        const currentCategories = selectedCategories ?? [];
        const categoryObj = categories.find(cat => cat.id === categoryId);
        if (isChecked && categoryObj) {
            setValue("categories", [...currentCategories, categoryObj]);
        } else {
            setValue("categories", currentCategories.filter(cat => cat.id !== categoryId));
        }
    };

    const handleCheckboxOptionsChange = (optionId: number, isChecked: boolean) => {
        const currentOptions = selectedoptions ?? [];
        const optionsObj = optionGroups.find(gr => gr.id === optionId);
        if (isChecked && optionsObj) {
            setValue("optionGroups", [...currentOptions, optionsObj]);
        } else {
            setValue("optionGroups", currentOptions.filter(gr => gr.id !== optionId));
        }
    };

    const getSelectedCategories = (): CategoryData[] => {
        const value = watch("categories");
        return Array.isArray(value) ? value : [];
    };

    const getSelectedoptions = (): OptionGroup[] => {
        const value = watch("optionGroups");
        return Array.isArray(value) ? value : [];
    };

    const handleDeleteMenuItem = async () => {
        try {
            setIsDeleted(true);
            await deleteMenuItem(itemId);
            setMenuItems(prevItems => prevItems.filter(i => i.id !== itemId));
            setShowConfirm(false);
            setSuccessMessage("Item excluído com sucesso!");
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <UpdateDataForm
            onClose={onClose}
            formIcon={<FaGear />}
            title="Editar item"
            successMessage={successMessage}
            textButtonSubmit="Atualizar item"
            submitFunction={handleSubmit(handleFormSubmit)}
            isLoadingSubmit={isSubmitting}
        >
            <div className="flex flex-col items-start justify-center relative">
                <label htmlFor="item-name" className="text-md ml-2">
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
                    placeholder="Nome do item"
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
            <label htmlFor="description" className="ml-2 mt-2 flex justify-between relative">
                Descrição
            </label>
            <textarea
                {...register("description")}
                className={`input h-32 mb-2.5 border rounded px-3 py-2${errors.description ? " border-red-500" : ""}`}
                placeholder="Descrição"
            />
            <InputPrice
                register={register}
                errors={errors}
                clearErrors={clearErrors}
                initialValues={{}}
            />
            <input type="hidden" {...register("categories")} />
            {categories.length > 0 &&
                <div className="w-full bg-zinc-300 dark:bg-[#161a21] border rounded-2xl border-zinc-400 flex flex-col items-center mt-4">
                    <button
                        type="button"
                        className="flex items-center px-8 gap-2 my-2 bg-zinc-300 dark:bg-[#161a21] rounded-2xl cursor-pointer mb-2 hover:scale-103 transition-all duration-300"
                        onClick={() => setOpenArrayCategories(!openArrayCategories)}
                    >
                        <IoIosArrowDown className={`${openArrayCategories ? 'rotate-180' : ''} transition-all duration-300`} />
                        Categorias ({(selectedCategories ?? []).length}/{categories.length})
                    </button>
                    <div className={`${openArrayCategories ? 'opacity-100 mt-3 pointer-events-auto' : 'opacity-0 max-h-0 pointer-events-none'} transition-all duration-300 ease-in-out`}>
                        <ul className="flex flex-col gap-2">
                            {categories.map((category: CategoryData) => (
                                <li key={category.id}>
                                    <label className="w-full flex items-start px-6 py-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={getSelectedCategories().some(cat => cat.id === category.id)}
                                            onChange={(e) =>
                                                handleCheckboxCategoryChange(Number(category.id), e.target.checked)
                                            }
                                            className="flex items-center justify-center peer appearance-none w-5 h-5 min-w-[20px] min-h-[20px] rounded-full border border-black dark:border-white checked:bg-primary  checked:border-none mr-2 relative cursor-pointer before:content-['✔'] before:absolute before:text-[#161a21] before:text-[12px] before:opacity-0 checked:before:opacity-100"
                                        />
                                        <p className="flex items-center justify-center gap-3">
                                            {category.name}
                                        </p>
                                    </label>
                                </li>
                            ))}
                        </ul>

                    </div>
                </div>
            }
            <input type="hidden" {...register("optionGroups")} />
            {optionGroups.length > 0 &&
                <div className="w-full bg-zinc-300 dark:bg-[#161a21] border rounded-2xl border-zinc-400 flex flex-col items-center mt-4">
                    <button
                        type="button"
                        className="w-full flex items-center justify-center px-8 gap-2 my-2 cursor-pointer hover:scale-103 transition-all duration-300"
                        onClick={() => setOpenArrayOptions(!openArrayOptions)}
                    >
                        <IoIosArrowDown className={`${openArrayOptions ? 'rotate-180' : ''} transition-all duration-300`} />
                        Opcionais ({(selectedoptions ?? []).length}/{optionGroups.length})
                    </button>
                    <div className={`${openArrayOptions ? 'opacity-100 mt-3 pointer-events-auto' : 'opacity-0 max-h-0 pointer-events-none'} transition-all duration-300 ease-in-out`}>
                        <ul className="flex flex-col gap-2">
                            {optionGroups.map((group: OptionGroup) => (
                                <li key={group.id}>
                                    <label className="w-full flex items-start px-6 py-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={getSelectedoptions().some(gr => gr.id === group.id)}
                                            onChange={(e) => handleCheckboxOptionsChange(Number(group.id), e.target.checked)}
                                            className="flex items-center justify-center peer appearance-none w-5 h-5 min-w-[20px] min-h-[20px] rounded-full border border-black dark:border-white checked:bg-primary  checked:border-none mr-2 relative cursor-pointer before:content-['✔'] before:absolute before:text-[#161a21] before:text-[12px] before:opacity-0 checked:before:opacity-100"
                                        />
                                        <p className="flex items-center justify-center gap-3">{group.title}</p>
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
                onClick={() => setShowConfirm(true)}
            >
                <BsFillTrash3Fill className="mr-2" />
                Excluir item
            </button>
            {showConfirm && (
                <ConfirmDeletion
                    question="Tem certeza de que deseja excluir este item?"
                    description="O item será excluído permanentemente. Esta ação não pode ser desfeita."
                    close={() => setShowConfirm(false)}
                    onDelete={handleDeleteMenuItem}
                />
            )}
            {error && (
                <p className="text-error">{error}</p>
            )}
        </UpdateDataForm>
    );
};
