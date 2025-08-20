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
            setOrdersLoading(false);
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
            ) : (loading || ordersLoading || !user) ? (
                <LoadingComponent />
            ) : (
                <div className="flex flex-col min-h-screen h-full">
                    <Header
                        buttons={buttons}
                    />
                    <main className="flex-1 bg-zinc-200 dark:bg-[#161a21] pt-12">
                        <div className="flex items-center justify-center pb-8">
                            <CgMenuGridR className="text-4xl hidden sm:block" />
                            <h1 className="text-4xl border-b-2 border-primary dark:border-white text-center mx-3">Painel de pedidos</h1>
                        </div>
                            <DashboardCards
                                orders={orders}
                                activePanel={activePanel}
                                setActivePanel={setActivePanel}
                                onCancelOrder={handleCancelOrder}
                                onAcceptOrder={handleAcceptOrder}
                                onOrderReady={handleReadyOrder}
                                onOrderDelivered={handleDeliveredOrder}
                            />
                    </main>
                </div>
            )}
        </>
    );
};

