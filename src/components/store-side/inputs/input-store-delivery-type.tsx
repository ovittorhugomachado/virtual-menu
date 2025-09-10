import { InputDeliveryTypeProps } from "../../../types/types-input.d";

export const CheckboxDeliveryTypesInput = ({
    register,
    errors,
}: InputDeliveryTypeProps) => (
    <div className="flex flex-col gap-1">
        <span className="font-bold flex">Tipos de entrega:  {<span className="flex-1 text-end text-red-600">{errors.delivery?.message || errors.pickup?.message}</span>}</span>
        <div className="flex gap-4 ml-4 dark:text-gray-300">
            <input
                type="checkbox"
                id="delivery"
                className="accent-primary"
                {...register("delivery", {
                    validate: (value, formValues) =>
                        value || formValues.pickup || "obrigatório"
                })}
            />
            <label htmlFor="delivery">Delivery</label>
        </div>
        <div className="flex gap-4 ml-4 dark:text-gray-300">
            <input
                type="checkbox"
                id="pickup"
                className="accent-primary"
                {...register("pickup", {
                    validate: (value, formValues) =>
                        value || formValues.delivery || "obrigatório"
                })}
            />
            <label htmlFor="pickup">Retirada</label>
        </div>
    </div>
);