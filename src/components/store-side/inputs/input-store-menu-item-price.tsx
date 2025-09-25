import { InputMenuItemPriceProps } from "../../../types/types-input.d";

export const InputPrice = ({
    register,
    errors,
    clearErrors,
}: InputMenuItemPriceProps) => {

    return (
        <div className="relative w-full max-w-105 flex flex-col gap-1">
            <label
                htmlFor="price"
                className="w-full font-medium ml-2 mt-2 flex flex-col relative"
            >
                Preço *
                {errors.price && (
                    <span className="span-error">
                        {errors.price.message?.toString()}
                    </span>
                )}
            </label>
            <div className="relative w-full">
                <span className="absolute left-3 top-0 translate-y-2/6 text-zinc-500 pointer-events-none">
                    R$
                </span>
                <input
                    id="price"
                    type="text"
                    inputMode="decimal"
                    pattern="[0-9,]*"
                    style={{ paddingLeft: "2.5rem" }}
                    className={`input ${errors.price ? " input-error" : ""}`}
                    placeholder="Preço"
                    {...register("price", {
                        required: "Obrigatório",
                        minLength: {
                            value: 1,
                            message: "Obrigatório",
                        },
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                            let raw = e.target.value.replace(/[^\d]/g, '');
                            if (raw === "") raw = "000";

                            while (raw.length < 3) raw = "0" + raw;

                            const reais = raw.slice(0, raw.length - 2);
                            const centavos = raw.slice(-2);
                            const formatted = `${parseInt(reais, 10)},${centavos}`;

                            e.target.value = formatted; 
                            
                            if (formatted.length > 0) {
                                clearErrors("price");
                            }
                        },
                    })}
                />
            </div>
        </div>
    );
};