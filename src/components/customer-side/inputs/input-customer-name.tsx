import { InputCustomerNameProps } from "../../../types/types-input.d";

export const InputCustomerName = ({
    backgroundColor,
    register,
    errors,
    clearErrors,
    initialValues = {},
}: InputCustomerNameProps) => {
    
    return (
        <>
            <label htmlFor="name" className="w-full text-sm font-medium pl-2 flex flex-col">
                Nome *
                {errors.customerName && (
                    <span className="span-error pr-4">
                        {errors.customerName.message?.toString()}
                    </span>
                )}
            </label>
            <input
                id="name"
                type="text"
                className={`w-full text-sm border border-zinc-300 rounded-md mb-2 px-3 py-2 input-store ${errors.customerAddress ? " border-red-500 input-error-store" : ""} ${backgroundColor === 'white' ? 'bg-white text-black autofill:caret-lime-700' : 'bg-black text-white'}`}
                placeholder="Nome"
                defaultValue={initialValues.customerName || ""}
                {...register("customerName", {
                    required: "Obrigatório",
                    minLength: {
                        value: 2,
                        message: "Obrigatório"
                    },
                    onChange: (e) => {
                        if (e.target.value.length > 4) {
                            clearErrors("customerName");
                        }
                    }
                })}
            />
        </>
    )
};