import { useState } from "react";
import { registerUser } from "../services/service-register";
import { AccountData } from "../types/types-account.d";
import { SignupFormContainer } from "../components/store-side/forms/form-signup";

export const RegisterPage = () => {

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async (data: AccountData) => {
        setLoading(true);
        try {
            const response = await registerUser(data);
            localStorage.setItem('token', response.token);

            setError('');
        } catch (error) {
            const err = error as Error;
            setError(err.message || 'Erro ao criar conta');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="w-full h-screen min-w-[280px] min-h-[540px] flex justify-center items-center">
            <SignupFormContainer
                onSubmit={handleRegister}
                isLoading={loading}
                message=""
                setError={setError}
                error={error}
            />
        </main>
    );
};