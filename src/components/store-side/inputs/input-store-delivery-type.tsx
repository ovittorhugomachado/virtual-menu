import { InputDeliveryTypeProps } from "../../../types/types-input.d";

export const CheckboxDeliveryTypesInput = ({
    register,
}: InputDeliveryTypeProps) => {

    return (
        <div className="gap-4 mt-2 flex items-center mx-auto">
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