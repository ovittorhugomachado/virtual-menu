import { InputAddressProps } from "../../../types/types-input.d";

export const InputAddress = ({
    register, 
    errors,
    clearErrors,
    initialValues = {}, 
}: InputAddressProps) => {

    return (
        <>
            <label
                htmlFor="address"
                className="w-full font-medium ml-2 mt-2 flex flex-col relative"
            >
                Endereço
                {errors.address && (
                    <span className="span-error">
                        {errors.address.message?.toString()}
                    </span>
                )}
            </label>
            <input
                id="address"
                type="text"
                className={`input ${errors.address ? " input-error" : ""}`}
                placeholder="Endereço"
                defaultValue={initialValues.address || ""}
                {...register("address", {
                    minLength: {
                        value: 2,
                        message: "Campo obrigatório"
                    },
                    onChange: (e) => {
                        if (e.target.value.length > 4) {
                            clearErrors("address");
                        }
                    }
                })}
            />
        </>
    );
};