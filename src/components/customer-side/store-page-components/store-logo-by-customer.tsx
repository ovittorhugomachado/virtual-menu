export const LogoStore = ({ image }: { image?: string }) => {
    return (
        <div className="w-16 h-16 sm:w-23 sm:h-23 rounded-full relative mb-1.5">
            <img src={image} alt="logo" className="w-full h-full rounded-full object-cover" />
        </div>
    );
};