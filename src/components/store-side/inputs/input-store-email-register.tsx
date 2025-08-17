import { InputEmailProps } from "../../../types/types-input.d";

export const InputEmailRegister = ({
    register,
    errors,
    clearErrors,
    initialValues = {},
    validate, 
    onKeyDown,
}: InputEmailProps & { validate?: (email: string) => Promise<string | true> }) => {

    return (
        <div className="w-full max-w-105 flex flex-col gap-1">
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
                    validate, // aqui faz a busca na API
                    onChange: (e) => {
                        if (e.target.value.length > 2) {
                            clearErrors("email");
                        }
                    }
                })}
            />
        </div>
    );
};