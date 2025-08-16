

export const LoadingComponent = () => {

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center gap-2">
            <div className="w-12 h-12 border-2 border-primary border-t-0 rounded-full animate-spin" />
            <p className="text-black">
                Carregando
            </p>
        </div>
    );
};