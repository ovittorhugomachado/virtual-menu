import { useState } from "react";
import { InputPasswordProps } from "../../../types/types-input.d"
import { IoEye, IoEyeOff } from "react-icons/io5";

export const InputPassword = ({
    register,
    errors,
    clearErrors,
    initialValues = {},
}: InputPasswordProps) => {

    const [showPassword, setShowPassword] = useState(false);

    return (
            <div className="relative w-full max-w-105 flex flex-col gap-1">
                <label
                    htmlFor="password"
                    className="w-full font-medium ml-2 mt-2 flex flex-col relative"
                >
                    Senha
                    {errors?.password && (
                        <span className="span-error">
                            {errors.password.message?.toString()}
                        </span>
                    )}
                </label>
                <div className="w-full flex flex-col gap-1 relative">
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        className={`input ${errors.password ? " input-error" : ""}`}
                        placeholder="Digite sua senha"
                        defaultValue={initialValues.password || ""}
                        {...register("password", {
                            required: "Obrigatório",
                            onChange: (e) => {
                                if (e.target.value.length > 2) {
                                    clearErrors("password");
                                }
                            }
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
            </div>
    );
};