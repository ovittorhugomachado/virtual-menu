import { useEffect, useState } from "react";
import { BarChartContainer } from "./reports-bar-chart";

export const BarChartsPanel = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(window.matchMedia("(max-width: 530px)").matches);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 1050px)");

        const handleResize = () => {
            setIsSmallScreen(mediaQuery.matches);
        };

        mediaQuery.addEventListener("change", handleResize);

        return () => {
            mediaQuery.removeEventListener("change", handleResize);
        };
    }, []);
    
    const mockData = {
        blocks: [
            {
                title: "Pratos mais vendidos",
                color: "#004AAD",
                barColor: "#B03591",
                statistics: [
                    { name: "A la minuta", quantity: 32 },
                    { name: "Pizza", quantity: 13 },
                    { name: "Coca Cola", quantity: 5 },
                    { name: "Hambúrguer", quantity: 20 },
                    { name: "Batata Frita", quantity: 15 },
                    { name: "Refrigerante", quantity: 10 },
                ],
            },
            {
                title: "Pedidos por semana",
                color: "#004AAD",
                barColor: "#03D219",
                isHorizontal: false,
                statistics: [
                    { name: "Seg", quantity: 32 },
                    { name: "Ter", quantity: 13 },
                    { name: "Qua", quantity: 5 },
                    { name: "Qui", quantity: 20 },
                    { name: "Sex", quantity: 15 },
                    { name: "Sab", quantity: 10 },
                    { name: "Dom", quantity: 10 },
                ],
            },
            {
                title: "Pedidos por mês",
                color: "#004AAD",
                barColor: "#00909B",
                isHorizontal: false,
                rotateIn: "1050px",
                flexValue: 3,
                statistics: [
                    { name: isSmallScreen ? "Janeiro" : "Jan", quantity: 32 },
                    { name: isSmallScreen ? "Fevereiro" : "Fev", quantity: 13 },
                    { name: isSmallScreen ? "Março" : "Mar", quantity: 5 },
                    { name: isSmallScreen ? "Abril" : "Abr", quantity: 20 },
                    { name: isSmallScreen ? "Maio" : "Mai", quantity: 15 },
                    { name: isSmallScreen ? "Junho" : "Jun", quantity: 10 },
                    { name: isSmallScreen ? "Julho" : "Jul", quantity: 10 },
                    { name: isSmallScreen ? "Agosto" : "Ago", quantity: 10 },
                    { name: isSmallScreen ? "Setembro" : "Set", quantity: 10 },
                    { name: isSmallScreen ? "Outubro" : "Out", quantity: 10 },
                    { name: isSmallScreen ? "Novembro" : "Nov", quantity: 10 },
                    { name: isSmallScreen ? "Dezembro" : "Dez", quantity: 10 },
                ],
            },
            {
                title: "Pedidos por hora",
                color: "#004AAD",
                barColor: "#00909B",
                isHorizontal: false,
                rotateIn: "1329px",
                flexValue: 4,
                statistics: [
                    { name: "00:00", quantity: 0 },
                    { name: "01:00", quantity: 2 },
                    { name: "02:00", quantity: 1 },
                    { name: "03:00", quantity: 0 },
                    { name: "04:00", quantity: 0 },
                    { name: "05:00", quantity: 3 },
                    { name: "06:00", quantity: 8 },
                    { name: "07:00", quantity: 15 },
                    { name: "08:00", quantity: 22 },
                    { name: "09:00", quantity: 18 },
                    { name: "10:00", quantity: 25 },
                    { name: "11:00", quantity: 32 },
                    { name: "12:00", quantity: 45 },
                    { name: "13:00", quantity: 38 },
                    { name: "14:00", quantity: 28 },
                    { name: "15:00", quantity: 20 },
                    { name: "16:00", quantity: 25 },
                    { name: "17:00", quantity: 30 },
                    { name: "18:00", quantity: 42 },
                    { name: "19:00", quantity: 35 },
                    { name: "20:00", quantity: 28 },
                    { name: "21:00", quantity: 20 },
                    { name: "22:00", quantity: 12 },
                    { name: "23:00", quantity: 5 }
                ],
            },
        ],
    };

    return (
        <div className="w-full max-w-[1400px] px-4 mb-12 flex flex-wrap justify-center">
            {mockData.blocks.map((block, index) => (
                <BarChartContainer
                    key={index}
                    title={block.title}
                    color={block.color}
                    barColor={block.barColor}
                    isHorizontal={block.isHorizontal}
                    rotateIn={block.rotateIn}
                    flexValue={block.flexValue}
                    statistics={block.statistics}
                />
            ))}
        </div>
    );
};