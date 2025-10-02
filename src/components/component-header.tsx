import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { LogoTextBlue, LogoTextWhite } from "./component-logo";
import { useAuth } from "../hooks/use-auth";
import { getExtension } from "../utils/function-get-extension";
import { CgMenuGridR } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";
import { BsFillBarChartFill } from "react-icons/bs";
import { IoExit } from "react-icons/io5";
import { logout } from "../services/service-auth";

export const Header = () => {

    const VITE_API_URL = import.meta.env.VITE_API_URL;

    const [menuOpen, setMenuOpen] = useState(false);

    const { user, style } = useAuth();

    const location = useLocation();

    const logoutFunction = async () => {
        await logout()
        localStorage.setItem('isLogged', JSON.stringify(false));
        localStorage.removeItem('token');
    }

    const buttons = [
        {
            to: "/",
            title: "Painel de pedidos",
            icon: <CgMenuGridR />,
        },
        {
            to: "/personalizar-cardapio",
            title: "Editar cardápio",
            target: "_blank",
            icon: <IoMdSettings />,
        },
        {
            to: "/relatorios",
            title: "Relatórios",
            icon: <BsFillBarChartFill />,
        },
        {
            to: "/entrar",
            title: "Sair",
            icon: <IoExit />,
            function: logoutFunction
        },
    ]

    return (
        <nav
            className="w-screen lg:h-42 xl:h-26 px-6 py-4 lg:py-0 xl:py-12 md:pt-8 md:gap-36 text-white flex flex-col md:flex-row items-center justify-center"
        >
            <div className="w-[200px] xl:w-[250px] absolute left-12 top-8 xl:top-8 hidden md:block">
                <LogoTextBlue className="w-[200px] dark:hidden" />
                <LogoTextWhite className="w-[200px] hidden dark:block" />
            </div>
            <div className="w-full md:hidden flex items-center justify-between relative text-white">
                <button
                    className="w-18 h-10 flex flex-col justify-center items-center z-30"
                    onClick={() => setMenuOpen((prev) => !prev)}
                    aria-label="Abrir menu"
                >
                    <span className={`w-8 h-1 my-0 rounded bg-primary transition-all duration-300${menuOpen ? " rotate-45 translate-y-2" : ""}`}></span>
                    <span className={`w-8 h-1 my-1 rounded bg-primary transition-all duration-300${menuOpen ? " opacity-0" : ""}`}></span>
                    <span className={`w-8 h-1 my-0 rounded bg-primary transition-all duration-300${menuOpen ? " -rotate-45 -translate-y-2" : ""}`}></span>
                </button>
                <img
                    src={
                        style?.logoUrl && style.logoUrl.startsWith('https://s3.us-east-2.amazonaws.com/bucket.rangos/')
                            ? style.logoUrl
                            : style?.logoUrl
                                ? `${VITE_API_URL}/uploads/store${user?.id}-logo${getExtension(style?.logoUrl)}`
                                : 'store-logo-default.png'
                    }
                    alt="logo"
                    className="w-18 rounded-full"
                />
            </div>
            <ul
                className={`w-full max-w-[720px] text-lg mb-8 xl:mb-0 md:mt-12 xl:mt-0 flex flex-col md:flex-row items-center justify-center gap-2 sm:gap-2 md:gap-4 xl:translate-x-5 translate-y-3.5 xl:translate-y-0 xl:translate-x-12${menuOpen ? "" : " hidden md:flex"}`}
            >
                {buttons.map((btn, idx) => (
                    <li key={idx}>
                        <Link
                            to={btn.to}
                            title={btn.title}
                            target={btn.target === '_blank' ? '_blank' : '_self'}
                            onClick={btn.function}
                            style={{ fontSize: '19px' }}
                            className={`px-4 py-1 gap-1 text-4xl rounded-full flex justify-center items-center ${location.pathname === btn.to ? "bg-primary  dark:text-black cursor-auto" : "text-black dark:text-white cursor-pointer transition-all duration-200 hover:bg-primary hover:dark:bg-white hover:dark:text-black hover:text-white"}`}
                        >
                            {btn.icon}
                            {btn.title}
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="absolute right-16 md:block lg:left-auto lg:right-18 md:-translate-y-11 lg:-translate-y-8 xl:translate-y-0 hidden">
                <img
                    src={
                        style?.logoUrl && style.logoUrl.startsWith('https://s3.us-east-2.amazonaws.com/bucket.rangos/')
                            ? style.logoUrl
                            : style?.logoUrl
                                ? `${VITE_API_URL}/uploads/store${user?.id}-logo${getExtension(style?.logoUrl)}`
                                : 'store-logo-default.png'
                    }
                    alt="logo"
                    className="w-18 rounded-full"
                />
            </div>
        </nav>
    );
};
