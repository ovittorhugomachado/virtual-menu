import { useState } from "react";
import { IoEye, IoEyeOff, IoCheckmarkCircleOutline, IoCheckmarkCircleSharp } from "react-icons/io5";
import { InputPasswordProps } from "../../../types/types-input.d";

export const InputPasswordRegister = ({ register, errors, watch }: InputPasswordProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const password = watch("password") || '';

    const requirements = [
        { id: 1, text: "8 caracteres", regex: /.{8,}/ },
        { id: 2, text: "Letra maiúscula", regex: /[A-Z]/ },
        { id: 3, text: "Letra minúscula", regex: /[a-z]/ },
        { id: 4, text: "Número", regex: /\d/ },
        { id: 5, text: "Caractere especial", regex: /[\W_]/ }
    ];

    return (
        <div className="w-full flex flex-col gap-1">
            <label
                htmlFor="password"
                className="w-full font-medium ml-2 mt-2 flex flex-col relative"
            >
                Senha *
                {errors?.password && (
                    <span className="span-error">
                        {errors.password.message?.toString()}
                    </span>
                )}
            </label>
            <div className="relative flex items-center">
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="crie sua senha"
                    className={`input ${errors.password ? " input-error" : ""}`}
                    {...register("password", {
                        required: "Campo obrigatório",
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                            message: "Digite uma senha válida",
                        },
                    })}
                />

                <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                    {showPassword ? <IoEyeOff size={18} /> : <IoEye size={18} />}
                </button>
            </div>

            <div className="mt-4 text-zinc-500">
                {requirements.map((req) => (
                    <div key={req.id} className="flex items-center">
                        {req.regex.test(password) ? (
                            <IoCheckmarkCircleOutline className="w-4 h-4 mr-1 text-green-700" />
                        ) : (
                            <IoCheckmarkCircleSharp className="w-4 h-4 mr-1 text-zinc-600" />
                        )}
                        {req.text}
                    </div>
                ))}
            </div>
        </div>
    );
};