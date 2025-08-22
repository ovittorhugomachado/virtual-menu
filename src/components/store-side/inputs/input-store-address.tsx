import { InputAddressProps } from "../../../types/types-input.d";

export const InputAddress = ({
    register,
    errors,
    clearErrors,
    initialValues = {},
}: InputAddressProps) => {

    return (
        <div className="relative w-full max-w-105 flex flex-col gap-1">
            <label className="w-full font-medium ml-2 mt-2 flex flex-col relative">
                Endereço
            </label>
            <div className="flex flex-col gap-2 pl-6">
                <div className="flex gap-2 items-center">
                    <label htmlFor="street" className="text-gray-300 w-[60px]">Rua</label>
                    <input
                        id="street"
                        type="text"
                        className={`input flex-1 ${errors.address?.street ? "input-error" : ""}`}
                        placeholder="Rua"
                        defaultValue={initialValues.address?.street || ""}
                        {...register("address.street", {
                            required: "Campo obrigatório",
                            minLength: { value: 2, message: "Mínimo 2 caracteres" },
                            onChange: (e) => {
                                if (e.target.value.length > 1) clearErrors("address.street");
                            }
                        })}
                    />
                </div>
                <div className="flex gap-2 items-center">
                    <label htmlFor="number" className="text-gray-300 w-[60px]">Número</label>
                    <input
                        id="number"
                        type="text"
                        className={`input flex-1 min-w-[80px] ${errors.address?.number ? "input-error" : ""}`}
                        placeholder="Número"
                        defaultValue={initialValues.address?.number || ""}
                        {...register("address.number", {
                            required: "Campo obrigatório",
                            minLength: { value: 1, message: "Mínimo 1 caractere" },
                            onChange: (e) => {
                                if (e.target.value.length > 0) clearErrors("address.number");
                            }
                        })}
                    />
                </div>
                <div className="flex gap-2 items-center">
                    <label htmlFor="neighborhood" className="text-gray-300 w-[60px]">Bairro</label>
                    <input
                        id="neighborhood"
                        type="text"
                        className={`input flex-1 ${errors.address?.neighborhood ? "input-error" : ""}`}
                        placeholder="Bairro"
                        defaultValue={initialValues.address?.neighborhood || ""}
                        {...register("address.neighborhood", {
                            required: "Campo obrigatório",
                            minLength: { value: 2, message: "Mínimo 2 caracteres" },
                            onChange: (e) => {
                                if (e.target.value.length > 1) clearErrors("address.neighborhood");
                            }
                        })}
                    />
                </div>
                <div className="flex gap-2 items-center">
                    <label htmlFor="city" className="text-gray-300 w-[60px]">Cidade</label>
                    <input
                        id="city"
                        type="text"
                        className={`input flex-1 ${errors.address?.city ? "input-error" : ""}`}
                        placeholder="Cidade"
                        defaultValue={initialValues.address?.city || ""}
                        {...register("address.city", {
                            required: "Campo obrigatório",
                            minLength: { value: 2, message: "Mínimo 2 caracteres" },
                            onChange: (e) => {
                                if (e.target.value.length > 1) clearErrors("address.city");
                            }
                        })}
                    />
                </div>
            </div>
        </div>
    );
};