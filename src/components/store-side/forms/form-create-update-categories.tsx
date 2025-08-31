import { useEffect, useState } from "react";
import { categoryFormProps } from "../../../types/types-data-forms.d";
import { UpdateDataForm } from "./deafult/form-update-data";
import { IoIosAddCircle, IoIosArrowDown } from "react-icons/io";
import { BsFillTrash3Fill } from "react-icons/bs";
import { ConfirmDeletion } from "./deafult/confirm-deletion"
import { deleteCategoryService, getMenuItemsMyStore } from "../../../services/service-manage-menu-store";
import { CategoryData, MenuItem } from "../../../types/types-menu.d";
import { useForm } from "react-hook-form";

export const CreateCategoryForm = ({
    onClose,
    onSubmit,
    error
}: categoryFormProps) => {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setValue,
        watch
    } = useForm<CategoryData>();

    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [openArrayItems, setOpenArrayItems] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const selectedItems = watch("menuItems", []);

    const handleFormSubmit = async (data: CategoryData) => {
        try {
            await onSubmit(data.name.trim(), data.menuItems || []);
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const items = await getMenuItemsMyStore();
                setMenuItems(items.data);
            } catch (error) {
                console.error("Erro ao buscar itens:", error);
            }
        };
        fetchData();
    }, []);

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
                        Itens
                    </button>

                    {(selectedItems ?? []).length > 0 && <p>({(selectedItems ?? []).length} itens selecionados)</p>}

                    <div className={`${openArrayItems ? 'opacity-100 mt-3' : 'opacity-0 max-h-0'} transition-all duration-300 ease-in-out`}>
                        <p className="text-center text-zinc-600 dark:text-zinc-400 font-extralight text-sm mb-2">
                            Você pode usar os items abaixo na nova categoria
                        </p>
                        <ul className="space-y-2 mt-3">
                            {menuItems.map((item: MenuItem) => (
                                <li key={item.id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`item-${item.id}`}
                                        checked={selectedItems?.includes(item.id)}
                                        onChange={(e) => handleCheckboxChange(item.id, e.target.checked)}
                                        className="checkbox-primary mr-2"
                                    />
                                    <label htmlFor={`item-${item.id}`} className="text-md text-gray-700 dark:text-gray-200">
                                        {item.name}
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
    onSubmit,
    initialName = "",
    categoryId,
    initialMenuItems = [],
    error
}: categoryFormProps & {
    initialName?: string;
    categoryId: number;
    initialMenuItems?: number[];
}) => {

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

    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [openArrayItems, setOpenArrayItems] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);

    const selectedItems = watch("menuItems", []);

    const handleFormSubmit = async (data: CategoryData) => {
        try {
            await onSubmit(data.name.trim(), data.menuItems || []);
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

    const deleteCategory = async (categoryId: number) => {
        try {
            await deleteCategoryService(categoryId);
            setSuccessMessage("Categoria excluída com sucesso!");
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const items = await getMenuItemsMyStore();
                setMenuItems(items.data);

                // Marcar os itens que já pertencem à categoria
                if (categoryId !== undefined) {
                    const selectedIds = items.data
                        .filter((item: MenuItem) =>
                            Array.isArray(item.categories) &&
                            item.categories.some(category => category.id === categoryId)
                        )
                        .map((item: MenuItem) => item.id);

                    setValue("menuItems", selectedIds);
                }
            } catch (error) {
                console.error("Erro ao buscar itens:", error);
            }
        };
        fetchData();
    }, [categoryId, setValue]);


    return (
        <UpdateDataForm
            onClose={onClose}
            formIcon={<IoIosAddCircle />}
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
                        Itens
                    </button>

                    {(selectedItems ?? []).length > 0 && <p>({(selectedItems ?? []).length} itens selecionados)</p>}

                    <div className={`${openArrayItems ? 'opacity-100 mt-3' : 'opacity-0 max-h-0'} transition-all duration-300 ease-in-out`}>
                        <p className="text-zinc-600 dark:text-zinc-400 font-extralight text-sm mb-2">
                            Você pode usar os items abaixo na nova categoria
                        </p>
                        <ul className="space-y-2 mt-3">
                            {menuItems.map((item: MenuItem) => (
                                <li key={item.id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`item-${item.id}`}
                                        checked={selectedItems?.includes(item.id)}
                                        onChange={(e) => handleCheckboxChange(item.id, e.target.checked)}
                                        className="checkbox-primary mr-2"
                                    />
                                    <label htmlFor={`item-${item.id}`} className="text-md text-gray-700 dark:text-gray-200">
                                        {item.name}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            }

            <button
                type="button"
                className="w-50 mt-4 mx-auto bg-red-600 px-3 py-2 flex justify-center items-center rounded-full cursor-pointer hover:scale-105 transition-all duration-300 text-white"
                onClick={() => setShowConfirm(true)}
            >
                <BsFillTrash3Fill className="mr-2" />
                Excluir categoria
            </button>

            {showConfirm && (
                <ConfirmDeletion
                    question="Tem certeza de que deseja excluir esta categoria?"
                    description="Os items que só existem aqui também serão excluidos permanentemente."
                    close={() => setShowConfirm(false)}
                    onDelete={() => deleteCategory(categoryId)}
                />
            )}

            {error && (
                <p className="text-error">{error}</p>
            )}
        </UpdateDataForm>
    );
};