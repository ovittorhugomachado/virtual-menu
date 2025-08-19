import { InputRestaurantNameProps } from "../../../types/types-input.d";

export const InputRestaurantName = ({
    register, 
    errors,
    clearErrors,
    initialValues = {}, 
    onKeyDown
}: InputRestaurantNameProps) => {

    return (
        <div className="relative w-full max-w-105 flex flex-col gap-1">
            <label
                htmlFor="restaurantName"
                className="w-full font-medium ml-2 mt-2 flex flex-col relative"
            >
                Nome do Restaurante *
                {errors.restaurantName && (
                    <span className="span-error">
                        {errors.restaurantName.message?.toString()}
                    </span>
                )}
            </label>
            <input
                id="restaurantName"
                type="text"
                onKeyDown={onKeyDown}
                className={`input ${errors.restaurantName ? " input-error" : ""}`}
                placeholder="Restaurante"
                defaultValue={initialValues.restaurantName || ""}
                {...register("restaurantName", {
                    required: "Obrigatório",
                    minLength: {
                        value: 2,
                        message: "Obrigatório"
                    },
                    onChange: (e) => {
                        if (e.target.value.length > 4) {
                            clearErrors("restaurantName");
                        }
                    }
                })}
            />
        </div>
    );
};