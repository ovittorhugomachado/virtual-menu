import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { AccountData } from "../../../types/types-account.d";
import { RestaurantData } from "../../../types/types-restaurante-data.d";
import { AccountFormProps } from "../../../types/types-data-forms.d";
import { LogoTextGreen, LogoTextWhite, LogoWhite } from "../../component-logo";
import { InputEmail } from "../inputs/input-store-email";
import { FaArrowRight } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { GoCheck } from "react-icons/go";

export const RecoverPasswordFormContainer = ({
    onSubmit,
    error,
    message,
    initialValues = {},
    isLoading = false,
}: AccountFormProps) => {
    const {
        register,
        handleSubmit,
        clearErrors,
        setError,
        formState: { errors },
    } = useForm<RestaurantData>({
        defaultValues: {
            email: '',
            ...initialValues,
        },
    });

    const handleRecoverPasswordSubmit: SubmitHandler<AccountData> = (data) => {
        try {
            onSubmit(data);
            clearErrors();
        } catch (error) {
            if (error instanceof Error) {
                setError('root.serverError', {
                    type: 'server',
                    message: error.message,
                });
            } else {
                setError('root.serverError', {
                    type: 'server',
                    message: 'Erro desconhecido',
                });
            }
        }
    };

    return (
        <>
            <div className="w-[90%] h-[90vh] min-h-[400px] max-h-[700px] mt-10 md:mt-4 md:my-4 bg-transparent flex flex-col md:flex-row md:shadow-2xl rounded-xl z-30">
                <div className=" md:hidden flex gap-3 mx-auto mb-6">
                    <LogoTextWhite className="w-[200px]" />
                </div>
                {message === "" && (
                    <>
                        <div
                            className="w-[50%] bg-primary dark:bg-[#161a21] hidden md:flex flex-col justify-between rounded-l-xl pb-8 relative overflow-hidden"
                        >
                            <LogoWhite className="w-[100px] ml-4" />
                            <MdPassword size={130} className="text-white dark:text-zinc-600 mx-auto animate-pulse" />
                            <img src="./form-recover-password.gif" alt="esqueceu-a-senha?" width={230} style={{ margin: '0 45px' }} />
                        </div>
                        <form
                            onSubmit={handleSubmit(handleRecoverPasswordSubmit)}
                            noValidate
                            className="w-full md:w-[60%] min-h-90 relative rounded-xl md:rounded-l-none pb-8 px-4 md:px-3 mx-auto flex flex-col justify-start pt-8 md:pt-0 md:justify-center items-center gap-4 bg-white dark:bg-[#202326] shadow-2xl md:shadow-none"
                        >
                            <Link to="/entrar" className="hidden md:block w-[200px] absolute top-10 transition-all hover:scale-105 duration-200">
                                <LogoTextGreen className="w-[200px] dark:hidden" />
                                <LogoTextWhite className="w-[200px] hidden dark:block" />
                            </Link>
                            <h1 className="w-full max-w-105 ml-6 mb-4 text-2xl font-bold">Recuperar senha</h1>
                            <InputEmail
                                register={register}
                                errors={errors}
                                clearErrors={clearErrors}
                            />
                            <div className="w-full relative flex justify-center">
                                {error && (
                                    <p className="text-error absolute -top-2">{error}</p>
                                )}
                                <button
                                    type="submit"
                                    className="w-[220px] primary-button self-center mt-8"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Carregando..." : "Recuperar senha"}
                                </button>
                            </div>
                            <div className="mb-5 flex flex-col gap-4 absolute bottom-4">
                                <Link
                                    to="/criar-conta"
                                    className="text-center"
                                >
                                    Ainda não tem conta?{" "}
                                    <strong className="whitespace-nowrap">
                                        Criar conta <FaArrowRight className="inline" />
                                    </strong>
                                </Link>
                            </div>
                        </form>
                    </>
                )}
                {message !== "" && (
                    <>
                        <div
                            className="w-[50%] bg-primary dark:bg-[#161a21] hidden md:flex flex-col justify-between rounded-l-xl pb-8 relative overflow-hidden"
                        >
                            <LogoWhite className="w-[100px] ml-4" />
                            <GoCheck size={130} className="text-white dark:text-zinc-600 mx-auto animate-pulse" />
                            <img src="./form-recover-password-success.gif" alt="sucesso" width={230} style={{ margin: '0 45px' }} />
                        </div>
                        <div className="w-full md:w-[60%] min-h-60 relative rounded-xl md:rounded-l-none pb-8 px-4 md:px-3 mx-auto flex flex-col justify-start pt-8 md:pt-0 md:justify-center items-center gap-4 bg-white dark:bg-[#202326] shadow-2xl md:shadow-none">
                            <Link to="/entrar" className="hidden md:block w-[200px] absolute top-10 transition-all hover:scale-105 duration-200">
                                <LogoTextGreen className="w-[200px] dark:hidden" />
                                <LogoTextWhite className="w-[200px] hidden dark:block" />
                            </Link>
                            <h1 className="text-2xl text-center">Email enviado ✅</h1>
                            <p className="sm:text-lg text-center px-6">{message}</p>
                            <Link
                                to="/entrar"
                                className="flex items-center gap-3 primary-button"
                            >
                                Entrar na conta
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};