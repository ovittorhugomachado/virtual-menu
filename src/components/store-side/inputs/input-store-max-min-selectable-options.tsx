import { InptuMaxMinOptionsProps } from "../../../types/types-input.d";

export const MaxMinSelectableOptions = ({
    isRequired,
    quantityOptions,
    register,
    errors,
}: InptuMaxMinOptionsProps) => {

    console.log(quantityOptions.length)
    return (
        <>
            <p className="text-md ml-2">Quantas opções podem ser selecionadas?</p>
            <div className="gap-3 mb-3">
                <div>
                    <label htmlFor="minSelectable" className="text-md ml-2 mt-6">
                        Mínimo
                    </label>
                    <input
                        type="number"
                        id="minSelectable"
                        {...register("minOptions", isRequired ? {
                            required: "Defina a quantidade mínima",
                            valueAsNumber: true,
                            min: {
                                value: 0,
                                message: "O mínimo é 0",
                            },
                            max: {
                                value: quantityOptions.length,
                                message: `Máximo permitido: ${quantityOptions.length}`,
                            },
                            validate: (value) => Number.isInteger(value) || "Deve ser um número inteiro",
                        } : {})}
                        style={{ width: '100px' }}
                        className={`${quantityOptions.length <= 1 ? 'input-disable' : 'input'}  ${errors.minOptions ? 'input-error' : ''} w-36`}
                        min={1}
                        placeholder="Ex: 1"
                        disabled={quantityOptions.length <= 1}
                    />
                    {errors.minOptions && (
                        <span style={{ position: "relative" }} className="span-error">{errors.minOptions.message}</span>
                    )}
                </div>
                <div>
                    <label htmlFor="maxSelectable" className="text-md ml-2 mt-6">
                        Máximo
                    </label>
                    <input
                        type="number"
                        id="maxSelectable"
                        {...register("maxOptions", isRequired ? {
                            required: "Defina a quantidade máxima",
                            valueAsNumber: true,
                            min: {
                                value: 1,
                                message: "O mínimo é 1",
                            },
                            max: {
                                value: quantityOptions.length,
                                message: `Máximo permitido: ${quantityOptions.length}`,
                            },
                            validate: {
                                isInteger: (value) => Number.isInteger(value) || "Deve ser um número inteiro",
                                minMaiorQueMax: (value, formValues) => {
                                    const min = formValues?.minOptions;
                                    if (min !== undefined && value < min) {
                                        return "O máximo não pode ser menor que o mínimo";
                                    }
                                    return true;
                                }
                            }
                        } : {})}
                        style={{ width: '100px' }}
                        className={`${quantityOptions.length <= 1 ? 'input-disable' : 'input'}  ${errors.maxOptions ? 'input-error' : ''} w-36`}
                        min={1}
                        placeholder="Ex: 2"
                        disabled={quantityOptions.length <= 1}
                    />
                    {errors.maxOptions && (
                        <span style={{ position: "relative" }} className="span-error">{errors.maxOptions.message}</span>
                    )}
                </div>
            </div>
        </>
    )
}