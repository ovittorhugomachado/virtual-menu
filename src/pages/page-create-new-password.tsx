import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { createNewPassword, validateToken } from "../services/service-create-new-password";
import { AccountData } from "../types/types-account.d";
import { CreateNewPasswordFormContainer } from "../components/store-side/forms/form-create-new-password";
import { WhiteLogo} from "../components/component-logo";
import { FaArrowLeft } from "react-icons/fa";
import { LoadingComponent } from "../components/component-loading";

export const CreateNewPasswordPage = () => {

    const [message, setMessage] = useState('')
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true); // Força o loading para true
    const [isValidToken, setIsValidToken] = useState(false);

    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        const validateTokenOnLoad = async () => {
            if (!token) {
                setError('Token inválido ou ausente.');
                return;
            }
            setLoading(true);
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
                setLoading(false);
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
            {loading ? (
                <LoadingComponent />
            ) : message ? (
                <div className="w-full h-80 text-black mx-3 pt-10 pb-10 p-5 flex flex-col gap-3 justify-center items-center rounded">
                    <WhiteLogo/>
                    <p>{message}</p>
                    <Link to="/entrar" className="primary-button">
                        Entrar na conta
                    </Link>
                </div>
            ) : isValidToken && !loading ? (
                <div className="w-full min-w-[300px] py-8 flex justify-center items-center">
                    <CreateNewPasswordFormContainer
                        onSubmit={handleNewPassword}
                        message={message}
                        isLoading={loading}
                        error={error}
                    />
                </div>
            ) : (
                <div className="w-full min-w-[270px] flex flex-col justify-center items-center text-black">
                    <Link to="/entrar" className={`absolute top-2.5 left-4 flex gap-2 items-center justify-center text-base`}>
                        <span className="translate-y-[1px]"><FaArrowLeft /></span>Voltar
                    </Link>
                    <WhiteLogo/>
                    {error ? (<p className="py-6 px-4">{error}</p>) : null}
                    <Link to="/recuperar-senha" className="primary-button">
                        Solicitar novo link
                    </Link>
                </div>
            )}
        </>
    )
};