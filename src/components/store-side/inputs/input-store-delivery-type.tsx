import { InputDeliveryTypeProps } from "../../../types/types-input.d";

export const CheckboxDeliveryTypesInput = ({
    register,
    errors,
}: InputDeliveryTypeProps) => (
    <div className="flex flex-col gap-1">
        <label className="w-full font-medium ml-2 mt-2 flex flex-col relative">Tipos de entrega:
            <span className="span-error">{errors.delivery?.message || errors.pickup?.message}</span>
            </label>
        <div className="flex gap-4 ml-4 dark:text-gray-300">
            <input
                type="checkbox"
                id="delivery"
                className="flex items-center justify-center peer appearance-none w-5 h-5 min-w-[20px] min-h-[20px] rounded-full border border-black dark:border-white checked:bg-primary  checked:border-none  mr-2 relative cursor-pointer before:content-['✔'] before:absolute before:text-[#161a21] before:text-[12px] before:opacity-0 checked:before:opacity-100"
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
                className="flex items-center justify-center peer appearance-none w-5 h-5 min-w-[20px] min-h-[20px] rounded-full border border-black dark:border-white checked:bg-primary  checked:border-none mr-2 relative cursor-pointer before:content-['✔'] before:absolute before:text-[#161a21] before:text-[12px] before:opacity-0 checked:before:opacity-100"
                {...register("pickup", {
                    validate: (value, formValues) =>
                        value || formValues.delivery || "obrigatório"
                })}
            />
            <label htmlFor="pickup">Retirada</label>
        </div>
    </div>
);