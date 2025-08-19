import { InputEmailProps } from "../../../types/types-input.d";

export const InputEmailRegister = ({
    register,
    errors,
    clearErrors,
    initialValues = {},
    validate,
    onKeyDown,
}: InputEmailProps & { validate?: (email: string) => Promise<string | true> }) => {
    console.log(errors.email)
    return (
        <div className="relative w-full max-w-105 flex flex-col gap-1">
            <label
                htmlFor="email"
                className="w-full font-medium ml-2 mt-2 flex flex-col relative"
            >
                Email
                {errors.email && (
                    <span className="span-error">
                        {errors.email.message}
                    </span>
                )}
            </label>
            <input
                id="email"
                type="email"
                onKeyDown={onKeyDown}
                className={`input ${errors.email ? " input-error" : ""}`}
                placeholder="Digite seu email"
                defaultValue={initialValues.email || ""}
                {...register("email", {
                    required: "Campo obrigatório",
                    pattern: {
                        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: "Digite um e-mail válido",
                    },
                    validate,
                    onChange: (e) => {
                        if (e.target.value.length > 2) {
                            clearErrors("email");
                        }
                    }
                })}
            />
            {errors.email?.message?.length && errors.email?.message?.length > 25 && (
                <span className="absolute -bottom-6 w-full text-center mx-auto text-red-500">
                    {errors.email.message}
                </span>
            )}
        </div>
    );
};