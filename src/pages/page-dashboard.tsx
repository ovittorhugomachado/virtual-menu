import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import {
    cancelOrderService,
    acceptOrderService,
    readyOrderService,
    deliveredOrderService,
    getOrdersService
} from "../services/service-manage-orders";
import { Order } from "../types/types-orders.d";
import { Header } from "../components/component-header";
import { LoadingComponent } from "../components/component-loading";
import { DashboardCards } from "../components/store-side/dashboard-cards";
import { CgMenuGridR } from "react-icons/cg";
import { MdBorderColor } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { BsFillBarChartFill } from "react-icons/bs";
import { IoExit } from "react-icons/io5";
import { logout } from "../services/service-auth";

export const AdminDashboard = () => {

    const { user, loading, error } = useAuth();
    const [activePanel, setActivePanel] = useState<number[]>([]);
    const [ordersLoading, setOrdersLoading] = useState(true);
    const [orders, setOrders] = useState<Order[]>([]);

    const fetchOrders = async () => {
        setOrdersLoading(true);
        try {
            const orders = await getOrdersService();
            const now = Date.now();
            const filtered = orders.filter(order => {
                const created = new Date(order.createdAt).getTime();
                return (now - created) <= 24 * 60 * 60 * 1000;
            });
            setOrders(filtered);
        } catch (error) {
            console.error("Erro ao buscar pedidos:", error);

        } finally {
            setOrdersLoading(true);
        }
    }

    const updateOrders = async () => {
        try {
            const orders = await getOrdersService();
            const now = Date.now();
            const filtered = orders.filter(order => {
                const created = new Date(order.createdAt).getTime();
                return (now - created) <= 24 * 60 * 60 * 1000;
            });
            setOrders(filtered);
        } catch (error) {
            console.error("Erro ao buscar pedidos:", error);
        }
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    useEffect(() => {
        updateOrders();
        const interval = setInterval(() => updateOrders(), 5000);
        return () => clearInterval(interval);
    }, []);

    const handleCancelOrder = async (orderId: number) => {
        await cancelOrderService(orderId);
        fetchOrders();
    };

    const handleAcceptOrder = async (orderId: number) => {
        await acceptOrderService(orderId);
        setActivePanel((prev) => [...prev, 1]);
        fetchOrders();
    };

    const handleReadyOrder = async (orderId: number) => {
        await readyOrderService(orderId);
        setActivePanel((prev) => [...prev, 2]);
        fetchOrders();
    };

    const handleDeliveredOrder = async (orderId: number) => {
        await deliveredOrderService(orderId);
        fetchOrders();
    };

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
            icon: <IoMdSettings />,
        },
        {
            to: "/Relatórios",
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
        <>
            {error ? (
                <div className="flex flex-col items-center justify-center min-h-screen">
                    <h2 className="text-black text-xl font-bold mb-4">Erro ao carregar dados</h2>
                    <p className="text-zinc-700">{error}</p>
                    <Link to="/entrar" className="primary-button mt-4">
                        Ir para login
                    </Link>
                </div>
            ) : (loading || !user) ? (
                <LoadingComponent />
            ) : (
                <>
                    <Header
                        buttons={buttons}
                    />
                    <main className="w-full h-screen bg-white dark:bg-black pt-6 text-black flex flex-col items-center gap-6 rounded-t-3xl">
                        <div className="flex items-center justify-center">
                            <CgMenuGridR className="text-4xl hidden sm:block" />
                            <h1 className="text-4xl border-b-2 border-primary text-center mx-3">Painel de pedidos</h1>
                        </div>
                        <Link
                            to={`restaurante/${user.id}`}
                            title="Fazer pedido"
                            className="w-46 mx-auto px-4 py-1 text-black bg-primary rounded-full flex justify-center items-center gap-1 transition-all duration-200 hover:scale-103"
                        >
                            <MdBorderColor />
                            Fazer pedido
                        </Link>
                        {ordersLoading ? (
                            <LoadingComponent />
                        ) : (
                            <DashboardCards
                                orders={orders}
                                activePanel={activePanel}
                                setActivePanel={setActivePanel}
                                onCancelOrder={handleCancelOrder}
                                onAcceptOrder={handleAcceptOrder}
                                onOrderReady={handleReadyOrder}
                                onOrderDelivered={handleDeliveredOrder}
                            />
                        )}
                    </main>
                </>
            )}
        </>
    );
};

