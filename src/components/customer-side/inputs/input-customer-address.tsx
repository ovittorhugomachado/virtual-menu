import { InputCustomerAddressProps } from "../../../types/types-input.d";

export const InputCustomerAddress = ({
    backgroundColor,
    register, 
    errors,
    clearErrors,
    initialValues = {}, 
}: InputCustomerAddressProps) => {

    return (
        <>
            <label htmlFor="customerAddress" className="w-full text-sm font-medium pl-2 flex flex-col">
                Endereço
                {errors.customerAddress && (
                    <span className="span-error pr-4">
                        {errors.customerAddress.message?.toString()}
                    </span>
                )}
            </label>
            <input
                id="address"
                type="text"
                className={`w-full text-sm border border-zinc-300 rounded-md mb-2 px-3 py-2 input-store ${errors.customerAddress ? " border-red-500 input-error-store" : ""} ${backgroundColor === 'white' ? 'bg-white text-black autofill:caret-lime-700' : 'bg-black text-white'}`}
                placeholder="Endereço"
                defaultValue={initialValues.customerAddress || ""}
                {...register("customerAddress", {
                    required: "Obrigatório",
                    minLength: {
                        value: 10,
                        message: "Obrigatório"
                    },
                    onChange: (e) => {
                        if (e.target.value.length > 4) {
                            clearErrors("customerAddress");
                        }
                    }
                })}
            />
        </>
    );
};