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
        <main className="w-full relative h-screen min-w-[280px] min-h-screen flex justify-start md:justify-center items-center" >
            <div className="w-full h-36 md:hidden absolute top-0 bg-primary dark:bg-[#161a21] z-0"></div>
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