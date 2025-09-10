import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { AccountFormProps } from "../../../types/types-data-forms.d";
import { RestaurantData } from "../../../types/types-restaurante-data.d";
import { LogoBlue, LogoTextBlue, LogoTextWhite, LogoWhite } from "../../component-logo";
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
            user: {
                password: '',
                ...(initialValues.user || {}),
            },
            ...initialValues,
        },
    });

    const handleFormSubmit: SubmitHandler<RestaurantData> = (data) => {
        const payload = {
            password: data.user.password,
        };
        onSubmit(payload);
    };

    return (
        <>
            <div className="w-[90%] max-w-[1200px] h-[90vh] min-h-[400px] max-h-[700px] mt-10 md:mt-4 md:my-4 bg-transparent flex flex-col md:flex-row md:shadow-2xl rounded-xl z-30">
                <div className="md:hidden flex gap-3 mx-auto mb-6">
                    <LogoTextWhite
                        className="w-[200px]"
                    />
                </div>
                {message === "" && (
                    <>
                        <div
                            className="w-[50%] bg-primary dark:bg-[#161a21] hidden md:flex flex-col justify-between rounded-l-xl pb-8 relative overflow-hidden"
                        >
                            <LogoBlue className="w-[100px] ml-4 hidden dark:block" />
                            <LogoWhite className="w-[100px] ml-4 dark:hidden" />
                            <MdPassword size={130} className="text-white dark:text-zinc-600 mx-auto animate-pulse" />
                            <img src="../form-create-new-password.gif" alt="criar-nova-senha" width={230} style={{ margin: '0 45px' }} />
                        </div>
                        <form
                            onSubmit={handleSubmit(handleFormSubmit)}
                            noValidate
                            className="w-full md:w-[60%] min-h-100 relative rounded-xl md:rounded-l-none pb-8 px-4 md:px-3 mx-auto flex flex-col justify-start pt-8 md:pt-0 md:justify-center items-center gap-4 bg-white dark:bg-[#202326] shadow-2xl md:shadow-none"
                        >
                            <Link to="/entrar" className="hidden md:block w-[200px] absolute top-10 transition-all hover:scale-105 duration-200">
                                <LogoTextBlue className="w-[200px] dark:hidden" />
                                <LogoTextWhite className="w-[200px] hidden dark:block" />
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