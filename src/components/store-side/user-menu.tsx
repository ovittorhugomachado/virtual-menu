import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth"
import { logout } from "../../services/service-auth";
import { IoIosArrowDown } from "react-icons/io";
import { getExtension } from "../../utils/function-get-extension";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const UserMenu = ({ open }: { open: boolean }) => {

    const { user, style } = useAuth();

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className={`${open ? "block" : "hidden"} w-16 h-16 rounded-full flex flex-col items-center md:-translate-y-10 xl:translate-y-0 md:-translate-x-2 lg:translate-x-0`}>
            <img
                src={
                    style?.logoUrl && style.logoUrl.startsWith('https://s3.us-east-2.amazonaws.com/bucket.rangos/')
                        ? style.logoUrl
                        : style?.logoUrl
                            ? `${VITE_API_URL}/uploads/store${user?.id}-logo${getExtension(style?.logoUrl)}`
                            : 'store-logo-default.png'
                }
                alt="logo"
                className="w-full h-full rounded-full"
            />
            <IoIosArrowDown
                onClick={() => setMenuOpen((prev) => !prev)}
                className={`text-xl ${menuOpen ? "rotate-180" : ""} text-black absolute right-[-21px] top-1/2 -translate-y-1/2 cursor-pointer`}
            />

            <div
                style={{ zIndex: 1000 }}
                className={`${menuOpen ? "block" : "hidden"} w-18 rounded-xl flex flex-col absolute bottom-0 translate-y-2 sm:translate-y-3 bg-zinc-600`}
            >
                <Link
                    to="/entrar"
                    onClick={() => {
                        logout()
                        localStorage.setItem('isLogged', JSON.stringify(false));
                        localStorage.removeItem('token');
                    }}
                    className="text-center text-white "
                >
                    Sair
                </Link>
            </div>
        </div>
    );
};