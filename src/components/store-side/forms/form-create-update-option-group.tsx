import { IoIosAddCircle, IoIosArrowDown } from "react-icons/io";
import { UpdateDataForm } from "./deafult/form-update-data"
import { useForm } from "react-hook-form";
import { OptionGroup, Option, MenuItem } from "../../../types/types-menu.d";
import { useEffect, useState } from "react";
import { useManageMenu } from "../../../context/manage-menu/manage-menu-context";

export const CreateOptionGroupForm = ({
    onClose,
    error,
    menuItemId
}: {
    onClose: () => void;
    error?: string;
    menuItemId?: number;
}) => {

    const {
        menuItems,
        options,
        createOptionGroup
    } = useManageMenu();

    const [openArrayOptions, setOpenArrayOptions] = useState(false);
    const [openArrayItems, setOpenArrayItems] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setValue,
        watch
    } = useForm<OptionGroup>({
        defaultValues: {
            maxSelectableOptions: 0,
            isRequired: false,
            optionIds: [],
            menuItemIds: [],
        }
    });

    const isRequired = watch("isRequired");
    const selectedOptionIds = watch("optionIds", []);
    const selectedItems = watch("menuItemIds", []);

    console.log(selectedOptionIds)
    console.log(isRequired)

    useEffect(() => {
        if ((selectedOptionIds?.length || 0) < 1) {
            setValue("maxSelectableOptions", 0);
        }
    }, [selectedOptionIds, setValue]);

    const handleCheckboxOptionsChange = (optionId: number, isChecked: boolean) => {
        const currentOptions = selectedOptionIds ?? [];

        // if (currentOptions.length === 0) {
        //     setValue("maxSelectableOptions", 0);
        // }

        if (isChecked) {
            setValue("optionIds", [...currentOptions, optionId]);
        } else {
            setValue("optionIds", currentOptions.filter(id => id !== optionId) || []);
        }
    };
    const handleCheckboxItemsChange = (itemId: number, isChecked: boolean) => {
        const currentItems = selectedItems || [];
        if (isChecked) {
            setValue("menuItemIds", [...currentItems, itemId]);
        } else {
            setValue("menuItemIds", currentItems.filter(id => id !== itemId));
        }
    };

    const handleFormSubmit = async (data: OptionGroup) => {
        console.log(data)
        try {
            createOptionGroup(data);
            reset();
            setSuccessMessage("Item criado com sucesso!");
        } catch (error) {
            console.error("Erro ao criar item:", error);
        }
    };

    return (
        <UpdateDataForm
            onClose={onClose}
            formIcon={<IoIosAddCircle />}
            title="Criar Grupo de adicionais"
            successMessage={successMessage}
            textButtonSubmit="Criar"
            submitFunction={handleSubmit(handleFormSubmit)}
            isLoadingSubmit={isSubmitting}
        >
            <div className="flex flex-col items-start justify-center relative">
                <label htmlFor="title" className="text-md ml-2">
                    Nome
                    {errors.title && (
                        <span className="span-error">
                            {errors.title.message?.toString()}
                        </span>
                    )}
                </label>
                <input
                    type="text"
                    id="name"
                    placeholder="Nome da categoria"
                    className={`input ${errors.title ? " input-error" : ""}`}
                    {...register("title", {
                        required: "Obrigatório",
                        minLength: {
                            value: 1,
                            message: "Digite uma quantidade válida",
                        },
                    })}
                />
                <div className="mt-6 flex">
                    <p className="text-md ml-2 ">É obrigatório?</p>
                    <div className="flex gap-6 ml-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                value="true"
                                checked={isRequired === true}
                                onChange={() => setValue("isRequired", true)}
                                className="accent-primary"
                            />
                            <span>Sim</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                value="false"
                                checked={isRequired === false}
                                onChange={() => setValue("isRequired", false)}
                                className="accent-primary"
                            />
                            <span>Não</span>
                        </label>
                    </div>
                    {errors.isRequired && (
                        <span className="text-red-500 text-sm">Obrigatório escolher uma opção</span>
                    )}
                </div>
                <label htmlFor="maxSelectable" className="text-md ml-2 mt-6">
                    Quantidade máxima selecionável
                </label>
                <input
                    type="number"
                    id="maxSelectable"
                    {...register('maxSelectableOptions', {
                        required: 'Defina a quantidade máxima',
                        valueAsNumber: true,
                        min: {
                            value: 1,
                            message: 'O mínimo é 1',
                        },
                        validate: {
                            isInteger: (value) =>
                                Number.isInteger(value) || 'Deve ser um número inteiro',
                            maxSelected: (value) => {
                                const maxAllowed = selectedOptionIds?.length || 0;

                                if (value > maxAllowed) {
                                    return `Máximo permitido: ${maxAllowed}`;
                                }
                                return true;
                            },
                        },
                    })}
                    style={{ width: '100px' }}
                    className={`${(selectedOptionIds?.length ?? 0) < 1 ? 'input-disable' : 'input'}  ${errors.maxSelectableOptions ? 'input-error' : ''} w-36`}
                    min={1}
                    placeholder="Ex: 2"
                    disabled={(selectedOptionIds?.length ?? 0) < 1}
                />
                {errors.maxSelectableOptions && (
                    <span className="text-red-500">{errors.maxSelectableOptions.message}</span>
                )}
                {options && options.length > 0 && (
                    <div className="w-full bg-zinc-300 dark:bg-[#161a21] border rounded-2xl border-zinc-400 flex flex-col items-center mt-4">
                        <button
                            type="button"
                            className="w-full flex items-center justify-center px-8 gap-2 my-2 cursor-pointer hover:scale-103 transition-all duration-300"
                            onClick={() => setOpenArrayOptions(!openArrayOptions)}
                        >
                            <IoIosArrowDown className={`${openArrayOptions ? 'rotate-180' : ''} transition-all duration-300`} />
                            <h4>Adicionais ({(selectedOptionIds ?? []).length}/{options.length})</h4>
                        </button>
                        <div className={`${openArrayOptions ? 'opacity-100 mt-3 pointer-events-auto' : 'opacity-0 max-h-0 pointer-events-none'} transition-all duration-300 ease-in-out`}>
                            <p className="text-center text-zinc-600 dark:text-zinc-400 font-extralight text-sm mb-2 mx-3">
                                Você já pode colocar os opcionais no novo grupo de opções:
                            </p>
                            <ul className="flex flex-col gap-2 mb-4">
                                {options.map((option: Option) => (
                                    <li key={option.id}>
                                        <label className="w-full flex items-start px-6 py-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={selectedOptionIds?.includes(option.id)}
                                                onChange={(e) => handleCheckboxOptionsChange(Number(option.id), e.target.checked)}
                                                className="flex items-center justify-center peer appearance-none w-5 h-5 min-w-[20px] min-h-[20px] rounded-full border border-black dark:border-white checked:bg-primary  checked:border-none mr-2 relative cursor-pointer before:content-['✔'] before:absolute before:text-[#161a21] before:text-[12px] before:opacity-0 checked:before:opacity-100"
                                            />
                                            <p className="flex items-center justify-center gap-3">{option.name}<span className="text-sm font-extralight text-zinc-600 dark:text-zinc-400">R${option.additionalPrice}</span></p>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
                {menuItems.length > 0 &&
                    <div className="w-full bg-zinc-300 dark:bg-[#161a21] border rounded-2xl border-zinc-400 flex flex-col items-center justify-center mt-4 pt-2">
                        <button
                            type="button"
                            className="w-full flex items-center justify-center px-8 gap-2 rounded-2xl cursor-pointer mb-2 hover:scale-103 transition-all duration-300"
                            onClick={() => setOpenArrayItems(!openArrayItems)}
                            style={{ fontSize: '18px' }}
                        >
                            <IoIosArrowDown className={`${openArrayItems ? 'rotate-180' : ''} transition-all duration-300`} />
                            <h4>Itens ({(selectedItems ?? []).length}/{menuItems.length})</h4>
                        </button>
                        <div className={`${openArrayItems ? 'opacity-100 mt-3 pointer-events-auto' : 'opacity-0 max-h-0 pointer-events-none'} transition-all duration-300 ease-in-out`}>
                            <p className="text-center text-zinc-600 dark:text-zinc-400 font-extralight text-sm mb-2 mx-3">
                                Você pode inserir os novos opcionais nos itens abaixo:
                            </p>
                            <ul className="flex flex-col gap-2 mb-4">
                                {menuItems.map((item: MenuItem) => (
                                    <li key={item.id} className="">
                                        <label htmlFor={`item-${item.id}`} className="w-full flex items-center px-6 py-3 rounded-full cursor-pointer">
                                            <input
                                                type="checkbox"
                                                id={`item-${item.id}`}
                                                checked={selectedItems?.includes(Number(item.id))}
                                                onChange={(e) => handleCheckboxItemsChange(Number(item.id), e.target.checked)}
                                                className="flex items-center justify-center peer appearance-none w-5 h-5 min-w-[20px] min-h-[20px] rounded-full border border-black dark:border-white checked:bg-primary  checked:border-none mr-2 relative cursor-pointer before:content-['✔'] before:absolute before:text-[#161a21] before:text-[12px] before:opacity-0 checked:before:opacity-100"
                                            />
                                            <p className="flex items-center justify-center gap-3">{item.name}<span className="text-sm font-extralight text-zinc-600 dark:text-zinc-400">R${item.price}</span></p>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                }
            </div>
            {error && (
                <p className="text-error">{error}</p>
            )}
        </UpdateDataForm>
    )
}