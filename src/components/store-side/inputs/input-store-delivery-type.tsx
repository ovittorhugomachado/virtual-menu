import { InputDeliveryTypeProps } from "../../../types/types-input.d";

export const CheckboxDeliveryTypesInput = ({
    register,
}: InputDeliveryTypeProps) => {

    return (
        <div className="relative w-full max-w-105 flex flex-col gap-1">
            <span className="font-bold">Tipos de entrega:</span>
            <div className="flex gap-4 ml-6 text-gray-300">
                <input
                    type="checkbox"
                    id="delivery"
                    {...register("delivery")}
                />
                <label htmlFor="delivery">Delivery</label>
            </div>
            <div className="flex gap-4 ml-6 text-gray-300">
                <input
                    type="checkbox"
                    id="pickup"
                    {...register("pickup")}
                />
                <label htmlFor="pickup">Retirada</label>
            </div>
        </div>
    );
};