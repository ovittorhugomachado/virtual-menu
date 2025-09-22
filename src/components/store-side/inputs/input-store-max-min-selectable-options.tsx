import { InptuMaxMinOptionsProps } from "../../../types/types-input.d";

export const MaxMinSelectableOptions = ({
    isRequired,
    quantityOptions,
    register,
    errors,
}: InptuMaxMinOptionsProps) => {

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
                        {...register("minOptions", {
                            setValueAs: v => (v === '' || v === undefined || v === null) ? null : Number(v),
                            validate: (value) => {
                                if (isRequired && quantityOptions.length > 1) {
                                    if (value === undefined || value === null) {
                                        return "Defina a quantidade mínima";
                                    }
                                    if (typeof value !== "number" || isNaN(value)) {
                                        return "A quantidade mínima deve ser um número";
                                    }
                                    if (value < 1) {
                                        return "O valor mínimo permitido é 1";
                                    }
                                    if (value > quantityOptions.length) {
                                        return `O valor máximo permitido é ${quantityOptions.length}`;
                                    }
                                }
                                return true;
                            }
                        })}
                        style={{ width: '100px' }}
                        className={`${quantityOptions.length <= 1 ? 'input-disable' : 'input'}  ${errors.minOptions ? 'input-error' : ''} w-36`}
                        min={0}
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
                        {...register("maxOptions", {
                            setValueAs: v => (v === '' || v === undefined || v === null) ? null : Number(v),
                            validate: (value) => {
                                const optionRequired = isRequired;
                                const shouldBeRequired = quantityOptions.length > 1;
                                if (!shouldBeRequired || optionRequired == false) {
                                    return true;
                                }
                                if (!value && value !== 0) {
                                    return "Defina a quantidade máxima";
                                }
                                if (isNaN(value)) {
                                    return "A quantidade máxima deve ser um número";
                                }
                                if (value < 1) {
                                    return "O valor mínimo permitido é 2";
                                }
                                if (value > quantityOptions.length) {
                                    return `O valor máximo permitido é ${quantityOptions.length}`;
                                } return true;
                            }
                        })}
                        style={{ width: '100px' }}
                        className={`${quantityOptions.length <= 1 ? 'input-disable' : 'input'} ${errors.maxOptions ? 'input-error' : ''} w-36`}
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
};