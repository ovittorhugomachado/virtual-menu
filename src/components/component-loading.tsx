export const LoadingComponent = () => {
    return (
        <div className="w-full h-screen flex items-center justify-center gap-4">
            <div className="flex flex-col gap-2">
                <div className="w-9 h-1 bg-primary dark:bg-white rounded-full animate-wave1" />
                <div className="w-9 h-1 bg-primary dark:bg-white rounded-full animate-wave2" />
                <div className="w-9 h-1 bg-primary dark:bg-white rounded-full animate-wave3" />
            </div>
            <span className="dark:text-white text-black text-2xl">Carregando</span>
        </div>
    );
};