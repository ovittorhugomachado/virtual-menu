import { InputOwnersNameProps } from "../../../types/types-input.d";

export const InputOwnersName = ({
    register,
    errors,
    clearErrors,
    initialValues = {},
    onKeyDown
}: InputOwnersNameProps) => {
    
    return (
        <div className="relative w-full max-w-105 flex flex-col gap-1">
            <label
                htmlFor="ownersName"
                className="w-full font-medium ml-2 mt-2 flex flex-col relative"
            >
                Nome do Proprietário *
                {errors.ownersName && (
                    <span className="span-error">
                        {errors.ownersName.message?.toString()}
                    </span>
                )}
            </label>
            <input
                id="ownersName"
                type="text"
                onKeyDown={onKeyDown}
                className={`input ${errors.ownersName ? " input-error" : ""}`}
                placeholder="Proprietário"
                defaultValue={initialValues.ownersName || ""}
                {...register("ownersName", {
                    required: "Obrigatório",
                    minLength: {
                        value: 2,
                        message: "Obrigatório",
                    },
                    onChange: (e) => {
                        if (e.target.value.length > 4) {
                            clearErrors("ownersName");
                        }
                    },
                })}
            />
        </div>
    );
};