import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { UpdateDataForm } from "./deafult/form-update-data";
import { getMyStoreData, updateMyStoreData } from "../../../services/service-store-data";
import { UpdateStoreDataFormProps } from "../../../types/types-data-forms.d";
import { RestaurantData } from "../../../types/types-restaurante-data.d";
import { CheckboxDeliveryTypesInput } from "../inputs/input-store-delivery-type";
import { InputRestaurantName } from "../inputs/input-store-restaurant-name";
import { InputPhoneNumber } from "../inputs/input-store-phone-number";
import { InputAddress } from "../inputs/input-store-address";
import { FaGear } from "react-icons/fa6";

export const UpdateStoreDataForm: React.FC<UpdateStoreDataFormProps> = ({
    onClose,
    initialValues = {},
}) => {
    const {
        register,
        setValue,
        control,
        handleSubmit,
        clearErrors,
        formState: { errors },
    } = useForm<RestaurantData>({
        defaultValues: {
            restaurantName: "",
            address: {
                street: "",
                number: "",
                neighborhood: "",
                city: "",
            },
            phoneNumber: "",
            delivery: false,
            pickup: false,
            ...initialValues,
        },
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const fetchStoreData = async () => {
            setLoading(true);
            try {
                const response = await getMyStoreData();
                console.log(response)
                setValue("restaurantName", response.user.restaurantName);
                setValue(
                    "address",
                    typeof response.address === "string"
                        ? {
                            street: response.address,
                            number: "",
                            neighborhood: "",
                            city: "",
                        }
                        : response.address
                );
                setValue("phoneNumber", response.user.phoneNumber);
                setValue("delivery", response.delivery);
                setValue("pickup", response.pickup);
            } catch (error: unknown) {
                console.error(error);
                setError(error instanceof Error ? error.message : "Erro ao carregar os dados da loja");
            } finally {
                setLoading(false);
            }
        };

        fetchStoreData();
    }, [setValue]);

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage("");
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [successMessage]);
    console.log(errors.delivery);
    const handleFormSubmit: SubmitHandler<RestaurantData> = async (data) => {
        const payload = {
            store: {
                address: {
                    street: data.address?.street ?? "",
                    number: data.address?.number ?? "",
                    neighborhood: data.address?.neighborhood ?? "",
                    city: data.address?.city ?? "",
                },
                delivery: data.delivery,
                pickup: data.pickup,
            },
            ownerUser: {
                restaurantName: data.restaurantName,
                phoneNumber: data.phoneNumber,
            }
        };

        try {
            await updateMyStoreData(payload);
            setSuccessMessage("Dados atualizados com sucesso!");
            setError("");
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : "Erro ao carregar os dados da loja");
            setSuccessMessage("");
        }
    };

    return (
            <UpdateDataForm
                onClose={onClose}
                error={error}
                loading={loading}
                formIcon={<FaGear />}
                title="Dados da Loja"
                textButtonSubmit="Salvar"
                submitFunction={handleSubmit(handleFormSubmit)}
                successMessage={successMessage}
            >
                    <InputRestaurantName
                        register={register}
                        errors={errors}
                        clearErrors={clearErrors}
                        initialValues={initialValues}
                    />
                    <InputAddress
                        register={register}
                        errors={errors}
                        clearErrors={clearErrors}
                        initialValues={initialValues}
                    />
                    <InputPhoneNumber
                        control={control}
                        initialValues={initialValues}
                    />
                    <div className={`${errors.delivery || errors.pickup ? "border-l-2 border-red-600" : "border-gray-300"} flex flex-col gap-1 pl-2`}>
                        <CheckboxDeliveryTypesInput
                            register={register}
                            errors={errors}
                        />
                    </div>
            </UpdateDataForm>
    );
};