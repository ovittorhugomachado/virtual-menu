type LogoProps = {
    className?: string;
};

export const LogoWhite= ({ className }: LogoProps) => (
    <>
        <img
            className={`${className ?? ""}`}
            src="../logo-dark.png"
            alt="logo"
        />
    </>
);

export const LogoBlue= ({ className }: LogoProps) => (
    <>
        <img
            className={`${className ?? ""}`}
            src="../logo-light.png"
            alt="logo"
        />
    </>
);

export const LogoTextWhite = ({ className }: LogoProps) => (
    <>
        <img
            className={`${className ?? ""}`}
            src="../logo-text-dark.png"
            alt="logo"
        />
    </>
);

export const LogoTextBlue = ({ className }: LogoProps) => (
    <>
        <img
            className={`${className ?? ""}`}
            src="../logo-text-light.png"
            alt="logo"
        />
    </>
);