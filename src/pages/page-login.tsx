import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/service-auth";
import { AccountData } from "../types/types-account.d";
import { LoginFormContainer } from "../components/store-side/forms/form-login";

export const LoginPage = () => {

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    const handleLogin = async (data: AccountData) => {
        setLoading(true);
        try {
            const { isLogged } = await login(data);
            localStorage.setItem('isLogged', JSON.stringify(isLogged));
            navigate('/')

        } catch (error) {
            setError(error instanceof Error ? error.message : 'Erro inesperado');

        } finally {
            setLoading(false);
        }
    };

    return (
        <main
            className="w-full h-screen min-w-[280px] min-h-[590px] flex justify-center items-center"
            style={{
                background: 'linear-gradient(135deg, #0631dd 0%, #06b6d4 50%, #84cc16 100%)'
            }}
        >
            <LoginFormContainer
                onSubmit={handleLogin}
                isLoading={loading}
                message=""
                error={error}
                setError={setError}
            />
        </main>
    )
};
