import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { AccountFormProps } from "../../../types/types-data-forms.d";
import { AccountData } from "../../../types/types-account.d";
import { RestaurantData } from "../../../types/types-restaurante-data.d";
import { WhiteLogo} from "../../component-logo";
import { InputPasswordRegister } from "../inputs/input-store-password-register";
import { FaArrowLeft } from "react-icons/fa";

export const CreateNewPasswordFormContainer = ({
    onSubmit,
    message,
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
        <div className="w-[90%] max-w-[450px] pt-10 pb-10 flex flex-col justify-center items-center gap-3">
            {message === "" && (
                <form
                    onSubmit={handleSubmit(handleFormSubmit)}
                    noValidate
                    className="w-full max-w-105 primary-component py-8 px-4 flex flex-col justify-center items-center gap-4 relative"
                >
                    <Link to="/entrar" className="absolute top-2.5 left-4 flex items-center justify-center gap-2">
                        <span className="translate-y-[1px]"><FaArrowLeft /></span>Voltar
                    </Link>
                    <WhiteLogo/>
                    <div className="w-full max-w-105 mt-5 mb-5 flex flex-col gap-1">
                        <InputPasswordRegister
                            register={register}
                            watch={watch}
                            errors={errors}
                            clearErrors={clearErrors}
                        />
                    </div>
                    <button type="submit" className="primary-button" disabled={isLoading}>
                        {isLoading ? "Carregando..." : "Redefinir senha"}
                    </button>
                </form>
            )}
            {message !== "" && (
                <>
                    <WhiteLogo/>
                    <h1 className="text-black  my-4 text-center">{message}</h1>
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