type LogoProps = {
    className?: string;
};

export const Logo = ({ className }: LogoProps) => (
    <>
        {/* Logo preta no modo claro */}
        <img
            className={`block dark:hidden ${className ?? ""}`}
            src="../logo-light.png"
            alt="logo"
        />
        {/* Logo branca no modo dark */}
        <img
            className={`hidden dark:block ${className ?? ""}`}
            src="../logo-dark.png"
            alt="logo"
        />
    </>
);

export const LogoText = ({ className }: LogoProps) => (
    <>
        <img
            className={`block dark:hidden ${className ?? ""}`}
            src="../logo-text-light.png"
            alt="logo"
        />
        <img
            className={`hidden dark:block ${className ?? ""}`}
            src="../logo-text-dark.png"
            alt="logo"
        />
    </>
);