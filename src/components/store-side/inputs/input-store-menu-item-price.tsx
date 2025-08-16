import { InputMenuItemPriceProps } from "../../../types/types-input.d";

export const InputPrice = ({
    register,
    errors,
    clearErrors,
}: InputMenuItemPriceProps) => {
    
    return (
        <>
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
                        required: "Preço obrigatório",
                        minLength: {
                            value: 1,
                            message: "Preço obrigatório",
                        },
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                            e.target.value = e.target.value.replace(/[^0-9,]/g, "");
                            if (e.target.value.length > 0) {
                                clearErrors("price");
                            }
                        },
                    })}
                />
            </div>
        </>
    );
};