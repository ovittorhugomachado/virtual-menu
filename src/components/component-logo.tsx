type WhiteLogoProps = {
    className?: string;
};

export const WhiteLogo = ({ className }: WhiteLogoProps) => {
    return (
        <img
            className={className}
            src="../logo-white.png"
            alt="logo"
        />
    );
};

export const WhiteLogoText = ({ className }: WhiteLogoProps) => {
    return (
        <img
            className={className}
            src="../logo-text-white.png"
            alt="logo"
        />
    );
};

export const BlackLogo = ({ className }: WhiteLogoProps) => {
    return (
        <img
            className={className}
            src="../logo-black.png"
            alt="logo"
        />
    );
};

export const BlackLogoText = ({ className }: WhiteLogoProps) => {
    return (
        <img
            className={className}
            src="../logo-text-black.png"
            alt="logo"
        />
    );
};