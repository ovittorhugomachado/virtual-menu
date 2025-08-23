import React from "react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { LogoBlue, LogoTextBlue, LogoTextWhite, LogoWhite } from "../../component-logo";
import { AccountData } from "../../../types/types-account.d";
import { AccountFormProps } from "../../../types/types-data-forms.d";
import { RestaurantData } from "../../../types/types-restaurante-data.d";
import { InputRestaurantName } from "../inputs/input-store-restaurant-name";
import { InputOwnersName } from "../inputs/input-store-owners-name";
import { InputCPF } from "../inputs/input-store-cpf";
import { InputPhoneNumber } from "../inputs/input-store-phone-number";
import { InputPasswordRegister } from "../inputs/input-store-password-register";
import { InputEmailRegister } from "../inputs/input-store-email-register";
import { checkEmailExists } from "../../../utils/fuction-check-email-exists";
import { GoCheck } from "react-icons/go";
import { FaArrowRight } from "react-icons/fa";

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

    const handleNextStep = async () => {
        if (!hasTriedToSubmit) setHasTriedToSubmit(true);

        if (step === 1) {
            const emailValue = watch("email");
            if (!emailValue) {
                setError("email", {
                    type: "manual",
                    message: "Obrigatório",
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
            if (step === 4) {
                handleSubmit(handleFormSubmit)();
            } else {
                setStep(step + 1);
            }
        }
    };

    const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleNextStep();
        }
    };

    const handleFormSubmit: SubmitHandler<AccountData> = (data) => {

        onSubmit(data);

        setStep(5);

    };

    return (
        <>
            <div className="w-[90%] max-w-[1200px] h-[90vh] min-h-[500px] max-h-[700px] mt-10 md:mt-4 md:my-4 bg-transparent flex flex-col md:flex-row md:shadow-2xl rounded-xl z-30">
                <div className={`md:hidden flex gap-3 mx-auto mb-6`}>
                    {step < 5 ? (
                        <>
                            <span className={`${step === 1 ? 'bg-white dark:bg-white text-primary dark:text-black' : ''} ${step <= 1 ? 'border-[#83eae1] dark:border-zinc-700 text-[#83eae1] dark:text-zinc-700' : 'border-white text-white'} flex items-center justify-center w-10 h-10 rounded-full border-[1px]`}>1</span>
                            <span className={`${step === 2 ? 'bg-white dark:bg-white text-primary dark:text-black' : ''} ${step <= 2 ? 'border-[#83eae1] dark:border-zinc-700 text-[#83eae1] dark:text-zinc-700' : 'border-white text-white'} flex items-center justify-center w-10 h-10 rounded-full border-[1px]`}>2</span>
                            <span className={`${step === 3 ? 'bg-white dark:bg-white text-primary dark:text-black' : ''} ${step <= 3 ? 'border-[#83eae1] dark:border-zinc-700 text-[#83eae1] dark:text-zinc-700' : 'border-white text-white'} flex items-center justify-center w-10 h-10 rounded-full border-[1px]`}>3</span>
                            <span className={`${step === 4 ? 'bg-white dark:bg-white text-primary dark:text-black' : ''} ${step <= 4 ? 'border-[#83eae1] dark:border-zinc-700 text-[#83eae1] dark:text-zinc-700' : 'border-white text-white'} flex items-center justify-center w-10 h-10 rounded-full border-[1px]`}>4</span>
                        </>
                    ) : (
                        <LogoTextWhite className="w-[200px]" />
                    )}
                </div>
                <div
                    className="w-[50%] bg-primary hidden dark:bg-[#161a21] md:flex flex-col justify-between rounded-l-xl pb-8 relative overflow-hidden"
                >
                    <LogoBlue className="w-[100px] ml-4 hidden dark:block" />
                    <LogoWhite className="w-[100px] ml-4 dark:hidden" />
                    <div className={`${step !== 5 ? '' : 'hidden'}  flex flex-col gap-3 ml-20`}>
                        <p className="flex items-center gap-3 text-lg text-white">
                            <span className={`${step === 1 ? 'bg-white dark:bg-white text-primary dark:text-black' : ''} flex items-center justify-center w-10 h-10 rounded-full border-[1px]`}>1</span>
                            Email
                        </p>
                        <p className={`${step < 2 ? 'text-[#006058] dark:text-gray-400' : 'text-white'} flex items-center gap-3 text-lg`}>
                            <span className={`${step === 2 ? 'bg-white dark:bg-white text-primary dark:text-black' : ''} ${step < 2 ? 'border-[#006058] dark:border-zinc-700 text-[#006058] dark:text-zinc-700' : ''} flex items-center justify-center w-10 h-10 rounded-full border-[1px]`}>2</span>
                            Restaurante
                        </p>
                        <p className={`${step < 3 ? 'text-[#006058] dark:text-gray-400' : 'text-white'} flex items-center gap-3 text-lg`}>
                            <span className={`${step === 3 ? 'bg-white dark:bg-white text-primary dark:text-black' : ''} ${step < 3 ? 'border-[#006058] dark:border-zinc-700 text-[#006058] dark:text-zinc-700' : ''} flex items-center justify-center w-10 h-10 rounded-full border-[1px]`}>3</span>
                            Proprietário
                        </p>
                        <p className={`${step < 4 ? 'text-[#006058] dark:text-gray-400' : 'text-white'} flex items-center gap-3 text-lg`}>
                            <span className={`${step === 4 ? 'bg-white dark:bg-white text-primary dark:text-black' : ''} ${step < 4 ? 'border-[#006058] dark:border-zinc-700 text-[#006058] dark:text-zinc-700' : ''} flex items-center justify-center w-10 h-10 rounded-full border-[1px]`}>4</span>
                            Criar Senha
                        </p>
                    </div>
                    {step === 1 && (
                        <>
                            <img src="./form-register-step-1.gif" alt="cadastro-email" width={230} style={{ margin: '0 45px' }} />
                        </>
                    )}
                    {step === 2 && (
                        <img src="./form-register-step-2.gif" alt="cadastro-restaurante" width={230} style={{ margin: '0 45px' }} />
                    )}
                    {step === 3 && (
                        <img src="./form-register-step-3.gif" alt="cadastro-proprietario" width={230} style={{ margin: '0 45px' }} />
                    )}
                    {step === 4 && (
                        <img src="./form-register-step-4.gif" alt="cadastro-senha" width={230} style={{ margin: '0 45px' }} />
                    )}
                    {step === 5 && (
                        <>
                            <GoCheck size={130} className="text-white dark:text-zinc-600 mx-auto animate-pulse" />
                            <img src="./form-register-step-5.gif" alt="sucesso" width={230} style={{ margin: '0 45px' }} />
                        </>
                    )}
                </div>
                <form
                    onSubmit={handleSubmit(handleFormSubmit)}
                    noValidate
                    className="w-full md:w-[60%] min-h-120 relative rounded-xl md:rounded-l-none pb-8 px-4 md:px-3 mx-auto flex flex-col justify-center pt-8 md:pt-0 md:justify-center items-center gap-4 bg-white dark:bg-[#202326] shadow-2xl md:shadow-none"
                >
                    <div className="w-full max-w-105 mt- mb-5 flex flex-col justify-center items-center gap-3">
                        <Link to="/entrar" className="hidden md:block w-[200px] absolute top-10 transition-all hover:scale-105 duration-200">
                            <LogoTextBlue className="w-[200px] dark:hidden" />
                            <LogoTextWhite className="w-[200px] hidden dark:block" />
                        </Link>
                        <h1 className="w-full max-w-105 ml-6 mb-4 text-2xl font-bold"
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
                                    onKeyDown={handleEnterKey}
                                />
                                <div className={`${step === 1 ? "justify-center" : ""} w-full flex flex-col-reverse sm:flex-row justify-between items-center px-12 py-8`}>
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
                                    onKeyDown={handleEnterKey}
                                />
                                <InputPhoneNumber
                                    control={control}
                                    initialValues={initialValues}
                                    hasTriedToSubmit={hasTriedToSubmit}
                                    clearErrors={clearErrors}
                                    onKeyDown={handleEnterKey}
                                />
                            </>
                        )}
                        {step === 3 && (
                            <>
                                <InputOwnersName
                                    register={register}
                                    errors={hasTriedToSubmit ? errors : {}}
                                    clearErrors={clearErrors}
                                    onKeyDown={handleEnterKey}
                                />
                                <InputCPF
                                    control={control}
                                    initialValues={initialValues}
                                    hasTriedToSubmit={hasTriedToSubmit}
                                    clearErrors={clearErrors}
                                    onKeyDown={handleEnterKey}
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
                                onKeyDown={handleEnterKey}
                            />
                        )}
                    </div>
                    {step < 4 && step > 1 && (
                        <div className="w-full max-w-[420px] flex flex-col-reverse sm:flex-row justify-between items-center mx-auto pb-8">
                            <button
                                className={`${step === 1 ? "text-white cursor-not-allowed opacity-50" : ""} mx-16 mt-4 mb-2 sm:mt-0 sm:mb-0 md:mt-0 cursor-pointer hover:scale-103 transition-all duration-105`}
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
                        <div className="w-full max-w-[420px] flex flex-col-reverse sm:flex-row justify-between items-center mx-auto pb-8">
                            <button
                                className="mx-10 mt-4 mb-2 md:mt-0 cursor-pointer hover:scale-103 transition-all duration-105"
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
                    {step === 5 && (
                        <>
                            <h1 className="text-2xl text-center">Conta Criada com sucesso 🎉</h1>
                            <p className="sm:text-lg text-center px-6">Agora você já pode entrar na sua conta e começar a configurar seu restaurante!</p>
                            <Link
                                to="/entrar"
                                className="w-[220px] primary-button mt-4 text-center"
                            >
                                Entrar
                            </Link>
                        </>
                    )}
                    {error && (
                        <p className="text-error absolute top-45">{error}</p>
                    )}
                    <div className={`${step === 5 ? 'hidden' : ''} flex gap-2 text-center absolute bottom-6 z-20`}>
                        <Link
                            to="/entrar"
                            className="text-center"
                        >
                            Já tem conta?{" "}
                            <strong className="whitespace-nowrap">
                                Entrar <FaArrowRight className="inline" />
                            </strong>
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
};
