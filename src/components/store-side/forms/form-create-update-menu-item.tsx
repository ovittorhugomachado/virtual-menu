import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createMenuItemService, updateMenuItemByCategoryService } from "../../../services/service-manage-menu-store";
import { CreateMenuItemFormProps, MenuItemFormData, UpdateMenuItemFormProps } from "../../../types/types-data-forms.d";
import { ErrorComponent } from "../../component-error";
import { LoadingComponent } from "../../component-loading";
import { InputName } from "../inputs/input-store-menu-item-name";
import { InputPrice } from "../inputs/input-store-menu-item-price";
import { InputCategories } from "../inputs/input-store-categories";
import { IoCloseOutline } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";

export const MenuItemCreationForm: React.FC<CreateMenuItemFormProps> = ({
    onClose,
    onCreated,
    categoryId,
    categories
}) => {

    const {
        register,
        clearErrors,
        setError,
        setValue,
        watch,
        formState: { errors },
        handleSubmit
    } = useForm<MenuItemFormData>();

    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const selectedCategories = watch("categories") || [];

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage("");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    useEffect(() => {
        if (categoryId !== undefined) {
            setValue("categories", [Number(categoryId)]);
        }
    }, [categoryId, setValue]);

    const handleCategoryChange = (categoryId: number, isChecked: boolean) => {
        const currentCategories = selectedCategories || [];

        if (isChecked) {
            setValue("categories", [...currentCategories, categoryId]);
        } else {
            if (currentCategories.length > 1) {
                setValue("categories", currentCategories.filter(id => id !== categoryId));
            }
        }

        clearErrors("categories");
    };

    const handleFormSubmit = async (data: MenuItemFormData) => {
        setLoading(true);
        setErrorMessage("");

        const priceRegex = /^\d+,\d{2}$/;
        if (!priceRegex.test(data.price)) {
            setError("price", { message: "Valor inválido" });
            setLoading(false);
            return;
        }

        const parsedPrice = Number(data.price.replace(',', '.'));
        if (isNaN(parsedPrice) || parsedPrice <= 0) {
            setError("price", { message: "Preço inválido" });
            setLoading(false);
            return;
        }

        if (!selectedCategories || selectedCategories.length === 0) {
            setError("categories", { message: "Selecione pelo menos uma categoria" });
            setLoading(false);
            return;
        }

        try {
            await createMenuItemService({
                name: data.name,
                description: data.description ?? undefined,
                price: parsedPrice,
                categoryId: selectedCategories.map(Number)
            });

            if (onCreated) onCreated();
            setSuccessMessage("Item criado com sucesso!");
            onClose();
        } catch (error: unknown) {
            setErrorMessage(error instanceof Error ? error.message : "Erro ao criar item");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-white/10 backdrop-blur-sm overflow-hidden z-50">
            <div className="h-full w-full overflow-y-auto">
                <div className="min-h-full min-w-full flex justify-center items-center">
                    <div className="w-[90%] max-w-[950px] flex flex-col my-4 md:shadow-2xl">
                        <div className="h-30 bg-primary dark:bg-[#161a21] flex justify-center items-center rounded-t-xl relative overflow-hidden">
                            <div className="flex">
                                <div className="text-white dark:text-primary mx-2 hidden md:block">
                                    <IoIosAddCircle size={40} />
                                </div>
                                <h1 className="text-center dark:text-white">Criar novo item</h1>
                            </div>
                            <button
                                type="button"
                                className="absolute top-2 right-2 p-2 rounded-full bg-red-600 text-white cursor-pointer transition-all duration-200"
                                onClick={onClose}
                            >
                                <IoCloseOutline className="text-lg" />
                            </button>
                        </div>
                        <form
                            onSubmit={handleSubmit(handleFormSubmit)}
                            noValidate
                            className="w-full min-h-75 bg-white dark:bg-[#202326] pb-6 flex flex-col justify-start md:justify-between items-center gap-4 rounded-b-xl"
                        >
                            {loading ? (
                                <LoadingComponent />
                            ) : (successMessage ?? "").length > 0 ? (
                                <>
                                    <FaCheckCircle className="text-[100px] text-green-800" />
                                    <h4 className="text-black dark:text-white text-center">{successMessage}</h4>
                                </>
                            ) : (
                                <>
                                    {errorMessage ? (
                                        <ErrorComponent message={errorMessage} />
                                    ) : (
                                        <>
                                            <div className="w-full max-w-105 mt-4 flex flex-1 flex-col justify-center gap-2 dark:text-white">
                                                <InputName
                                                    register={register}
                                                    errors={errors}
                                                    clearErrors={clearErrors}
                                                />
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
                                                <label className="mb-1 mt-4 ml-2">Categorias *</label>
                                                <div className="flex flex-wrap gap-4 mb-2">
                                                    <InputCategories
                                                        categories={categories ?? []}
                                                        register={register}
                                                        errors={errors}
                                                        clearErrors={clearErrors}
                                                        selectedCategories={selectedCategories}
                                                        onChangeFunction={handleCategoryChange}
                                                    />
                                                </div>
                                            </div>
                                            {errors.categories && (
                                                <p className="text-red-600 text-sm text-center mt-2">
                                                    {errors.categories.message}
                                                </p>
                                            )}
                                            <div className="w-full flex justify-center z-50">
                                                <button
                                                    type="submit"
                                                    className="w-[230px] max-w-[90vw] primary-button"
                                                >
                                                    Criar item
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const UpdateMenuItemForm: React.FC<UpdateMenuItemFormProps> = ({
    onClose,
    onUpdated,
    categoryId,
    itemId,
    initialData
}) => {
    const {
        register,
        clearErrors,
        setError,
        formState: { errors },
        handleSubmit,
    } = useForm<MenuItemFormData>({
        defaultValues: {
            name: initialData.name,
            description: initialData.description,
            price: typeof initialData.price === "number"
                ? initialData.price.toFixed(2).replace('.', ',')
                : Number(initialData.price.toString().replace(',', '.')).toFixed(2).replace('.', ','),
        }
    });

    const [error, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [messageSuccess, setMessageSuccess] = useState("");

    useEffect(() => {
        if (messageSuccess) {
            const timer = setTimeout(() => {
                setMessageSuccess("");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [messageSuccess]);

    const handleFormSubmit = async (data: MenuItemFormData) => {
        setLoading(true);
        setErrorMessage("");

        const priceRegex = /^\d+,\d{2}$/;
        if (!priceRegex.test(data.price)) {
            setError("price", { message: "Valor inválido" });
            setLoading(false);
            return;
        }

        const parsedPrice = Number(data.price.replace(',', '.'));
        if (isNaN(parsedPrice) || parsedPrice <= 0) {
            setError("price", { message: "Preço inválido" });
            setLoading(false);
            return;
        }
        try {
            await updateMenuItemByCategoryService(categoryId, itemId, {
                name: data.name,
                description: data.description,
                price: parsedPrice,
            });
            if (onUpdated) onUpdated();

            setMessageSuccess("Item atualizado com sucesso!");
            onClose();
        } catch (error: unknown) {
            setErrorMessage(error instanceof Error ? error.message : "Erro ao atualizar item");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {error ? (
                <div className="fixed z-30 w-screen h-screen flex items-center justify-center bg-white/10 backdrop-blur-sm">
                    <div className="absolute z-50 w-120 h-90 mx-3 p-5 pt-25 pb-20 border border-zinc-400 bg-white rounded-xl flex flex-col items-center justify-center">
                        <button type="button" className="absolute top-2 right-2 p-2 rounded-full bg-red-600 text-white cursor-pointer transition-all duration-200" onClick={onClose}>
                            <IoCloseOutline className="text-lg" />
                        </button>
                        <ErrorComponent message={error} />
                    </div>
                </div>
            ) : loading ? (
                <div className="fixed z-30 w-screen h-screen flex items-center justify-center bg-white/10 backdrop-blur-sm">
                    <div className="absolute z-50 w-120 h-90 mx-3 p-5 pt-25 pb-20 border border-zinc-400 bg-white rounded-xl flex flex-col items-center justify-center">
                        <button type="button" className="absolute top-2 right-2 p-2 rounded-full bg-red-600 text-white cursor-pointer transition-all duration-200" onClick={onClose}>
                            <IoCloseOutline className="text-lg" />
                        </button>
                        <LoadingComponent />
                    </div>
                </div>
            ) : (
                <div className="fixed inset-0 z-30 flex items-center justify-center">
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate className="relative z-50 w-120 max-w-115 mx-3 mt-0 mb-5 p-5 py-4 border border-zinc-400 rounded-xl flex flex-col items-center justify-center gap-4 bg-white text-black">
                        <button type="button" className="absolute top-2 right-2 p-2 rounded-full bg-red-600 text-white cursor-pointer transition-all duration-200" onClick={onClose}>
                            <IoCloseOutline
                                className="text-lg"
                            />
                        </button>
                        <div className="w-full max-w-105 mt-5 mb-5 flex flex-col gap-1">
                            <h3 className="text-lg md:text-2xl mb-3 text-center">Editar item</h3>
                            <InputName
                                register={register}
                                errors={errors}
                                clearErrors={clearErrors}
                            />
                            <label htmlFor="description" className="ml-2 mt-2 flex justify-between relative">Descrição
                                {errors.description && (
                                    <span className="span-error">{errors.description.message?.toString()}</span>
                                )}
                            </label>
                            <textarea {...register("description", { required: "Descrição obrigatória" })} className={`input h-32 mb-2.5 border rounded px-3 py-2${errors.description ? " border-red-500" : ""}`} placeholder="Descrição" />
                            <InputPrice
                                register={register}
                                errors={errors}
                                clearErrors={clearErrors}
                                initialValues={{}}
                            />
                        </div>
                        {error && (<p className="font-bold text-error">{error}</p>)}
                        {messageSuccess && (<p className="font-bold text-green-600">{messageSuccess}</p>)}
                        <button type="submit" className="w-[250px] primary-button">Salvar alterações</button>
                    </form>
                </div>
            )}
        </>
    );
};