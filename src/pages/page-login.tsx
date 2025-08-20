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
        <main className="w-full relative h-screen min-w-[280px] min-h-screen flex justify-start md:justify-center items-center" >
            <div className="w-full h-36 md:hidden absolute top-0 bg-primary dark:bg-[#161a21] z-0"></div>
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
