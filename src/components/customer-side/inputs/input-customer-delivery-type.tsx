import { InputDeliveryTypeOfOrderProps } from "../../../types/types-input.d";


export const RadioOrderDeliveryTypesInput = ({
    register,
    errors,
    clearErrors,
}: InputDeliveryTypeOfOrderProps) => {

    return (
        <div className="w-full mt-2 gap-4 flex items-start mx-auto translate-y-1.5">
            {errors.deliveryType && (
                <span className="absolute -translate-y-4.5 span-error">
                    {errors.deliveryType.message?.toString()}
                </span>
            )}
            <label className="font-bold">
                Tipo de entrega:
            </label>
            <div className="flex flex-col gap-2 font-extralight">
                <div className="flex gap-1.5">
                    <input
                        type="radio"
                        id="delivery"
                        value={"delivery"}
                        {...register("deliveryType", {
                            required: "Obrigatório"
                        })}
                        onChange={() => {
                            clearErrors("deliveryType");
                        }}
                    />
                    <label htmlFor="delivery">Delivery</label>
                </div>
                <div className="flex gap-1.5">
                    <input
                        type="radio"
                        id="pickup"
                        value={"pickup"}
                        {...register("deliveryType", {
                            required: "Obrigatório"
                        })}
                        onChange={() => {
                            clearErrors("deliveryType");
                        }}
                    />
                    <label htmlFor="pickup">Retirada</label>
                </div>
            </div>
        </div>
    );
};