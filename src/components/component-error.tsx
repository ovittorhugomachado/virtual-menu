export const ErrorComponent = ({ message }: { message: string }) => {
    
    return (
        <div className="w-full h-24 py-24 m-2 flex flex-col items-center justify-center">
            <img
                src="../error.png"
                alt="Erro"
                className="w-54 h-54"
            />
            <p className="text-lg font-extralight text-primary text-center">
                {message}
            </p>
        </div>
    );
};

