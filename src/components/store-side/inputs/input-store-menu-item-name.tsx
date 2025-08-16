import { InputMenuItemNameProps } from "../../../types/types-input.d";

export const InputName = ({
    register,
    errors,
    clearErrors,
    initialValues = {},
}: InputMenuItemNameProps) => {
    
    return (
        <>
            <label
                htmlFor="name"
                className="w-full font-medium ml-2 mt-2 flex flex-col relative"
            >
                Nome *
                {errors.name && (
                    <span className="span-error">
                        {errors.name.message?.toString()}
                    </span>
                )}
            </label>
            <input
                id="name"
                type="text"
                className={`input ${errors.name ? " input-error" : ""}`}
                placeholder="Nome"
                defaultValue={initialValues.name || ""}
                {...register("name", {
                    required: "Nome obrigatório",
                    minLength: {
                        value: 2,
                        message: "Nome obrigatório",
                    },
                    onChange: (e) => {
                        if (e.target.value.length > 4) {
                            clearErrors("name");
                        }
                    },
                })}
            />
        </>
    );
};