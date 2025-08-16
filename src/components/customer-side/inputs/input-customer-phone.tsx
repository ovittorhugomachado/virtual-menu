import { Controller } from "react-hook-form";
import { IMaskInput } from "react-imask"
import { InputCustomerPhoneNumberProps } from "../../../types/types-input.d"

export const InputCustomerPhoneNumber = ({
    backgroundColor,
    errors,
    control,
    initialValues = {},
}: InputCustomerPhoneNumberProps) => {
   
    return (
        <Controller
            name="customerPhone"
            control={control}
            defaultValue={initialValues.customerPhone || ""}
            rules={{
                required: "Obrigatório",
                pattern: {
                    value: /^\(\d{2}\) \d{5}-\d{4}$/,
                    message: "(99) 99999-9999",
                },
            }}
            render={({ field, fieldState }) => (
                <>
                    <label htmlFor="phoneNumber" className="w-full text-sm font-medium pl-2 flex flex-col">
                        Celular *
                        {fieldState.error && (
                            <span className="span-error pr-4">
                                {fieldState.error.message}
                            </span>
                        )}
                    </label>
                    <IMaskInput
                        {...field}
                        mask="(00) 00000-0000"
                        placeholder="(99) 99999-9999"
                        className={`w-full text-sm border border-zinc-300 rounded-md mb-2 px-3 py-2 input-store ${errors.customerPhone ? " border-red-500 input-error-store" : ""} ${backgroundColor === 'white' ? 'bg-white text-black autofill:caret-lime-700' : 'bg-black text-white'}`}
                        onAccept={(value) => field.onChange(value)}
                    />
                </>
            )}
        />
    )
};