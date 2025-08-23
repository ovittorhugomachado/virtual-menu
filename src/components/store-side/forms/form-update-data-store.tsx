import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { getMyStoreData, updateMyStoreData } from "../../../services/service-store-data";
import { UpdateStoreDataFormProps } from "../../../types/types-data-forms.d";
import { RestaurantData } from "../../../types/types-restaurante-data.d";
import { LoadingComponent } from "../../component-loading";
import { CheckboxDeliveryTypesInput } from "../inputs/input-store-delivery-type";
import { InputRestaurantName } from "../inputs/input-store-restaurant-name";
import { InputPhoneNumber } from "../inputs/input-store-phone-number";
import { InputAddress } from "../inputs/input-store-address";
import { IoCloseOutline, IoStorefrontOutline } from "react-icons/io5";
import { LogoBlue, LogoTextBlue, LogoTextWhite, LogoWhite } from "../../component-logo";

export const UpdateStoreDataForm: React.FC<UpdateStoreDataFormProps> = ({
    onClose,
    initialValues = {},
}) => {
    const {
        register,
        handleSubmit,
        setValue,
        control,
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
    const [messageSuccess, setMessageSuccess] = useState("");

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
        if (messageSuccess) {
            const timer = setTimeout(() => {
                setMessageSuccess("");
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [messageSuccess]);
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
            setMessageSuccess("Dados atualizados com sucesso!");
            setError("");
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : "Erro ao carregar os dados da loja");
            setMessageSuccess("");
        }
    };

    return (
        <>
            {loading ? (
                <div className="fixed w-screen h-screen flex items-center justify-center bg-white/10 backdrop-blur-sm z-30">
                    <div className="absolute w-120 h-90 mx-3 p-5 pt-25 pb-20 border border-zinc-400 bg-white dark:dark:bg-[#161a21] rounded-xl flex flex-col items-center justify-center z-50">
                        <button
                            type="button"
                            className="absolute top-2 right-2 p-2 rounded-full bg-red-600 text-white cursor-pointer transition-all duration-200"
                            onClick={onClose}
                        >
                            <IoCloseOutline className="text-lg" />
                        </button>
                        <LoadingComponent />
                    </div>
                </div>
            ) : (
                <div className="fixed inset-0 bg-white/10 backdrop-blur-sm overflow-hidden z-50">
                    <div className="h-full w-full overflow-y-auto">
                        <div className="min-h-full min-w-full flex justify-center items-center">
                            <div className="w-[90%] max-w-[950px] flex my-4 md:shadow-2xl">
                                <div
                                    className="w-[50%] max-h-[480px] md:min-h-[609px] lg:min-h-[621px] bg-primary dark:bg-[#161a21] hidden md:flex flex-col justify-between rounded-l-xl pb-4 pt-6 relative overflow-hidden"
                                >
                                    <LogoBlue className="w-[100px] ml-4 hidden dark:block" />
                                    <LogoWhite className="w-[100px] ml-4 dark:hidden" />
                                    <IoStorefrontOutline size={130} className="text-white dark:text-zinc-600 mx-auto animate-pulse" />
                                    <img src="./form-update-data-store.gif" alt="alta-tecnologia" width={230} style={{ margin: '0 45px' }} />
                                </div>
                                <form
                                    onSubmit={handleSubmit(handleFormSubmit)}
                                    noValidate
                                    className="w-full md:w-[60%] min-h-130 md:min-h-150 relative rounded-xl md:rounded-l-none py-8 px-4 flex flex-col justify-start md:pt-6 md:justify-between items-center gap-4 bg-white dark:bg-[#202326] shadow-2xl md:shadow-none dark:text-white"
                                >
                                    <div className="w-[200px]">
                                        <LogoTextBlue className="dark:hidden" />
                                        <LogoTextWhite className="hidden dark:block" />
                                    </div>
                                    <button
                                        type="button"
                                        className="absolute top-2 right-2 p-2 rounded-full bg-red-600 text-white cursor-pointer transition-all duration-200"
                                        onClick={onClose}
                                    >
                                        <IoCloseOutline className="text-lg" />
                                    </button>
                                    <div className={`w-full max-w-105 mt-5 mb-5 flex flex-col gap-4 relative`}>
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
                                    </div>

                                    {error && (
                                        <p className="absolute bottom-20 font-bold text-error" style={{ fontSize: '13px' }}>{error}</p>
                                    )}
                                    {messageSuccess && (
                                        <p className="absolute bottom-20 font-bold text-green-600" style={{ fontSize: '13px' }}>{messageSuccess}</p>
                                    )}
                                    <button
                                        type="submit"
                                        className=" primary-button"
                                    >
                                        Atualizar Dados
                                    </button>
                                </form>
                            </div >
                        </div >
                    </div >
                </div >
            )}
        </>
    );
};