import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { AccountFormProps } from "../../../types/types-data-forms.d";
import { AccountData } from "../../../types/types-account.d";
import { RestaurantData } from "../../../types/types-restaurante-data.d";
import { Logo, LogoText } from "../../component-logo";
import { InputPasswordRegister } from "../inputs/input-store-password-register";
import { MdPassword } from "react-icons/md";

export const CreateNewPasswordFormContainer = ({
    onSubmit,
    message,
    error,
    initialValues = {},
    isLoading = false,
}: AccountFormProps) => {

    const {
        register,
        handleSubmit,
        clearErrors,
        watch,
        formState: { errors },
    } = useForm<RestaurantData>({
        defaultValues: {
            password: '',
            ...initialValues,
        },
    });

    const handleFormSubmit: SubmitHandler<AccountData> = (data) => {
        onSubmit(data);
    };

    return (
        <>
            <div className="w-[90%] h-[90%] max-w-[1300px] bg-transparent max-h-170 flex flex-col md:flex-row md:shadow-2xl rounded-xl">
                <div className="md:hidden flex gap-3 mx-auto mb-6">
                    <LogoText
                        className="w-[200px]"
                    />
                </div>
                {message === "" && (
                    <>
                        <div
                            className="w-[50%] bg-green-100 dark:bg-zinc-900 hidden md:flex flex-col justify-between rounded-l-xl pb-8 relative overflow-hidden"
                        >
                            <Logo className="w-[100px] ml-4" />
                            <MdPassword size={130} className="text-[#99b9a8] dark:text-zinc-600 mx-auto animate-pulse" />
                            <img src="../form-create-new-password-light.gif" alt="line" width={200} style={{ margin: '0 45px' }} className="dark:hidden" />
                            <img src="../form-create-new-password-dark.gif" alt="line" width={200} style={{ margin: '0 45px' }} className="hidden dark:block" />
                        </div>
                        <form
                            onSubmit={handleSubmit(handleFormSubmit)}
                            noValidate
                            className="w-full md:w-[60%] min-h-100 relative rounded-xl md:rounded-l-none pb-8 px-4 md:px-3 mx-auto flex flex-col justify-start pt-8 md:pt-0 md:justify-center items-center gap-4 bg-white dark:bg-zinc-800 shadow-2xl md:shadow-none"
                        >
                            <Link to="/entrar" className="hidden md:block w-[200px] absolute top-10 transition-all hover:scale-105 duration-200">
                                <LogoText className="" />
                            </Link>
                            <div className="w-full max-w-105 mt-5 mb-5 flex flex-col gap-1">
                                <InputPasswordRegister
                                    register={register}
                                    watch={watch}
                                    errors={errors}
                                    clearErrors={clearErrors}
                                />
                            </div>
                            <div className="w-full relative flex justify-center">
                                {error && (
                                    <p className="text-error absolute -top-2">{error}</p>
                                )}
                                <button
                                    type="submit"
                                    className="w-[220px] primary-button self-center mt-6"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Carregando..." : "Redefinir senha"}
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </>
    );
};