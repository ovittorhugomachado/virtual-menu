import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { AccountFormProps } from "../../../types/types-data-forms.d";
import { RestaurantData } from "../../../types/types-restaurante-data.d";
import { BlackLogo, BlackLogoText, WhiteLogoText } from "../../component-logo";
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
            email: '',
            password: '',
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
            <div className="fixed md:hidden top-[120px] left-0 w-screen h-[calc(100vh-120px)] bg-gray-300 z-0"></div>
            <div className="w-[90%] h-[90%] max-w-[1300px] flex flex-col md:flex-row">
                <div className=" md:hidden flex gap-3 mx-auto mb-6">
                    <WhiteLogoText 
                        className="w-[200px]"
                    />
                </div>
                <div
                    className="w-[50%] bg-green-100 hidden md:flex flex-col justify-between rounded-l-xl pb-8 relative overflow-hidden border border-white/30"
                >
                    <BlackLogo className="w-[100px] ml-4" />
                    <img src="./line.gif" alt="line" width={150} style={{ margin: '0 auto' }} />
                    <h1 className="w-50 lg:w-60 text-[20px] lg:text-[24px] font-bold font-ones mx-9 mb-8">Tecnologia que leva seu restaurante mais longe</h1>
                </div>
                <form
                    onSubmit={handleSubmit(handleAccountData)}
                    noValidate
                    className="w-full md:w-[60%] relative rounded-xl md:rounded-l-none py-8 px-4 md:px-3 mx-auto flex flex-col justify-center items-center gap-4 bg-white"
                >
                    <BlackLogoText className="hidden md:block w-[200px] absolute top-10" />
                    <h1 className="w-full max-w-105 mb-2 ml-6 text-2xl font-bold">Entrar</h1>
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
                    {error && (
                        <p className="text-error">
                            {error}
                        </p>
                    )}
                    <button
                        type="submit"
                        className="w-[220px] primary-button mt-4 self-center"
                        disabled={isLoading}
                    >
                        {isLoading ? "Carregando..." : "Entrar"}
                    </button>
                    <div className="mb-5 flex flex-col gap-4">
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

