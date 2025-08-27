export const ErrorComponent = ({ message }: { message: string }) => {
    
    return (
        <div className="w-full h-24 py-24 m-2 flex flex-col items-center justify-center">
            <img
                src="../error.png"
                alt="Erro"
                className="w-58 h-58 dark:hidden"
            />
            <img
                src="../error-dark.png"
                alt="Erro"
                className="w-58 h-58 hidden dark:block"
            />
            <p className="text-lg font-extralight dark:text-white text-black text-center">
                {message}
            </p>
        </div>
    );
};

