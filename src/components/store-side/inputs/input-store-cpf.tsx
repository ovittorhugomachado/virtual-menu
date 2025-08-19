import { Controller } from "react-hook-form";
import { IMaskInput } from "react-imask"
import { InputCPFProps } from "../../../types/types-input.d";

export const InputCPF = ({
    control,
    initialValues = {},
    hasTriedToSubmit = false,
    clearErrors,
    onKeyDown
}: InputCPFProps) => {

    return (
        <div className="relative w-full max-w-105 flex flex-col gap-1">
            <Controller
                name="cpf"
                control={control}
                defaultValue={initialValues.cpf || ""}
                rules={{
                    required: "Obrigatório",
                    validate: (value) => {
                        const digits = value?.replace(/\D/g, '') || '';
                        if (digits.length > 0 && digits.length < 11) {
                            return "Inválido";
                        }
                        return true;
                    },
                }}
                render={({ field, fieldState }) => (
                    <>
                        <label
                            htmlFor="cpf"
                            className="w-full font-medium ml-2 mt-2 flex flex-col relative"
                        >
                            CPF *
                            {hasTriedToSubmit && fieldState.error && (
                                <span className="span-error">
                                    {fieldState.error.message}
                                </span>
                            )}
                        </label>
                        <IMaskInput
                            {...field}
                            mask="000.000.000-00"
                            placeholder="000.000.000-00"
                            onKeyDown={onKeyDown}
                            className={`input ${fieldState.error ? " input-error" : ""}`}
                            onAccept={(value) => {
                                field.onChange(value);
                                if (clearErrors) {
                                    clearErrors("cpf");
                                }
                            }}
                        />
                    </>
                )}
            />
        </div>
    );
};