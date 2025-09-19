import { InputRadioRequiredProps } from "../../../types/types-input.d"

export const InputRadioRequired = ({
    register,
    isRequired,
    onChangeIsRequired,
    errors,
}: InputRadioRequiredProps) => {

    const { onChange, ...registerProps } = register("isRequired");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChangeIsRequired(e);
        onChange?.(e);
    };

    return (
        <div className="my-4 flex">
            <p className="text-md ml-2 ">É obrigatório?</p>
            <div className="flex gap-6 ml-6">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        value="true"
                        checked={isRequired === true}
                        onChange={handleChange}
                        {...registerProps}
                        className="accent-primary"
                    />
                    <span>Sim</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        value="false"
                        checked={isRequired === false}
                        onChange={handleChange}
                        {...registerProps}
                        className="accent-primary"
                    />
                    <span>Não</span>
                </label>
            </div>
            {errors.isRequired && (
                <span className="text-red-500 text-sm">Obrigatório escolher uma opção</span>
            )}
        </div>
    );
}