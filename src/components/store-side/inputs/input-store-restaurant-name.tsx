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
                {errors.user?.restaurantName && (
                    <span className="span-error">
                        {errors.user?.restaurantName.message?.toString()}
                    </span>
                )}
            </label>
            <input
                id="restaurantName"
                type="text"
                onKeyDown={onKeyDown}
                className={`input ${errors.user?.restaurantName ? " input-error" : ""}`}
                placeholder="Restaurante"
                defaultValue={initialValues.user?.restaurantName || ""}
                {...register("user.restaurantName", {
                    required: "Obrigatório",
                    minLength: {
                        value: 2,
                        message: "Obrigatório"
                    },
                    onChange: (e) => {
                        if (e.target.value.length > 4) {
                            clearErrors("user.restaurantName");
                        }
                    }
                })}
            />
        </div>
    );
};