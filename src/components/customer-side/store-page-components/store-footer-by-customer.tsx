export const StoreFooterComponent = ({ backgroundColor }: { backgroundColor: string }) => {
    
    return (
        <footer
            style={{ backgroundColor: backgroundColor }}
            className="w-screen h-[110px] flex items-center justify-center"
        >
            <h3 className={`absolute text-base ${backgroundColor === 'black' ? 'text-white' : 'text-black'} translate-x-[-95px] translate-y-[-20px]`}>by</h3>
            <img className="w-40" src="../logo.png" alt="domus-logo" />
        </footer>
    );
};