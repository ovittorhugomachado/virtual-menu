import { InputEmailProps } from "../../../types/types-input.d";

export const InputEmail = ({
    register,
    errors,
    clearErrors,
    initialValues = {},
}: InputEmailProps) => {

    return (
        <div className="relative w-full max-w-105 flex flex-col gap-1">
            <label
                htmlFor="email"
                className="w-full font-medium ml-2 mt-2 flex flex-col relative"
            >
                Email
                {errors.user?.email && (
                    <span className="span-error">
                        {errors.user?.email.message}
                    </span>
                )}
            </label>
            <input
                id="email"
                type="email"
                className={`input ${errors.user?.email ? " input-error" : ""}`}
                placeholder="Digite seu email"
                defaultValue={initialValues.user?.email || ""}
                {...register("user.email", {
                    required: "Obrigatório",
                    pattern: {
                        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: "Digite um e-mail válido",
                    },
                    onChange: (e) => {
                        if (e.target.value.length > 2) {
                            clearErrors("user.email");
                        }
                    }
                })}
            />
        </div>
    );
};