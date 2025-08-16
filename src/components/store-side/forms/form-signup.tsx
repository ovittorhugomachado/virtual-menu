import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { AccountData } from "../../../types/types-account.d";
import { AccountFormProps } from "../../../types/types-data-forms.d";
import { RestaurantData } from "../../../types/types-restaurante-data.d";
import { BlackLogo, BlackLogoText } from "../../component-logo";
import { InputRestaurantName } from "../inputs/input-store-restaurant-name";
import { InputOwnersName } from "../inputs/input-store-owners-name";
import { InputCPF } from "../inputs/input-store-cpf";
import { InputPhoneNumber } from "../inputs/input-store-phone-number";
import { InputEmail } from "../inputs/input-store-email";
import { InputPasswordRegister } from "../inputs/input-store-password-register";
import { FaArrowLeft } from "react-icons/fa";
import { useState } from "react";

export const SignupFormContainer = ({
    onSubmit,
    error,
    initialValues = {},
    isLoading = false,
}: AccountFormProps) => {

    const {
        register,
        handleSubmit,
        control,
        clearErrors,
        watch,
        formState: { errors },
    } = useForm<RestaurantData>({
        defaultValues: {
            restaurantName: '',
            cnpj: '',
            ownersName: '',
            cpf: '',
            phoneNumber: '',
            email: '',
            password: '',
            ...initialValues,
        },
    });

    const handleFormSubmit: SubmitHandler<AccountData> = (data) => {
        onSubmit(data);
    };

    const [step, setStep] = useState(1);

    return (
        <div className="w-[90%] h-[90%] flex">
            <div
                className="w-[50%] bg-green-100 hidden md:flex flex-col justify-between rounded-l-xl pb-8 relative overflow-hidden border border-white/30"
            >
                <BlackLogo className="w-[100px] ml-4" />
                <div className="flex flex-col gap-3 ml-20">
                    <p className="flex items-center gap-3 text-lg">
                        <span className={`${step === 1 ? 'bg-primary text-white' : ''} flex items-center justify-center w-10 h-10 rounded-full border-[1px] border-black`}>1</span>
                        Cadastrar email
                    </p>
                    <p className="flex items-center gap-3 text-lg">
                        <span className={`${step === 2 ? 'bg-primary text-white' : ''} flex items-center justify-center w-10 h-10 rounded-full border-[1px] border-black`}>2</span>
                        Restaurante
                    </p>
                    <p className="flex items-center gap-3 text-lg">
                        <span className={`${step === 3 ? 'bg-primary text-white' : ''} flex items-center justify-center w-10 h-10 rounded-full border-[1px] border-black`}>3</span>
                        Proprietário
                    </p>
                    <p className="flex items-center gap-3 text-lg">
                        <span className={`${step === 4 ? 'bg-primary text-white' : ''} flex items-center justify-center w-10 h-10 rounded-full border-[1px] border-black`}>4</span>
                        Criar Senha
                    </p>
                </div>
                <h1
                    className="w-50 lg:w-60 text-[20px] lg:text-[24px] font-bold font-ones mx-9 mb-8"
                >
                    {step === 1 && "Hora de colocar o seu melhor email para o cadastro"}
                    {step === 2 && "Aqui você vai criar os dados do restaurante"}
                    {step === 3 && "Agora é hora dos dados do proprietário"}
                    {step === 4 && "Pra finalizar, é só escolher uma boa senha pra que a conta fique segura"}

                </h1>
            </div>
            <form
                onSubmit={handleSubmit(handleFormSubmit)}
                noValidate
                className="w-full md:w-[60%] relative rounded-xl md:rounded-l-none py-8 px-4 md:px-3 mx-auto flex flex-col justify-center items-center gap-4 bg-white"
            >
                <Link
                    to="/entrar"
                    className="absolute top-2.5 left-4 flex items-center justify-center gap-2"
                >
                    <span className="translate-y-[1px]"><FaArrowLeft /></span>Fazer login
                </Link>
                <div className="w-full max-w-105 mt- mb-5 pb-14 flex flex-col justify-center items-center gap-1">
                    <BlackLogoText className="w-[200px] absolute top-10" />
                    <h1 className="w-full max-w-105 mb-8 text-2xl font-bold text-center" >Criar conta</h1>
                    {step === 1 && (
                        <InputEmail
                            register={register}
                            errors={errors}
                            clearErrors={clearErrors}
                        />
                    )}
                    {step === 2 && (
                        <>
                            <InputRestaurantName
                                register={register}
                                errors={errors}
                                clearErrors={clearErrors}
                            />
                            <InputPhoneNumber
                                control={control}
                                initialValues={initialValues}
                            />
                        </>
                    )}
                    {step === 3 && (
                        <>
                            <InputOwnersName
                                register={register}
                                errors={errors}
                                clearErrors={clearErrors}
                            />
                            <InputCPF
                                control={control}
                                initialValues={initialValues}
                            />
                        </>

                    )}
                    {step === 4 && (
                        <InputPasswordRegister
                            register={register}
                            watch={watch}
                            errors={errors}
                            clearErrors={clearErrors}
                        />
                    )}
                </div>
                {step !== 4 && (
                    <div className="w-full flex flex-col-reverse sm:flex-row justify-between items-center px-8 absolute bottom-8">
                        <button
                            className={`${step === 1 ? "text-white cursor-not-allowed opacity-50" : ""} mx-16 mt-8 md:mt-0 cursor-pointer hover:scale-103 transition-all duration-105`}
                            onClick={() => setStep(step - 1)}
                            disabled={step === 1}>
                            Voltar
                        </button>
                        <button
                            className="w-[250px] primary-button"
                            onClick={() => setStep(step + 1)}
                        >
                            Próximo
                        </button>
                    </div>
                )}
                {step === 4 && (
                    <div className="w-full flex flex-col-reverse sm:flex-row justify-between items-center px-8 absolute bottom-8">
                        <button className="mx-16 mt-8 md:mt-0 cursor-pointer hover:scale-103 transition-all duration-105" onClick={() => setStep(step - 1)}>
                            Voltar
                        </button>
                        <button
                            type="submit"
                            className="w-[250px] primary-button"
                            disabled={isLoading}
                        >
                            {isLoading ? "Carregando..." : "Criar conta"}
                        </button>
                    </div>
                )}
                {error && (
                    <p className="text-error">
                        {error}
                    </p>
                )}
            </form>
        </div>
    );
};
