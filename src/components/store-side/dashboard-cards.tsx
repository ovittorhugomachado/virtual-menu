import { useEffect, useRef, useMemo } from "react";
import { DashboardCardOrdersProps } from "../../types/types-orders.d";
import { toMoney } from "../../utils/function-transform-to-money";
import { CountdownTimer } from "./countdown-timer"
import { IoIosArrowDown } from "react-icons/io"
import { MdBorderColor } from "react-icons/md";
import { useAuth } from "../../hooks/use-auth";
import { useRestaurantData } from "../../context/restaurant-data/restaurant-data-context";

export const DashboardCards = ({
    orders,
    activePanel,
    setActivePanel,
    onAcceptOrder,
    onCancelOrder,
    onOrderReady,
    onOrderDelivered
}: DashboardCardOrdersProps) => {

    const { user } = useAuth();
    const { restaurantData } = useRestaurantData();
    const restaurantNameSlug = restaurantData?.user.restaurantName?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    const cards = useMemo(() => [
        {
            id: 0,
            name: "Aguardando aprovação",
            status: "aguardando_aprovacao",
            color: "bg-yellow-500",
            titleColor: "text-black",
            textColor: "text-black"
        },
        {
            id: 1,
            name: "Em preparação",
            status: "em_preparo",
            color: "bg-blue-500",
            titleColor: "text-black",
            textColor: "text-black"
        },
        {
            id: 2,
            name: "Prontos",
            status: ["pronto_para_retirada", "a_caminho"],
            color: "bg-green-500",
            titleColor: "text-black",
            textColor: "text-black"
        },
        {
            id: 3,
            name: "Entregues",
            status: "entregue",
            color: "bg-green-800",
            titleColor: "text-white",
            textColor: "text-zinc-300"
        },
        {
            id: 4,
            name: "Cancelados",
            status: ["cancelado", "cancelado_automaticamente"],
            color: "bg-red-600",
            titleColor: "text-white",
            textColor: "text-zinc-300"
        },
    ], []);

    const togglePanel = (panelIndex: number) => {
        setActivePanel((prev) =>
            prev.includes(panelIndex)
                ? prev.filter((id) => id !== panelIndex)
                : [...prev, panelIndex]
        );
    };

    const alertAudioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const aguardandoCard = cards.find(card => card.id === 0);
        const aguardandoOrders = Array.isArray(aguardandoCard?.status)
            ? orders.filter(order => aguardandoCard.status.includes(order.status))
            : orders.filter(order => order.status === aguardandoCard?.status);

        if (aguardandoOrders.length > 0) {
            if (alertAudioRef.current) {
                alertAudioRef.current.currentTime = 0;
                alertAudioRef.current.play();
            }
        } else {
            if (alertAudioRef.current) {
                alertAudioRef.current.pause();
                alertAudioRef.current.currentTime = 0;
            }
        }
    }, [orders, cards]);

    return (
        <div className="w-full h-full flex flex-col items-center">
            <audio ref={alertAudioRef} src="./alert.mp3" preload="auto" />
            <ul className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6 pb-20 mx-auto items-start">
                <li className={`w-full col-span-full mb-5 text-black dark:text-white rounded-xl relative border-1 dark:bg-[#0D1117] border-black dark:border-white transition-all hover:scale-103 cursor-pointer`}>
                    <a
                        className="flex w-full h-full max-h-[36px] items-center justify-between gap-2 p-2"
                        href={`${restaurantNameSlug}/73980911/${user?.id}`}
                        target="_blank"
                    >
                        <h4 className="w-full flex flex-2 items-center justify-center gap-3 text-xl text-center">
                            <MdBorderColor style={{ display: 'inline' }} />
                            Fazer pedido
                        </h4>
                    </a>
                </li>
                {cards.map((card, index) => {
                    const cardOrders = Array.isArray(card.status)
                        ? orders.filter(order => card.status.includes(order.status))
                        : orders.filter(order => order.status === card.status);
                    return (
                        <li
                            key={index}
                            className={`w-full ${card.titleColor} rounded-xl relative ${activePanel.includes(card.id) ? '' : 'max-h-[70px]'} ${card.id === 0 && cardOrders.length > 0 ? 'order-alert' : ''} ${card.color}`}
                        >
                            {card.id === 0 && cardOrders.length > 0 && (
                                <span className="text-base text-red-500 absolute top-[-27px] text-alert">
                                    Novo pedido
                                </span>
                            )}
                            <div className="flex items-center justify-between gap-2 p-2">
                                <IoIosArrowDown
                                    className={`text-2xl cursor-pointer transition-all duration-300 ${activePanel.includes(card.id) ? 'rotate-180' : ''}`}
                                    onClick={() => togglePanel(card.id)}
                                />
                                <h5 className="flex-2 text-xl">
                                    {card.name}
                                </h5>
                                <span className="w-7 h-7 rounded-full flex items-center justify-center bg-white text-black text-sm">
                                    {cardOrders.length}
                                </span>
                            </div>
                            {cardOrders.length === 0 ? (
                                <p className={`text-center py-4 ${activePanel.includes(card.id) ? 'block' : 'hidden'}`}>
                                    Nenhum pedido
                                </p>
                            ) : (
                                <div className={`${card.textColor} flex flex-col items-center px-4 ${activePanel.includes(card.id) ? 'block' : 'hidden'}`}>
                                    {cardOrders.map((order, orderIndex) => (
                                        <div key={orderIndex} className={`w-full relative flex flex-col items-start gap-2 px-2.5 pt-4 py-2 border-y-[1px] border-white`}>
                                            <h5 className="text-lg font-bold text-center mx-auto px-2 border-b-2 border-black">
                                                {order.customerName}
                                            </h5>
                                            {card.name === "Aguardando aprovação" && (
                                                <CountdownTimer createdAt={order.createdAt} durationSeconds={600} />
                                            )}
                                            <ul className="w-full">
                                                <li>
                                                    <span className="font-bold border-l-2 border-black px-2">Items:</span>
                                                </li>
                                                {order.orderItems.map((item, index) => (
                                                    <li
                                                        key={item.id}
                                                        className={`w-full rounded-sm flex justify-between items-center px-2.5 ${index % 2 === 0 ? 'bg-white/30' : ''}`}
                                                    >
                                                        <p>- {item.menuItem.name}</p>
                                                        <p className="text-sm">{toMoney(Number(item.menuItem.price))}</p>
                                                    </li>
                                                ))}
                                                <li className="flex justify-end">
                                                    <span className="font-bold pr-2">
                                                        Total: {toMoney(Number(order.totalAmount))}
                                                    </span>
                                                </li>
                                            </ul>
                                            <p className="border-l-2 border-black px-2">
                                                <span className="font-bold">pagamento: </span>{order.paymentMethod}
                                            </p>
                                            <p className="border-l-2 border-black px-2">
                                                <span className="font-bold">tipo: </span>{order.deliveryType}
                                            </p>
                                            <p className="border-l-2 border-black px-2">
                                                <span className="font-bold">endereço: </span>{order.address}
                                            </p>
                                            {card.status === "aguardando_aprovacao" && (
                                                <div className="w-full flex justify-center gap-3 mt-2 mb-1">
                                                    <button className="bg-green-600 border-2 border-green-900 text-white px-2 py-1 rounded-full cursor-pointer hover:scale-105 transition-all duration-300" onClick={() => onAcceptOrder(order.id)}>Aceitar</button>
                                                    <button className="bg-red-600 text-white px-2 rounded-full cursor-pointer hover:scale-105 transition-all duration-300" onClick={() => onCancelOrder(order.id)}>Recusar</button>
                                                </div>
                                            )}
                                            {card.status === "em_preparo" && (
                                                <div className="w-full flex justify-center gap-3 mt-2 mb-1">
                                                    <button className="bg-green-600 border-2 border-green-900 text-white px-2 py-1 rounded-full cursor-pointer hover:scale-105 transition-all duration-300" onClick={() => onOrderReady(order.id)}>Pedido pronto</button>
                                                    <button className="bg-red-600 text-white px-2 rounded-full cursor-pointer hover:scale-105 transition-all duration-300" onClick={() => onCancelOrder(order.id)}>Cancelar pedido</button>
                                                </div>
                                            )}
                                            {Array.isArray(card.status) && card.status.includes(order.status) && card.name !== "Cancelados" && (
                                                <div className="w-full flex justify-center gap-3 mt-2 mb-1">
                                                    <button className="bg-green-600 border-2 border-green-900 text-white px-2 py-1 rounded-full cursor-pointer hover:scale-105 transition-all duration-300" onClick={() => onOrderDelivered(order.id)}>Pedido entregue</button>
                                                    <button className="bg-red-600 text-white px-2 rounded-full cursor-pointer hover:scale-105 transition-all duration-300" onClick={() => onCancelOrder(order.id)}>Cancelar pedido</button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};
