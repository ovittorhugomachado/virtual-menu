import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRestaurantData } from "../../../context/restaurant-data/restaurant-data-context";
import { UpdateDataForm } from "./deafult/form-update-data";
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
        watch,
        formState: { errors },
    } = useForm<RestaurantData>({
        defaultValues: {
            user: {
                restaurantName: "",
                phoneNumber: "",
                ...(initialValues.user || {}),
            },
            address: {
                street: "",
                number: "",
                neighborhood: "",
                city: "",
                ...(initialValues.address || {}),
            },
            delivery: false,
            pickup: false,
            ...initialValues,
        },
    });

    const { restaurantData, updateRestaurantData } = useRestaurantData();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const pickupValue = watch("pickup");

    useEffect(() => {
        const fetchStoreData = async () => {
            setLoading(true);
            try {
                if (restaurantData) {
                    setValue("user.restaurantName", restaurantData.user.restaurantName);
                    setValue(
                        "address",
                        typeof restaurantData.address === "string"
                            ? {
                                street: restaurantData.address,
                                number: "",
                                neighborhood: "",
                                city: "",
                            }
                            : restaurantData.address
                    );
                    setValue("user.phoneNumber", restaurantData.user.phoneNumber);
                    setValue("delivery", restaurantData.delivery);
                    setValue("pickup", restaurantData.pickup);
                }
            } catch (error: unknown) {
                console.error(error);
                setError(error instanceof Error ? error.message : "Erro ao carregar os dados da loja");
            } finally {
                setLoading(false);
            }
        };

        fetchStoreData();
    }, [restaurantData, setValue]);

    useEffect(() => {
        if (!pickupValue) {
            clearErrors("address");
        }
    }, [pickupValue, clearErrors]);

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage("");
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [successMessage]);

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
                restaurantName: data.user.restaurantName,
                phoneNumber: data.user.phoneNumber,
            }
        };

        try {
            await updateRestaurantData(payload);
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
                requiredAddress={pickupValue ? true : false} // ou true
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
            {errors.address && <span className="text-error">Se você tiver a opção de retirada o endereço é obrigatório</span>}
        </UpdateDataForm>
    );
};