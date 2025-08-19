import { InputDeliveryTypeProps } from "../../../types/types-input.d";

export const CheckboxDeliveryTypesInput = ({
    register,
}: InputDeliveryTypeProps) => {

    return (
        <div className="relative w-full max-w-105 flex flex-col gap-1">
            <span className="font-bold">Tipos de entrega:</span>
            <label htmlFor="delivery">Delivery</label>
            <input
                type="checkbox"
                id="delivery"
                {...register("delivery")}
            />
            <label htmlFor="pickup">Retirada</label>
            <input
                type="checkbox"
                id="pickup"
                {...register("pickup")}
            />
        </div>
    );
};