import { IoIosAddCircle } from "react-icons/io"
import { UpdateDataForm } from "../components/store-side/forms/deafult/form-update-data"
import { useFieldArray, useForm } from "react-hook-form";
import { InputOptioGroupName } from "../components/store-side/inputs/input-store-option-group-name";
import { OptionFormData, OptionGroupFormData } from "../types/types-data-forms.d";
import { InputOptions } from "../components/store-side/inputs/input-store-options";
import { useState } from "react";
import { InputRadioRequired } from "../components/store-side/inputs/input-store-radio-required";
import { MaxMinSelectableOptions } from "../components/store-side/inputs/input-store-max-min-selectable-options";

export const TestPage = () => {

    const [options, setOptions] = useState<OptionFormData[]>([{ name: "", description: "", price: 0 }]);
    const [isRequired, setIsRequired] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        watch,
        clearErrors,
        formState: { errors, isSubmitting },
    } = useForm<OptionGroupFormData>({
        defaultValues: {
            options: [{ name: "", description: "", price: 0 }],
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "options",
    });


    const successMessage = "";
    const handleFormSubmit = async (data: any) => {
        console.log(data);
    }

    const changeIsRequired = () => {
        setIsRequired(!isRequired)
    }
    const moreOptions = () => {
        append({ name: "", description: "", price: 0 });
    }

    const handleRemoveOption = (index: number) => {
        console.log("deletada a option: ", index)
        setOptions(prev => prev.filter((_, i) => i !== index));
    };

    console.log(options)

    const isRequiredValue = watch("isRequired");
    const quantityOptions = watch("options");

    console.log(quantityOptions);
    return (
        <>
            <UpdateDataForm
                onClose={() => { }}
                formIcon={<IoIosAddCircle />}
                title="Criar Grupo de adicionais"
                successMessage={successMessage}
                textButtonSubmit="Criar"
                submitFunction={handleSubmit(handleFormSubmit)}
                isLoadingSubmit={isSubmitting}
            >
                <InputOptioGroupName
                    register={register}
                    errors={errors}
                    clearErrors={clearErrors}
                    initialValues={{}}
                />
                <InputRadioRequired
                    isRequired={isRequired}
                    onChangeIsRequired={changeIsRequired}
                    register={register}
                    errors={errors}
                // clearErrors={clearErrors}
                // initialValues={{}}
                />

                <InputOptions
                    options={fields}
                    onRemoveOption={remove}
                    register={register}
                    errors={errors}
                    clearErrors={clearErrors}
                    initialValues={{}}
                />
                <button
                    type="button"
                    onClick={moreOptions}
                    className="py-2 mb-8 rounded-full cursor-pointer hover:scale-103 transition-all bg-[#161a21] text-white dark:bg-white dark:text-black"
                >Adicionar opção
                </button>
                <MaxMinSelectableOptions
                    isRequired={isRequiredValue}
                    quantityOptions={quantityOptions}
                    register={register}
                    errors={errors}
                />
            </UpdateDataForm>
        </>
        // <CreateOptionGroupForm
        //     onClose={() => { }}
        // />
    )
}