import { InputOptionPriceProps } from "../../../types/types-input.d";
import { useEffect, useState } from "react";

export const InputPrice = ({
    register,
    errors,
    initialValues,
    value,
    index,
}: InputOptionPriceProps) => {

    const DECIMAL_SIZE = 2;

    const [displayValue, setDisplayValue] = useState(() => {
        if (
            initialValues?.additionalPrice !== undefined &&
            !isNaN(Number(initialValues.additionalPrice))
        ) {
            return Number(initialValues.additionalPrice).toFixed(2).replace(".", ",");
        }
        return "0,00";
    });

    useEffect(() => {
        if (value !== undefined && !isNaN(Number(value))) {
            const num = Number(value);
            setDisplayValue(num.toFixed(2).replace('.', ','));
        }
    }, [value]);

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let raw = event.target.value.replace(/[^\d]/g, '');
        if (raw === "") raw = "000";

        while (raw.length < 3) raw = "0" + raw;

        const reais = raw.slice(0, raw.length - DECIMAL_SIZE);
        const centavos = raw.slice(-DECIMAL_SIZE);
        const formatted = `${parseInt(reais, 10)},${centavos}`;

        setDisplayValue(formatted);
    };

    return (
        <div className="relative w-full max-w-105 flex flex-col gap-1">
            <label
                htmlFor={`price-${index}`}
                className="w-full font-medium ml-2 mt-2 flex flex-col relative"
            >
                Preço *
                {errors?.additionalPrice && (
                    <span className="span-error">
                        {errors.additionalPrice.message?.toString()}
                    </span>
                )}
            </label>
            <div className="relative w-full">
                <span className="absolute left-3 top-0 translate-y-2/6 text-zinc-500 pointer-events-none z-10">
                    R$
                </span>
                <input
                    type="text"
                    {...register(`options.${index}.additionalPrice`, {
                        required: "Obrigatório",
                        min: {
                            value: 0,
                            message: "Valor mínimo é 0",
                        },
                    })}
                    value={displayValue}
                    onChange={handleOnChange}
                    style={{ paddingLeft: "2.5rem" }}
                    className={`input ${errors?.additionalPrice ? " input-error" : ""}`}
                    placeholder="0,00"
                    inputMode="numeric"
                />
            </div>
        </div>
    );
};