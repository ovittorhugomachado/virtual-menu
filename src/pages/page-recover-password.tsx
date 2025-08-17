import { useState } from "react";
import { recoverPassword } from "../services/service-recover-password.ts";
import { AccountData } from "../types/types-account.d.tsx";
import { RecoverPasswordFormContainer } from "../components/store-side/forms/form-recover-password.tsx";

export const RecoverPasswordPage = () => {

    const [error, setError] = useState('');
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false);

    const HandleRecoverPassword = async (data: AccountData) => {
        setLoading(true);
        try {
            const response = await recoverPassword(data);
            setError('')
            setMessage(response.message)
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
            <RecoverPasswordFormContainer
                onSubmit={HandleRecoverPassword}
                isLoading={loading}
                message={message}
                error={error}
                setError={setError}
            />
        </main>
    )
};