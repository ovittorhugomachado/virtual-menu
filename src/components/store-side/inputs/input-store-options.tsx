import { IoIosCloseCircleOutline } from "react-icons/io";
import { InputOptionProps } from "../../../types/types-input.d";
import { InputPrice } from "./input-option-price";

export const InputOptions = ({
    options,
    onRemoveOption,
    register,
    errors,
    clearErrors,
    initialValues = {},
}: InputOptionProps) => {

    return (
        <>
            {(options ?? []).map((_, index) => (
                <div key={index} className="mb-4 pb-4">
                    <div className="relative inline">
                        <button
                            type="button"
                            className="absolute -right-9 top-[-7px] w-9 h-9 text-red-600 cursor-pointer"
                            onClick={() => onRemoveOption(index)}
                        >
                            <IoIosCloseCircleOutline className="w-full h-full" />
                        </button>
                        <p
                            className="inline bg-primary py-1 px-3 text-[#161a21] translate-y-1"
                            style={{ borderRadius: '12px 12px 12px 0' }}
                        >
                            Opção {index + 1}
                        </p>
                    </div>
                    <div className="border-l-2 border-l-primary pl-4 pt-2">
                        <label
                            htmlFor={`name-${index}`}
                            className="w-full font-medium ml-2 mt-2 flex flex-col relative"
                        >
                            Nome *
                            {errors.options?.[index]?.name && (
                                <span className="span-error">
                                    {errors.options[index]?.name?.message?.toString()}
                                </span>
                            )}
                        </label>
                        <input
                            id={`name-${index}`}
                            type="text"
                            className={`input ${errors.options?.[index]?.name ? " input-error" : ""}`}
                            placeholder={`Nome da opção ${index + 1}`}
                            defaultValue={initialValues.options?.[index]?.name || ""}
                            {...register(`options.${index}.name`, {
                                required: "Obrigatório",
                                minLength: {
                                    value: 2,
                                    message: "Mínimo de 2 caracteres",
                                },
                                onChange: (e) => {
                                    if (e.target.value.length > 1) {
                                        clearErrors(`options.${index}.name`);
                                    }
                                },
                            })}
                        />
                        <label htmlFor={`description-${index}`} className="ml-2 mt-2 flex justify-between relative">
                            Descrição
                        </label>
                        <textarea
                            {...register(`options.${index}.description`)}
                            className={`input h-32 mb-2.5 border rounded px-3 py-2${errors.options?.[index]?.description ? " border-red-500" : ""}`}
                            placeholder="Descrição"
                        />
                        <InputPrice
                            index={index}
                            register={register}
                            errors={errors.options?.[index] ?? {}}
                            clearErrors={() => clearErrors(`options.${index}.additionalPrice`)}
                            initialValues={{
                                additionalPrice: options[index]?.additionalPrice ?? initialValues.options?.[index]?.additionalPrice ?? 0
                            }}
                        />
                    </div>
                </div>
            ))}
        </>
    );
};