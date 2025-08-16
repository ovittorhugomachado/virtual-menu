import { Controller } from "react-hook-form";
import { IMaskInput } from "react-imask"
import { InputPhoneNumberProps } from "../../../types/types-input.d"

export const InputPhoneNumber = ({
    control,
    initialValues = {},
}: InputPhoneNumberProps ) => {
    
    return (
        <Controller
            name="phoneNumber"
            control={control}
            defaultValue={initialValues.phoneNumber || ""}
            rules={{
                required: "Obrigatório",
                pattern: {
                    value: /^\(\d{2}\) \d{5}-\d{4}$/,
                    message: "Obrigatório",
                },
            }}
            render={({ field, fieldState }) => (
                <>
                    <label
                        htmlFor="phoneNumber"
                        className="w-full font-medium ml-2 mt-2 flex flex-col relative"
                    >
                        Celular *
                        {fieldState.error && (
                            <span className="span-error">
                                {fieldState.error.message}
                            </span>
                        )}
                    </label>
                    <IMaskInput
                        {...field}
                        mask="(00) 00000-0000"
                        placeholder="(99) 99999-9999"
                        className={`input ${fieldState.error ? " input-error" : ""}`}
                        onAccept={(value) => field.onChange(value)}
                    />
                </>
            )}
        />
    );
};