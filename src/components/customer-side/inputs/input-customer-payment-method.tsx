import { InputPaymentMethodProps } from "../../../types/types-input.d";

export const RadioOrderPaymentMethodInput = ({
    register,
    errors,
    clearErrors,
}: InputPaymentMethodProps) => {

    return (
        <div className="relative w-full gap-4 mt-2 flex items-start mx-auto translate-y-1.5">
            {errors.paymentMethod && (
                <span className="text-red-500 text-sm font-normal text-right mr-3 absolute -translate-y-4">
                    {errors.paymentMethod.message?.toString()}
                </span>
            )}
            <label className="font-bold">
                Pagamento:
            </label>
            <div className="flex flex-col gap-2 font-extralight">
                <div className="flex gap-1.5">
                    <input
                        type="radio"
                        id="cartao"
                        value={"cartao"}
                        {...register("paymentMethod", {
                            required: "Obrigatório"
                        })}
                        onChange={() => {
                            clearErrors("paymentMethod");
                        }}
                    />
                    <label htmlFor="cartao">Cartão</label>
                </div>
                <div className="flex gap-1.5">
                    <input
                        type="radio"
                        id="dinheiro"
                        value={"dinheiro"}
                        {...register("paymentMethod", {
                            required: "Obrigatório"
                        })}
                        onChange={() => {
                            clearErrors("paymentMethod");
                        }}
                    />
                    <label htmlFor="dinheiro">Dinheiro</label>
                </div>
                <div className="flex gap-1.5">
                    <input
                        type="radio"
                        id="pix"
                        value={"pix"}
                        {...register("paymentMethod", {
                            required: "Obrigatório"
                        })}
                        onChange={() => {
                            clearErrors("paymentMethod");
                        }}
                    />
                    <label htmlFor="pix">Pix</label>
                </div>
            </div>
        </div>
    );
};