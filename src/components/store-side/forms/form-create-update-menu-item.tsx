import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
//import { createMenuItemService, updateMenuItemService } from "../../../services/service-manage-menu-store";
// import { MenuItemFormData, UpdateMenuItemFormProps } from "../../../types/types-data-forms.d";
// import { ErrorComponent } from "../../component-error";
// import { LoadingComponent } from "../../component-loading";
// import { InputName } from "../inputs/input-store-menu-item-name";
import { InputPrice } from "../inputs/input-store-menu-item-price";
// import { IoCloseOutline } from "react-icons/io5";
import { IoIosAddCircle, IoIosArrowDown } from "react-icons/io";
import { CategoryData, MenuItem, OptionGroup } from "../../../types/types-menu.d";
import { useManageMenu } from "../../../context/manage-menu/manage-menu-context";
import { UpdateDataForm } from "./deafult/form-update-data";

export const CreateMenuItemForm = ({
    onClose,
    error,
    categoryId
}: {
    onClose: () => void;
    error?: string;
    categoryId?: number;
}) => {

    const { createMenuItem, categories, optionsGroups } = useManageMenu();
    console.log(optionsGroups)

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
        if (categoryId !== undefined) {
            const categoryObj = categories.find(cat => cat.id === categoryId);
            if (categoryObj) {
                setValue("categories", [categoryObj]);
            }
        }
    }, [categoryId, categories, setValue]);

    const selectedCategories = watch("categories") as CategoryData[] || [];
    const selectedoptions = watch("optionsGroups") as OptionGroup[] || [];

    const handleFormSubmit = async (data: MenuItem) => {
        try {
            const categoryIds = Array.isArray(data.categories)
                ? data.categories.map(cat => cat.id)
                : [];

            const optionGroupIds = Array.isArray(data.optionsGroups)
                ? data.optionsGroups.map(gr => gr.id)
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
            const optionsObj = optionsGroups.find(gr => gr.id === optionId);
            if (optionsObj) {
                setValue("optionsGroups", [...currentOptions, optionsObj]);
            }
        } else {
            setValue("optionsGroups", currentOptions.filter(gr => gr.id !== optionId));
        }
    };

    const getSelectedCategories = (): CategoryData[] => {
        const value = watch("categories");
        return Array.isArray(value) ? value : [];
    };

    const getSelectedoptions = (): OptionGroup[] => {
        const value = watch("optionsGroups");
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
                        Itens ({(selectedCategories ?? []).length}/{categories.length})
                    </button>
                    <div className={`${openArrayCategories ? 'opacity-100 mt-3 pointer-events-auto' : 'opacity-0 max-h-0 pointer-events-none'} transition-all duration-300 ease-in-out`}>
                        <ul className="flex flex-col gap-2">
                            {categories.map((category: CategoryData) => (
                                <li key={category.id}>
                                    <label htmlFor={`category-${category.id}`} className="w-full flex items-start px-6 py-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            id={`category-${category.id}`}
                                            checked={getSelectedCategories().some(cat => cat.id === category.id)}
                                            onChange={(e) => handleCheckboxCategoryChange(Number(category.id), e.target.checked)}
                                            className="flex items-center justify-center peer appearance-none w-5 h-5 rounded-full border border-black dark:border-white checked:bg-primary checked:border-blue-600 mr-2 relative cursor-pointer before:content-['✔'] before:absolute before:text-[#161a21] before:text-[12px] before:opacity-0 checked:before:opacity-100"
                                        />
                                        <p className="flex items-center justify-center gap-3">{category.name}</p>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            }
            <input type="hidden" {...register("optionsGroups")} />
            {optionsGroups.length > 0 &&
                <div className="w-full bg-zinc-300 dark:bg-[#161a21] border rounded-2xl border-zinc-400 flex flex-col items-center mt-4">
                    <button
                        type="button"
                        className="w-full flex items-center justify-center px-8 gap-2 my-2 cursor-pointer hover:scale-103 transition-all duration-300"
                        onClick={() => setOpenArrayOptions(!openArrayOptions)}
                    >
                        <IoIosArrowDown className={`${openArrayOptions ? 'rotate-180' : ''} transition-all duration-300`} />
                        Opcionais ({(selectedoptions ?? []).length}/{optionsGroups.length})
                    </button>
                    <div className={`${openArrayOptions ? 'opacity-100 mt-3 pointer-events-auto' : 'opacity-0 max-h-0 pointer-events-none'} transition-all duration-300 ease-in-out`}>
                        <ul className="flex flex-col gap-2">
                            {optionsGroups.map((group: OptionGroup) => (
                                <li key={group.id}>
                                    <label htmlFor={`category-${group.id}`} className="w-full flex items-start px-6 py-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                id={`category-${group.id}`}
                                                checked={getSelectedoptions().some(gr => gr.id === group.id)}
                                                onChange={(e) => handleCheckboxOptionsChange(Number(group.id), e.target.checked)}
                                                className="flex items-center justify-center peer appearance-none w-5 h-5 rounded-full border border-black dark:border-white checked:bg-primary checked:border-blue-600 mr-2 relative cursor-pointer before:content-['✔'] before:absolute before:text-[#161a21] before:text-[12px] before:opacity-0 checked:before:opacity-100"
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

// export const UpdateMenuItemForm: React.FC<UpdateMenuItemFormProps> = ({
//     onClose,
//     onUpdated,
//     categoryId,
//     itemId,
//     initialData
// }) => {
//     const {
//         register,
//         clearErrors,
//         setError,
//         formState: { errors },
//         handleSubmit,
//     } = useForm<MenuItemFormData>({
//         defaultValues: {
//             name: initialData.name,
//             description: initialData.description,
//             price: typeof initialData.price === "number"
//                 ? initialData.price.toFixed(2).replace('.', ',')
//                 : Number(initialData.price.toString().replace(',', '.')).toFixed(2).replace('.', ','),
//         }
//     });

//     const [error, setErrorMessage] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [messageSuccess, setMessageSuccess] = useState("");

//     useEffect(() => {
//         if (messageSuccess) {
//             const timer = setTimeout(() => {
//                 setMessageSuccess("");
//             }, 3000);
//             return () => clearTimeout(timer);
//         }
//     }, [messageSuccess]);

//     const handleFormSubmit = async (data: MenuItemFormData) => {
//         setLoading(true);
//         setErrorMessage("");

//         const priceRegex = /^\d+,\d{2}$/;
//         if (!priceRegex.test(data.price)) {
//             setError("price", { message: "Valor inválido" });
//             setLoading(false);
//             return;
//         }

//         const parsedPrice = Number(data.price.replace(',', '.'));
//         if (isNaN(parsedPrice) || parsedPrice <= 0) {
//             setError("price", { message: "Preço inválido" });
//             setLoading(false);
//             return;
//         }
//         try {
//             await updateMenuItemService(categoryId, itemId, {
//                 name: data.name,
//                 description: data.description,
//                 price: parsedPrice,
//             });
//             if (onUpdated) onUpdated();

//             setMessageSuccess("Item atualizado com sucesso!");
//             onClose();
//         } catch (error: unknown) {
//             setErrorMessage(error instanceof Error ? error.message : "Erro ao atualizar item");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <>
//             {error ? (
//                 <div className="fixed z-30 w-screen h-screen flex items-center justify-center bg-white/10 backdrop-blur-sm">
//                     <div className="absolute z-50 w-120 h-90 mx-3 p-5 pt-25 pb-20 border border-zinc-400 bg-white rounded-xl flex flex-col items-center justify-center">
//                         <button type="button" className="absolute top-2 right-2 p-2 rounded-full bg-red-600 text-white cursor-pointer transition-all duration-200" onClick={onClose}>
//                             <IoCloseOutline className="text-lg" />
//                         </button>
//                         <ErrorComponent message={error} />
//                     </div>
//                 </div>
//             ) : loading ? (
//                 <div className="fixed z-30 w-screen h-screen flex items-center justify-center bg-white/10 backdrop-blur-sm">
//                     <div className="absolute z-50 w-120 h-90 mx-3 p-5 pt-25 pb-20 border border-zinc-400 bg-white rounded-xl flex flex-col items-center justify-center">
//                         <button type="button" className="absolute top-2 right-2 p-2 rounded-full bg-red-600 text-white cursor-pointer transition-all duration-200" onClick={onClose}>
//                             <IoCloseOutline className="text-lg" />
//                         </button>
//                         <LoadingComponent />
//                     </div>
//                 </div>
//             ) : (
//                 <div className="fixed inset-0 z-30 flex items-center justify-center">
//                     <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
//                     <form onSubmit={handleSubmit(handleFormSubmit)} noValidate className="relative z-50 w-120 max-w-115 mx-3 mt-0 mb-5 p-5 py-4 border border-zinc-400 rounded-xl flex flex-col items-center justify-center gap-4 bg-white text-black">
//                         <button type="button" className="absolute top-2 right-2 p-2 rounded-full bg-red-600 text-white cursor-pointer transition-all duration-200" onClick={onClose}>
//                             <IoCloseOutline
//                                 className="text-lg"
//                             />
//                         </button>
//                         <div className="w-full max-w-105 mt-5 mb-5 flex flex-col gap-1">
//                             <h3 className="text-lg md:text-2xl mb-3 text-center">Editar item</h3>
//                             <InputName
//                                 register={register}
//                                 errors={errors}
//                                 clearErrors={clearErrors}
//                             />
//                             <label htmlFor="description" className="ml-2 mt-2 flex justify-between relative">Descrição
//                                 {errors.description && (
//                                     <span className="span-error">{errors.description.message?.toString()}</span>
//                                 )}
//                             </label>
//                             <textarea {...register("description", { required: "Descrição obrigatória" })} className={`input h-32 mb-2.5 border rounded px-3 py-2${errors.description ? " border-red-500" : ""}`} placeholder="Descrição" />
//                             <InputPrice
//                                 register={register}
//                                 errors={errors}
//                                 clearErrors={clearErrors}
//                                 initialValues={{}}
//                             />
//                         </div>
//                         {error && (<p className="font-bold text-error">{error}</p>)}
//                         {messageSuccess && (<p className="font-bold text-green-600">{messageSuccess}</p>)}
//                         <button type="submit" className="w-[250px] primary-button">Salvar alterações</button>
//                     </form>
//                 </div>
//             )}
//         </>
//     );
// };