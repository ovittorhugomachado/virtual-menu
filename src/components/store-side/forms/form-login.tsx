import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { AccountFormProps } from "../../../types/types-data-forms.d";
import { RestaurantData } from "../../../types/types-restaurante-data.d";
import { LogoBlue, LogoTextBlue, LogoTextWhite, LogoWhite } from "../../component-logo";
import { InputEmail } from "../inputs/input-store-email";
import { InputPassword } from "../inputs/input-store-password";
import { FaArrowRight } from "react-icons/fa";

export const LoginFormContainer = ({
    onSubmit,
    error,
    initialValues = {},
    isLoading = false,
}: AccountFormProps) => {
    const {
        register,
        handleSubmit,
        clearErrors,
        setError,
        watch,
        formState: { errors },
    } = useForm<RestaurantData>({
        defaultValues: {
            user: {
                email: '',
                password: '',
                ...(initialValues.user || {}),
            },
            ...initialValues,
        },
    });

    const handleAccountData: SubmitHandler<RestaurantData> = (data) => {
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
            <div className="w-[90%] max-w-[1200px] h-[90vh] min-h-[500px] max-h-[700px] mt-10 md:mt-4 md:my-4 bg-transparent flex flex-col md:flex-row md:shadow-2xl rounded-xl z-30">
                <div className="md:hidden flex gap-3 mx-auto mb-6">
                    <LogoTextWhite className="w-[200px]" />
                </div>
                <div
                    className="w-[50%] bg-primary dark:bg-[#161a21] hidden md:flex flex-col justify-between rounded-l-xl pb-8 relative overflow-hidden"
                >
                    <LogoBlue className="w-[100px] ml-4 hidden dark:block" />
                    <LogoWhite className="w-[100px] ml-4 dark:hidden" />
                    <img
                        src="./line-dark.png"
                        alt="line"
                        width={150}
                        style={{
                            animation: "revealLine 4s ease-in-out infinite alternate",
                            margin: "0 auto",
                        }}
                    />
                    <img src="./form-login-dark.gif" alt="alta-tecnologia" width={230} style={{ margin: '0 45px' }} />
                </div>
                <form
                    onSubmit={handleSubmit(handleAccountData)}
                    noValidate
                    className="w-full md:w-[60%] min-h-120 relative rounded-xl md:rounded-l-none pb-8 px-4 md:px-3 mx-auto flex flex-col justify-start pt-8 md:pt-0 md:justify-center items-center gap-4 bg-white dark:bg-[#202326] shadow-2xl md:shadow-none"
                >
                    <div className="hidden md:block w-[200px] absolute top-10">
                        <LogoTextBlue className="dark:hidden" />
                        <LogoTextWhite className="hidden dark:block" />
                    </div>
                    <h1 className="w-full max-w-105 ml-6 text-2xl font-bold">Entrar</h1>
                    <InputEmail
                        register={register}
                        errors={errors}
                        clearErrors={clearErrors}
                    />
                    <InputPassword
                        register={register}
                        watch={watch}
                        errors={errors}
                        clearErrors={clearErrors}
                    />
                    <div className="w-full relative flex justify-center">
                        {error && (
                            <p className="text-error absolute -top-2">{error}</p>
                        )}
                        <button
                            type="submit"
                            className="w-[220px] primary-button self-center mt-6"
                            disabled={isLoading}
                        >
                            {isLoading ? "Carregando..." : "Entrar"}
                        </button>
                    </div>
                    <div className="pt-10 flex flex-col gap-2 absolute bottom-4">
                        <Link
                            to="/criar-conta"
                            className="text-center"
                        >
                            Ainda não tem conta?{" "}
                            <strong className="whitespace-nowrap">
                                Criar conta <FaArrowRight className="inline" />
                            </strong>
                        </Link>
                        <Link
                            to="/recuperar-senha"
                            className="text-center"
                        >
                            Esqueci minha senha
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
};

