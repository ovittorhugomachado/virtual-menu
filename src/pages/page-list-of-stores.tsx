import { useEffect, useState } from "react";
import { getStoresList } from "../services/service-store-data";
import { RestaurantData } from "../types/types-restaurante-data.d";
import { StoreGrid } from "../components/customer-side/restaurants-grid";
import { LoadingComponent } from "../components/component-loading";
import { ErrorComponent } from "../components/component-error";
import { Header } from "../components/component-header";
import { MdRestaurantMenu, MdOutlineStorefront } from "react-icons/md";
import { BsTools } from "react-icons/bs";
import { CgMenuGridR } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";

export const PageListOfStores = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [restaurants, setRestaurants] = useState<RestaurantData[]>([]);

    const isLogged = localStorage.getItem('isLogged') === 'true';

    const buttons = [
        ...(isLogged
            ? [
                {
                    to: "/",
                    title: "Painel de pedidos",
                    icon: <CgMenuGridR />,
                },
                {
                    to: "/personalizar-cardapio",
                    title: "Editar cardápio",
                    icon: <IoMdSettings />,
                }
            ]
            : [
                {
                    to: "/entrar",
                    title: "Entrar",
                    icon: <MdOutlineStorefront />,
                },
                {
                    to: "/criar-conta",
                    title: "Criar Restaurante",
                    icon: <BsTools />,
                }
            ]
        ),
        {
            to: "/restaurantes",
            title: "Restaurantes",
            icon: <MdRestaurantMenu />,
        },
    ]

    const fetchRestaurants = async () => {
        try {
            const response = await getStoresList();
            const sorted = [...response].sort((a, b) => b.id - a.id);
            setRestaurants(sorted);
        } catch (error) {
            console.error('Erro:', error);
            setError('Erro ao buscar lista de restaurantes');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRestaurants();
    }, []);

    return (
        <>
            {loading ? (
                <LoadingComponent />
            ) : error ? (
                <ErrorComponent message={error} />
            ) : (
                <div className={`w-full min-h-screen mx-4 md:mx-10 lg:mx-20 flex flex-col items-center justify-start`}>
                    <Header
                        buttons={buttons}
                    />
                    <StoreGrid restaurants={restaurants} />
                </div>
            )}
        </>
    )
};

