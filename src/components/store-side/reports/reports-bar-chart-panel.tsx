import { BarChartContainer } from "./reports-bar-chart";

export const BarChartsPanel = () => {

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
        ]
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
                    statistics={block.statistics}
                />
            ))}
        </div>
    )
}