export const LoadingComponent = () => {
    return (
        <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-opacity-0 z-50">
            <div className="flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full border-7 border-primary border-t-transparent w-18 h-18 mb-4"></div>
            </div>
        </div>
    );
};
export const LoadingComponentInternal = () => {
    return (
        <div className="flex items-center justify-center bg-opacity-0">
            <div className="flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full border-4 border-primary border-t-transparent w-12 h-12"></div>
            </div>
        </div>
    );
};