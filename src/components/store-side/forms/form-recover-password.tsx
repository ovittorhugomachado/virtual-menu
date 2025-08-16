import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { AccountData } from "../../../types/types-account.d";
import { RestaurantData } from "../../../types/types-restaurante-data.d";
import { AccountFormProps } from "../../../types/types-data-forms.d";
import { BlackLogo, BlackLogoText, WhiteLogo } from "../../component-logo";
import { InputEmail } from "../inputs/input-store-email";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

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
        <div className="w-[90%] h-[90%] flex">
            {message === "" && (
                <>
                    <div
                        className="w-[50%] bg-green-100 hidden md:flex flex-col justify-between rounded-l-xl pb-8 relative overflow-hidden border border-white/30"
                    >
                        <BlackLogo className="w-[100px] ml-4" />
                        <img src="./line.gif" alt="line" width={150} style={{ margin: '0 auto' }} />
                        <h1 className="w-50 lg:w-60 text-[20px] lg:text-[24px] font-bold font-ones mx-9 mb-8">Esqueceu a senha?<br /> Fica tranquilo,<br/> a gente resolve.</h1>
                    </div>
                    <form
                        onSubmit={handleSubmit(handleRecoverPasswordSubmit)}
                        noValidate
                        className="w-full md:w-[60%] relative rounded-xl md:rounded-l-none py-8 px-4 md:px-3 mx-auto flex flex-col justify-center items-center gap-4 bg-white"
                    >
                        <Link
                            to="/entrar"
                            className="absolute top-2.5 left-4 flex items-center justify-center gap-2"
                        >
                            <span className="translate-y-[1px]"><FaArrowLeft /></span>Voltar
                        </Link>
                        <BlackLogoText className="w-[200px] absolute top-10" />
                        <h1 className="text-2xl font-bold">Entrar</h1>
                        <InputEmail
                            register={register}
                            errors={errors}
                            clearErrors={clearErrors}
                        />
                        {error && (
                            <p className="text-error">{error}</p>
                        )}
                        <p className="text-center">{message}</p>
                        <button
                            type="submit"
                            className="w-[270px] primary-button mt-4 self-center"
                            disabled={isLoading}
                        >
                            {isLoading ? "Carregando..." : "Recuperar senha"}
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
                        </div>
                    </form>
                </>
            )}
            {message !== "" && (
                <>
                    <WhiteLogo />
                    <h1 className="text-black my-4 text-center">{message}</h1>
                    <Link
                        to="/entrar"
                        className="flex items-center gap-3 primary-button"
                    >
                        <span className="translate-y-[1px]"><FaArrowLeft /></span>
                        Fazer login
                    </Link>
                </>
            )}
        </div>
    );
};