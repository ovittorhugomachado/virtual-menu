import { Controller } from "react-hook-form";
import { IMaskInput } from "react-imask"
import { InputCNPJProps } from "../../../types/types-input.d";

export const InputCNPJ = ({
    control,
    initialValues = {},
}: InputCNPJProps) => {

    return (
        <Controller
            name="cnpj"
            control={control}
            defaultValue={initialValues.cnpj || ""}
            rules={{
                validate: (value) => {
                    const digits = value?.replace(/\D/g, '') || '';
                    if (digits.length > 0 && digits.length < 14) {
                        return "Digite os 14 dígitos do CNPJ";
                    }
                    return true;
                },
            }}
            render={({ field, fieldState }) => (
                <>
                    <label
                        htmlFor="cnpj"
                        className="w-full font-medium ml-2 mt-2 flex flex-col relative"
                    >
                        CNPJ
                        {fieldState.error && (
                            <span className="span-error">
                                {fieldState.error.message}
                            </span>
                        )}
                    </label>
                    <IMaskInput
                        {...field}
                        mask="00.000.000/0000-00"
                        placeholder="00.000.000/0000-00"
                        className={`input ${fieldState.error ? " input-error" : ""}`}
                        onAccept={(value) => field.onChange(value)}
                    />
                </>
            )}
        />
    );
};