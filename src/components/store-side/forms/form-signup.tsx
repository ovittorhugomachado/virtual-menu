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
import { InputPasswordRegister } from "../inputs/input-store-password-register";
import { useState } from "react";
import { InputEmailRegister } from "../inputs/input-store-email-register";
import { checkEmailExists } from "../../../utils/fuction-check-email-exists";

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
        trigger,
        setError,
        formState: { errors },
    } = useForm<RestaurantData>({
        mode: "onBlur",
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

    const [step, setStep] = useState(1);
    const [hasTriedToSubmit, setHasTriedToSubmit] = useState(false);

    console.log(hasTriedToSubmit, errors)

    const handleNextStep = async () => {
        if (!hasTriedToSubmit) setHasTriedToSubmit(true);

        if (step === 1) {
            const emailValue = watch("email");
            if (!emailValue) {
                setError("email", {
                    type: "manual",
                    message: "Obrigatório.",
                });
                return;
            }

            const emailExists = await checkEmailExists(emailValue);
            if (emailExists.exists) {
                setError("email", {
                    type: "manual",
                    message: "Email já cadastrado.",
                });
                return;
            }
        }

        let fieldsToValidate: (keyof RestaurantData)[] = [];
        if (step === 1) fieldsToValidate = ["email"];
        if (step === 2) fieldsToValidate = ["restaurantName", "phoneNumber"];
        if (step === 3) fieldsToValidate = ["ownersName", "cpf"];
        if (step === 4) fieldsToValidate = ["password"];

        const valid = await trigger(fieldsToValidate);
        if (valid) {
            setHasTriedToSubmit(false);
            clearErrors();
            setStep(step + 1);
        }
    };

    const handleFormSubmit: SubmitHandler<AccountData> = (data) => {
        console.log("submeteu")
        onSubmit(data);
    };

    return (
        <>
            <div className="fixed md:hidden top-[120px] left-0 w-screen h-[calc(100vh-120px)] bg-gray-300 z-0"></div>
            <div className="w-[90%] h-[90%] max-w-[1300px] flex flex-col md:flex-row">
                <div className=" md:hidden flex gap-3 mx-auto mb-6">
                    <span className={`${step === 1 ? 'bg-white text-blue-600' : 'text-white'}  flex items-center justify-center w-10 h-10 rounded-full border-[1px] border-white`}>1</span>
                    <span className={`${step === 2 ? 'bg-white text-blue-600' : 'text-white'} flex items-center justify-center w-10 h-10 rounded-full border-[1px] border-white`}>2</span>
                    <span className={`${step === 3 ? 'bg-white text-blue-600' : 'text-white'} flex items-center justify-center w-10 h-10 rounded-full border-[1px] border-white`}>3</span>
                    <span className={`${step === 4 ? 'bg-white text-blue-600' : 'text-white'} flex items-center justify-center w-10 h-10 rounded-full border-[1px] border-white`}>4</span>
                </div>
                <div
                    className="w-[50%] bg-green-100 hidden md:flex flex-col justify-between rounded-l-xl pb-8 relative overflow-hidden border border-white/30"
                >
                    <BlackLogo className="w-[100px] ml-4" />
                    <div className="flex flex-col gap-3 ml-20">
                        <p className="flex items-center gap-3 text-lg">
                            <span className={`${step === 1 ? 'bg-primary text-white' : ''} flex items-center justify-center w-10 h-10 rounded-full border-[1px] border-black`}>1</span>
                            Email
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
                        className="w-50 lg:w-60 text-[16px] lg:text-[24px] font-bold font-ones mx-9 mb-8"
                    >
                        {step === 1 && "Hora de fazer seu restaurante crescer ainda mais"}
                        {step === 2 && "Aqui você vai criar os dados do restaurante"}
                        {step === 3 && "Agora é hora dos dados do proprietário"}
                        {step === 4 && "Pra finalizar, é só escolher uma boa senha pra que a conta fique segura"}

                    </h1>
                </div>
                <form
                    onSubmit={handleSubmit(handleFormSubmit)}
                    noValidate
                    className="w-full md:w-[60%] min-h-70 relative rounded-xl md:rounded-l-none py-8 px-4 pb-26 md:px-3 mx-auto flex flex-col justify-center items-center gap-4 bg-white"
                >
                    <div className="w-full max-w-105 mt- mb-5 flex flex-col justify-center items-center gap-1">
                        <Link to="/entrar" className="flex absolute top-10 justify-center transition-all hover:scale-105 duration-200">
                            <BlackLogoText className="w-[200px] hidden md:block " />
                        </Link>
                        <h1 className="w-full max-w-105 mb-2 ml-6 text-xl sm:text-2xl font-bold"
                        >
                            {step === 1 ? 'Digite seu email' : ''}
                            {step === 2 ? 'Dados do restaurante' : ''}
                            {step === 3 ? 'Dados do proprietário' : ''}
                            {step === 4 ? 'Crie sua senha' : ''}
                        </h1>
                        {step === 1 && (
                            <>
                                <InputEmailRegister
                                    register={register}
                                    errors={hasTriedToSubmit ? errors : {}}
                                    clearErrors={clearErrors}
                                    initialValues={initialValues}
                                    validate={checkEmailExists}
                                />
                                <div className={`${step === 1 ? "justify-center" : ""} w-full flex flex-col-reverse sm:flex-row justify-between items-center px-12 pb-8 md:pb-14 absolute bottom-0`}>
                                    <button
                                        className={`${step === 1 ? "text-white cursor-not-allowed opacity-50 hidden" : ""} mx-16 mt-8 md:mt-0 cursor-pointer hover:scale-103 transition-all duration-105`}
                                        disabled={step === 1}
                                        type="button"
                                    >
                                        Voltar
                                    </button>
                                    <button
                                        className="w-[220px] primary-button"
                                        onClick={handleNextStep}
                                        type="button"
                                    >
                                        Próximo
                                    </button>
                                </div>
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <InputRestaurantName
                                    register={register}
                                    errors={hasTriedToSubmit ? errors : {}}
                                    clearErrors={clearErrors}
                                />
                                <InputPhoneNumber
                                    control={control}
                                    initialValues={initialValues}
                                    hasTriedToSubmit={hasTriedToSubmit}
                                    clearErrors={clearErrors}
                                />
                            </>
                        )}
                        {step === 3 && (
                            <>
                                <InputOwnersName
                                    register={register}
                                    errors={hasTriedToSubmit ? errors : {}}
                                    clearErrors={clearErrors}
                                />
                                <InputCPF
                                    control={control}
                                    initialValues={initialValues}
                                    hasTriedToSubmit={hasTriedToSubmit}
                                    clearErrors={clearErrors}
                                />
                            </>

                        )}
                        {step === 4 && (
                            <InputPasswordRegister
                                register={register}
                                watch={watch}
                                hasTriedToSubmit={hasTriedToSubmit}
                                errors={errors}
                                clearErrors={clearErrors}
                            />
                        )}
                    </div>
                    {step < 4 && step > 1 && (
                        <div className="w-full flex flex-col-reverse sm:flex-row justify-between items-center px-12 pt-24 pb-2 md:pb-14 absolute bottom-0">
                            <button
                                className={`${step === 1 ? "text-white cursor-not-allowed opacity-50" : ""} mx-16 mt-4 mb-2 md:mt-0 cursor-pointer hover:scale-103 transition-all duration-105`}
                                onClick={() => setStep(step - 1)}
                                disabled={step === 1}
                                type="button"
                            >
                                Voltar
                            </button>
                            <button
                                className="w-[220px] primary-button"
                                onClick={handleNextStep}
                                type="button"
                            >
                                Próximo
                            </button>
                        </div>
                    )}
                    {step === 4 && (
                        <div className="w-full flex flex-col-reverse sm:flex-row justify-between items-center px-12 pt-20 pb-2 md:pb-14 absolute bottom-0">
                            <button
                                className="mx-16 mt-4 mb-2 md:mt-0 cursor-pointer hover:scale-103 transition-all duration-105"
                                onClick={() => setStep(step - 1)}
                                type="button"
                            >
                                Voltar
                            </button>
                            <button
                                type="submit"
                                className="w-[220px] primary-button"
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
        </>

    );
};
