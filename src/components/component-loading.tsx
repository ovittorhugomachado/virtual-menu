export const LoadingComponent = () => {
    return (
        <div className="w-full h-screen flex items-center justify-center gap-4 drop-shadow-[6px_2px_4px_rgba(255,255,255,0.9)] dark:drop-shadow-[6px_2px_4px_rgba(0,0,0,0.9)]">
            <div className="flex flex-col gap-2">
                <div className="w-9 h-1 bg-primary rounded-full animate-wave1" />
                <div className="w-9 h-1 bg-primary rounded-full animate-wave2" />
                <div className="w-9 h-1 bg-primary rounded-full animate-wave3" />
            </div>
            <span className="dark:text-white text-black text-2xl">Carregando</span>
        </div>
    );
};