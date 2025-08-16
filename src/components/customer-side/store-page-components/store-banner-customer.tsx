export const StoreBanner = ({ banner }: { banner: string }) => {
    
    return (
        <div className="w-full h-86 relative hidden xs:block">
            <img src={banner}
                alt="banner-restaurante"
                className="w-screen h-full object-cover" />
        </div>
    );
};