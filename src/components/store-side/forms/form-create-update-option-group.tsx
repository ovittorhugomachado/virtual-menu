import { IoIosAddCircle, IoIosArrowDown } from "react-icons/io";
import { UpdateDataForm } from "./deafult/form-update-data"
import { useFieldArray, useForm } from "react-hook-form";
import { OptionGroup, MenuItem } from "../../../types/types-menu.d";
import { useEffect, useState } from "react";
import { useManageMenu } from "../../../context/manage-menu/manage-menu-context";
import { OptionGroupFormData } from "../../../types/types-data-forms.d";
import { InputOptioGroupName } from "../inputs/input-store-option-group-name";
import { InputRadioRequired } from "../inputs/input-store-radio-required";
import { InputOptions } from "../inputs/input-store-options";
import { MaxMinSelectableOptions } from "../inputs/input-store-max-min-selectable-options";
import { CreateMenuItemForm } from "./form-create-update-menu-item";

export const CreateOptionGroupForm = ({
    menuItemId,
    childrenForm = false,
    onClose
}: {
    menuItemId?: number,
    childrenForm?: boolean,
    onClose: () => void;
}) => {

    const {
        register,
        handleSubmit,
        control,
        watch,
        clearErrors,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<OptionGroupFormData>({
        defaultValues: {
            options: [{ name: "", description: "", additionalPrice: 0 }],
            menuItemIds: [menuItemId]
        }
    });

    const { createOptionGroup, menuItems } = useManageMenu()
    const [isRequired, setIsRequired] = useState(false);
    const [openArrayItems, setOpenArrayItems] = useState(false);
    const [openCreateItemForm, setOpenCreateItemForm] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const selectedItems = watch("menuItemIds", []);

    const { fields, append, remove } = useFieldArray({
        control,
        name: "options",
    });

    const handleFormSubmit = async (data: OptionGroupFormData) => {

        const min = data.minOptions === undefined || data.minOptions === null ? null : Number(data.minOptions);
        const max = data.maxOptions === undefined || data.maxOptions === null ? null : Number(data.maxOptions);

        const optionGroup: OptionGroup = {
            title: data.name,
            menuItemIds: data.menuItemIds ?? [],
            minSelectableOptions: min,
            maxSelectableOptions: max,
            required: isRequired,
            storeId: 1,
            options: (data.options ?? []).map(opt => ({
                name: opt.name,
                additionalPrice: Number(opt.additionalPrice) || 0,
                description: opt.description ?? "",
            })),
        };
        try {
            await createOptionGroup(optionGroup);
            setSuccessMessage("Adicionais criado com sucesso!");
        } catch (error) {
            console.error("Erro ao criar categoria:", error);
        }
    }

    const changeIsRequired = () => {
        setIsRequired(!isRequired)
    }

    const handleCheckboxChange = (itemId: number, isChecked: boolean) => {
        const currentItems = selectedItems || [];
        if (isChecked) {
            setValue("menuItemIds", [...currentItems, itemId]);
        } else {
            setValue("menuItemIds", currentItems.filter(id => id !== itemId));
        }
    };

    const handleAddOptions = () => {
        append({ name: "", description: "", additionalPrice: 0 });
        setValue("minOptions", null);
        setValue("maxOptions", null);
        clearErrors(["minOptions", "maxOptions"]);
    }

    const handleRemoveOption = (index: number) => {
        remove(index);
        setValue("minOptions", null);
        setValue("maxOptions", null);
    }

    useEffect(() => {
        clearErrors(["minOptions", "maxOptions"]);
    }, [isRequired, clearErrors]);

    const quantityOptions = watch("options");

    return (
        <>
            <UpdateDataForm
                onClose={onClose}
                formIcon={<IoIosAddCircle />}
                title="Criar Grupo de adicionais"
                successMessage={successMessage}
                textButtonSubmit="Criar"
                submitFunction={handleSubmit(handleFormSubmit)}
                isLoadingSubmit={isSubmitting}
            >
                <InputOptioGroupName
                    register={register}
                    errors={errors}
                    clearErrors={clearErrors}
                    initialValues={{}}
                />
                <InputRadioRequired
                    isRequired={isRequired}
                    onChangeIsRequired={changeIsRequired}
                    register={register}
                    errors={errors}
                />

                <InputOptions
                    options={fields}
                    onRemoveOption={handleRemoveOption}
                    register={register}
                    errors={errors}
                    clearErrors={clearErrors}
                    initialValues={{}}
                />
                <button
                    type="button"
                    onClick={handleAddOptions}
                    className="flex justify-center items-center py-2 mb-8 rounded-full cursor-pointer hover:scale-103 transition-all bg-[#161a21] text-white dark:bg-white dark:text-black"
                >
                    <IoIosAddCircle className="text-[#161a21] inline w-6 h-6" />
                    Adicionar opção
                </button>
                <MaxMinSelectableOptions
                    isRequired={isRequired}
                    quantityOptions={quantityOptions}
                    register={register}
                    errors={errors}
                />
                {menuItems.length > 0 &&
                    <div className="w-full bg-zinc-300 dark:bg-[#161a21] border rounded-2xl border-zinc-400 flex flex-col items-center justify-center mt-4 pt-2">
                        <button
                            type="button"
                            className="w-full flex items-center justify-center px-8 gap-2 rounded-2xl cursor-pointer mb-2 hover:scale-103 transition-all duration-300"
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
                                        <label htmlFor={`item-${item.id}`} className="w-full flex items-center px-6 py-3 rounded-full cursor-pointer">
                                            <input
                                                type="checkbox"
                                                id={`item-${item.id}`}
                                                checked={selectedItems?.includes(Number(item.id))}
                                                onChange={(e) => handleCheckboxChange(Number(item.id), e.target.checked)}
                                                className="flex items-center justify-center peer appearance-none w-5 h-5 min-w-[20px] min-h-[20px] rounded-full border border-black dark:border-white checked:bg-primary  checked:border-none mr-2 relative cursor-pointer before:content-['✔'] before:absolute before:text-[#161a21] before:text-[12px] before:opacity-0 checked:before:opacity-100"
                                            />
                                            <p className="flex items-center justify-center gap-3">{item.name}<span className="text-sm font-extralight text-zinc-600 dark:text-zinc-400">R${item.price}</span></p>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                            {!childrenForm && (
                                <>
                                    <button
                                        type="button"
                                        className={`my-3 mx-auto pointer-events-auto flex items-center justify-center gap-1 rounded-full py-1 px-2 cursor-pointer bg-primary text-[#161a21]`}
                                        onClick={() => setOpenCreateItemForm(true)}
                                    >
                                        <IoIosAddCircle className="w-6 h-6" />
                                        Criar novo item
                                    </button>
                                    {openCreateItemForm && (
                                        <CreateMenuItemForm
                                            onClose={() => setOpenCreateItemForm(false)}
                                            childrenForm={true}
                                        />
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                }
            </UpdateDataForm>
        </>
    )
};

export const UpdateOptionGroupForm = ({
    optionGroupId,
    onClose,
    optionGroup,
    childrenForm = false,
}: {
    optionGroupId: number;
    onClose: () => void;
    optionGroup: OptionGroup;
    childrenForm?: boolean;
}) => {
    const {
        register,
        handleSubmit,
        control,
        watch,
        clearErrors,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<OptionGroupFormData>({
        defaultValues: {
            name: optionGroup.title,
            options: optionGroup.options?.map(opt => ({
                name: opt.name,
                description: opt.description ?? "",
                additionalPrice: opt.additionalPrice ?? 0,
            })) ?? [{ name: "", description: "", additionalPrice: 0 }],
            menuItemIds: optionGroup.menuItem?.flatMap(item => item?.id ? [item.id] : []) ?? [],
            minOptions: optionGroup.minSelectableOptions ?? null,
            maxOptions: optionGroup.maxSelectableOptions ?? null,
        }
    });

    const { updateOptionGroup, menuItems } = useManageMenu();
    const [isRequired, setIsRequired] = useState(optionGroup.required ?? false);
    const [openArrayItems, setOpenArrayItems] = useState(false);
    const [openCreateItemForm, setOpenCreateItemForm] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const selectedItems = watch("menuItemIds", []);
    const options = watch("options", []);
    console.log(options)
    const { fields, append, remove } = useFieldArray({
        control,
        name: "options",
    });

    useEffect(() => {
        clearErrors(["minOptions", "maxOptions"]);
    }, [isRequired, clearErrors]);

    const handleFormSubmit = async (data: OptionGroupFormData) => {
        const min = data.minOptions === undefined || data.minOptions === null ? null : Number(data.minOptions);
        const max = data.maxOptions === undefined || data.maxOptions === null ? null : Number(data.maxOptions);

        const updatedGroup: OptionGroup = {
            ...optionGroup,
            title: data.name,
            menuItemIds: data.menuItemIds ?? [],
            minSelectableOptions: min,
            maxSelectableOptions: max,
            required: isRequired,
            storeId: optionGroup.storeId,
            options: (data.options ?? []).map(opt => ({
                name: opt.name,
                additionalPrice: Number(opt.additionalPrice) || 0,
                description: opt.description ?? "",
            })),
        };
        try {
            await updateOptionGroup(optionGroupId, updatedGroup);
            setSuccessMessage("Grupo de opcionais atualizado com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar grupo de opcionais:", error);
        }
    };

    const changeIsRequired = () => {
        setIsRequired(!isRequired);
    };

    const handleCheckboxChange = (itemId: number, isChecked: boolean) => {
        const currentItems = selectedItems || [];
        if (isChecked) {
            setValue("menuItemIds", [...currentItems, itemId]);
        } else {
            setValue("menuItemIds", currentItems.filter(id => id !== itemId));
        }
    };

    const handleAddOptions = () => {
        append({ name: "", description: "", additionalPrice: 0 });
        setValue("minOptions", null);
        setValue("maxOptions", null);
        clearErrors(["minOptions", "maxOptions"]);
    };

    const handleRemoveOption = (index: number) => {
        remove(index);
        setValue("minOptions", null);
        setValue("maxOptions", null);
    };

    const quantityOptions = watch("options");

    return (
        <UpdateDataForm
            onClose={onClose}
            formIcon={<IoIosAddCircle />}
            title="Editar Grupo de adicionais"
            successMessage={successMessage}
            textButtonSubmit="Atualizar"
            submitFunction={handleSubmit(handleFormSubmit)}
            isLoadingSubmit={isSubmitting}
        >
            <InputOptioGroupName
                register={register}
                errors={errors}
                clearErrors={clearErrors}
                initialValues={{ name: optionGroup.title }}
            />
            <InputRadioRequired
                isRequired={isRequired}
                onChangeIsRequired={changeIsRequired}
                register={register}
                errors={errors}
            />
            <InputOptions
                options={fields}
                onRemoveOption={handleRemoveOption}
                register={register}
                errors={errors}
                clearErrors={clearErrors}
                initialValues={{
                    options: optionGroup.options?.map(opt => ({
                        additionalPrice: opt.additionalPrice ?? 0,
                        name: opt.name ?? "",
                        description: opt.description ?? "",
                    }))
                }}
            />
            <button
                type="button"
                onClick={handleAddOptions}
                className="flex justify-center items-center py-2 mb-8 rounded-full cursor-pointer hover:scale-103 transition-all bg-[#161a21] text-white dark:bg-white dark:text-black"
            >
                <IoIosAddCircle className="text-[#161a21] inline w-6 h-6" />
                Adicionar opção
            </button>
            <MaxMinSelectableOptions
                isRequired={isRequired}
                quantityOptions={quantityOptions}
                register={register}
                errors={errors}
            />
            {menuItems.length > 0 &&
                <div className="w-full bg-zinc-300 dark:bg-[#161a21] border rounded-2xl border-zinc-400 flex flex-col items-center justify-center mt-4 pt-2">
                    <button
                        type="button"
                        className="w-full flex items-center justify-center px-8 gap-2 rounded-2xl cursor-pointer mb-2 hover:scale-103 transition-all duration-300"
                        onClick={() => setOpenArrayItems(!openArrayItems)}
                        style={{ fontSize: '18px' }}
                    >
                        <IoIosArrowDown className={`${openArrayItems ? 'rotate-180' : ''} transition-all duration-300`} />
                        Itens ({(selectedItems ?? []).length}/{menuItems.length})
                    </button>
                    <div className={`${openArrayItems ? 'opacity-100 mt-3 pointer-events-auto' : 'opacity-0 max-h-0 pointer-events-none'} transition-all duration-300 ease-in-out`}>
                        <p className="text-center text-zinc-600 dark:text-zinc-400 font-extralight text-sm mb-2">
                            Você pode usar os items abaixo no grupo de opcionais
                        </p>
                        <ul className="flex flex-col gap-2">
                            {menuItems.map((item: MenuItem) => (
                                <li key={item.id} className="">
                                    <label htmlFor={`item-${item.id}`} className="w-full flex items-center px-6 py-3 rounded-full cursor-pointer">
                                        <input
                                            type="checkbox"
                                            id={`item-${item.id}`}
                                            checked={selectedItems?.includes(Number(item.id))}
                                            onChange={(e) => handleCheckboxChange(Number(item.id), e.target.checked)}
                                            className="flex items-center justify-center peer appearance-none w-5 h-5 min-w-[20px] min-h-[20px] rounded-full border border-black dark:border-white checked:bg-primary  checked:border-none mr-2 relative cursor-pointer before:content-['✔'] before:absolute before:text-[#161a21] before:text-[12px] before:opacity-0 checked:before:opacity-100"
                                        />
                                        <p className="flex items-center justify-center gap-3">{item.name}<span className="text-sm font-extralight text-zinc-600 dark:text-zinc-400">R${item.price}</span></p>
                                    </label>
                                </li>
                            ))}
                        </ul>
                        {!childrenForm && (
                            <>
                                <button
                                    type="button"
                                    className={`my-3 mx-auto pointer-events-auto flex items-center justify-center gap-1 rounded-full py-1 px-2 cursor-pointer bg-primary text-[#161a21]`}
                                    onClick={() => setOpenCreateItemForm(true)}
                                >
                                    <IoIosAddCircle className="w-6 h-6" />
                                    Criar novo item
                                </button>
                                {openCreateItemForm && (
                                    <CreateMenuItemForm
                                        onClose={() => setOpenCreateItemForm(false)}
                                        childrenForm={true}
                                    />
                                )}
                            </>
                        )}
                    </div>
                </div>
            }
        </UpdateDataForm>
    );
};