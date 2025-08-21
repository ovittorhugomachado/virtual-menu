import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { createNewPassword, validateToken } from "../services/service-create-new-password";
import { AccountData } from "../types/types-account.d";
import { CreateNewPasswordFormContainer } from "../components/store-side/forms/form-create-new-password";
import { LogoBlue, LogoTextBlue, LogoTextWhite, LogoWhite } from "../components/component-logo";
import { LoadingComponent } from "../components/component-loading";
import { CiCircleAlert } from "react-icons/ci";
import { GoCheck } from "react-icons/go";

export const CreateNewPasswordPage = () => {

    const [message, setMessage] = useState('')
    const [error, setError] = useState('');
    const [loadingPage, setLoadingPage] = useState(true);
    const [loading, setLoading] = useState(false);
    const [isValidToken, setIsValidToken] = useState(false);

    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        const validateTokenOnLoad = async () => {
            if (!token) {
                setError('Token inválido ou ausente.');
                return;
            }
            setLoadingPage(true);
            try {
                const isValid = await validateToken(token);
                setIsValidToken(isValid);
                if (!isValid) {
                    setError('Link inválido ou expirado. Solicite um novo link.');
                }
            } catch (error) {
                const err = error as Error;
                setError(err.message || 'Erro ao validar o link');
                navigate('/entrar', { state: { error: err.message } });
            } finally {
                setLoadingPage(false);
            }
        };

        validateTokenOnLoad();
    }, [token, navigate]);

    const handleNewPassword = async (formData: AccountData) => {
        if (!token || !isValidToken) {
            setError('Token inválido ou expirado.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            await createNewPassword(formData.password, token);
            setMessage("nova senha cadastrada com sucesso")
        } catch (error) {
            const err = error as Error;
            setError(err.message || 'Erro ao redefinir senha');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loadingPage ? (
                <LoadingComponent />
            ) : message ? (
                <main className="w-full relative h-screen min-w-[280px] min-h-screen flex justify-start md:justify-center items-center" >
                    <div className="w-full h-36 md:hidden absolute top-0 bg-primary dark:bg-[#161a21] z-0"></div>
                    <div className="w-[90%] h-[90vh] min-h-[500px] max-h-[700px] bg-transparent flex flex-col md:flex-row md:shadow-2xl rounded-xl">
                        <div className=" md:hidden flex gap-3 mx-auto mb-6">
                            <LogoTextWhite
                                className="w-[200px]"
                            />
                        </div>
                        <div
                            className="w-[50%] bg-primary dark:bg-[#161a21] hidden md:flex flex-col justify-between rounded-l-xl pb-8 relative overflow-hidden"
                        >
                            <LogoBlue className="w-[100px] ml-4 hidden dark:block" />
                            <LogoWhite className="w-[100px] ml-4 dark:hidden" />
                            <GoCheck size={130} className="text-white dark:text-zinc-600 mx-auto animate-pulse" />
                            <img src="../form-create-new-password-success.gif" alt="sucesso" width={230} style={{ margin: '0 45px' }} />
                        </div>
                        <div className="md:hidden flex gap-3 mx-auto mb-6 z-30">
                            <LogoTextWhite
                                className="w-[200px]"
                            />
                        </div>
                        <div className="w-full md:w-[60%] min-h-70 relative rounded-xl md:rounded-l-none pb-8 px-4 md:px-3 mx-auto flex flex-col justify-start pt-8 md:pt-0 md:justify-center items-center gap-4 bg-white dark:bg-[#202326] shadow-2xl md:shadow-none">
                            <Link to="/entrar" className="hidden md:block w-[200px] absolute top-10 transition-all hover:scale-105 duration-200">
                                <LogoTextBlue className="w-[200px] dark:hidden" />
                                <LogoTextWhite className="w-[200px] hidden dark:block" />
                            </Link>
                            <div className="w-full max-w-105 mt-5 mb-5 flex flex-col gap-1">
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                {message && (
                                    <>
                                        <h1 className="text-2xl text-center">Tudo certo ✅</h1>
                                        <p className="sm:text-lg text-center px-6">{message}</p>
                                    </>
                                )}
                                <Link to="/entrar" className="primary-button w-64 text-center mt-8">
                                    Entrar na conta
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>
            ) : isValidToken && !loadingPage ? (
                <main className="w-full relative h-screen min-w-[280px] min-h-screen flex justify-start md:justify-center items-center" >
                    <div className="w-full h-36 md:hidden absolute top-0 bg-primary dark:bg-[#161a21] z-0"></div>
                    <CreateNewPasswordFormContainer
                        onSubmit={handleNewPassword}
                        message={message}
                        isLoading={loading}
                        error={error}
                        setError={setError}
                    />
                </main>
            ) : (
                <main className="w-full relative h-screen min-w-[280px] min-h-screen flex justify-start md:justify-center items-center" >
                    <div className="w-full h-36 md:hidden absolute top-0 bg-primary dark:bg-[#161a21] z-0"></div>
                    <div className="w-[90%] h-[90vh] min-h-[400px] max-h-[700px] bg-transparent flex flex-col md:flex-row md:shadow-2xl rounded-xl">
                        <div className=" md:hidden flex gap-3 mx-auto mb-6">
                            <LogoTextWhite
                                className="w-[200px]"
                            />
                        </div>

                        <div className=" md:hidden flex gap-3 mx-auto mb-6 z-50">
                            <LogoTextWhite
                                className="w-[200px]"
                            />
                        </div>
                        <div
                            className="w-[50%] bg-primary dark:bg-[#161a21] hidden md:flex flex-col justify-between rounded-l-xl pb-8 relative overflow-hidden"
                        >
                            <LogoBlue className="w-[100px] ml-4 hidden dark:block" />
                            <LogoWhite className="w-[100px] ml-4 dark:hidden" />
                            <CiCircleAlert size={130} className="text-white dark:text-zinc-600 mx-auto animate-pulse" />
                            <img src="../form-create-new-password-error.gif" alt="line" width={200} style={{ margin: '0 45px' }} />
                        </div>
                        <div className="w-full md:w-[60%] min-h-70 relative rounded-xl md:rounded-l-none pb-8 px-4 md:px-3 mx-auto flex flex-col justify-start pt-8 md:pt-0 md:justify-center items-center gap-4 bg-white dark:bg-[#202326] shadow-2xl md:shadow-none">
                            <Link to="/entrar" className="hidden md:block w-[200px] absolute top-10 transition-all hover:scale-105 duration-200">
                                <LogoTextBlue className="w-[200px] dark:hidden" />
                                <LogoTextWhite className="w-[200px] hidden dark:block" />
                            </Link>
                            <div className="w-full max-w-105 mt-5 mb-5 flex flex-col gap-1">
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                {error && (
                                    <>
                                        <h1 className="text-2xl text-center">Ooops... ❌</h1>
                                        <p className="sm:text-lg text-center px-6">{error}</p>
                                    </>
                                )}
                                <Link to="/recuperar-senha" className="primary-button w-64 text-center mt-8">
                                    Solicitar novo link
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>
            )}
        </>
    )
};