import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { getMyStoreData, updateMyStoreData } from "../../../services/service-store-data";
import { UpdateStoreDataFormProps } from "../../../types/types-data-forms.d";
import { RestaurantData } from "../../../types/types-restaurante-data.d";
import { AccountData } from "../../../types/types-account.d";
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
            address: "",
            phoneNumber: "",
            delivery: false,
            pickup: false,
            ...initialValues,
        },
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [messageSuccess, setMessageSuccess] = useState("");
    const [lastData, setLastData] = useState<Partial<RestaurantData> | null>(null);

    useEffect(() => {
        const fetchStoreData = async () => {
            setLoading(true);
            try {
                const response = await getMyStoreData();

                setValue("restaurantName", response.restaurantName);
                setValue("address", response.address);
                setValue("phoneNumber", response.phoneNumber);
                setValue("delivery", response.delivery);
                setValue("pickup", response.pickup);
                setLastData({
                    restaurantName: response.restaurantName,
                    address: response.address,
                    phoneNumber: response.phoneNumber,
                    delivery: response.delivery,
                    pickup: response.pickup,
                });
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

    const handleFormSubmit: SubmitHandler<AccountData> = async (data) => {
        if (
            lastData &&
            data.restaurantName === lastData.restaurantName &&
            data.address === lastData.address &&
            data.phoneNumber === lastData.phoneNumber &&
            data.delivery === lastData.delivery &&
            data.pickup === lastData.pickup
        ) {
            setMessageSuccess("");
            return;
        }

        try {
            await updateMyStoreData(data);
            setMessageSuccess("Dados atualizados com sucesso!");
            setError("");
            setLastData({
                restaurantName: data.restaurantName,
                phoneNumber: data.phoneNumber,
                address: data.address,
                delivery: data.delivery,
                pickup: data.pickup,
            });
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
                <div className="fixed inset-0 z-30 overflow-auto flex items-start justify-center items-center-on-height">
                    <div className="fixed inset-0 bg-white/10 backdrop-blur-sm z-20"></div>
                    <div className="w-full min-h-full px-4 py-10 md:px-16 md:py-16 lg:px-36 2xl:px-80 bg-transparent flex flex-col md:justify-center items-center md:flex-row rounded-xl z-30">
                        <div
                            className="w-[50%] max-h-[480px] min-h-[525px] bg-primary dark:bg-[#161a21] hidden md:flex flex-col justify-between rounded-l-xl pb-4 pt-6 relative overflow-hidden"
                        >
                            <LogoBlue className="w-[100px] ml-4 hidden dark:block" />
                            <LogoWhite className="w-[100px] ml-4 dark:hidden" />
                            <IoStorefrontOutline size={130} className="text-white dark:text-zinc-600 mx-auto animate-pulse" />
                            <img src="./form-update-data-store.gif" alt="alta-tecnologia" width={230} style={{ margin: '0 45px' }} />
                        </div>
                        <form
                            onSubmit={handleSubmit(handleFormSubmit)}
                            noValidate
                            className="w-full max-h-[480px] md:w-[60%] min-h-130 md:min-h-150 relative rounded-xl md:rounded-l-none pb-8 px-4 md:px-3 mx-auto flex flex-col justify-start pt-8 md:pt-6 md:justify-between items-center gap-4 bg-white dark:bg-[#202326] shadow-2xl md:shadow-none dark:text-white"
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
                            <div className={`w-full max-w-105 mt-5 mb-5 flex flex-col gap-1`}>
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
                                <CheckboxDeliveryTypesInput register={register} />
                            </div>
                            {error && (
                                <p className="font-bold text-error">{error}</p>
                            )}
                            {messageSuccess && (
                                <p className="font-bold text-green-600">{messageSuccess}</p>
                            )}
                            <button
                                type="submit"
                                className=" primary-button"
                            >
                                Atualizar Dados
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};