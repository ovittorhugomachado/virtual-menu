import { PieChartContainer } from "./reports-pie-chart"

export const PieChartsPanel = () => {

    const mockData = {
        blocks: [
            {
                title: "Método de pagamento",
                onlyEdge: true,
                color: "#01A71B",
                statistics: [
                    { name: "Cartão", value: 3800, color: "#0FD529" },
                    { name: "Boleto", value: 8813, color: "#004AAD" },
                    { name: "Pix", value: 2518, color: "#FF18C5" },
                ],
            },
            {
                title: "Categorias mais vendidas",
                onlyEdge: false,
                color: "#004AAD",
                statistics: [
                    { name: "Pratos", value: 38, color: "#0FD529" },
                    { name: "Promoções", value: 23, color: "#5303bc" },
                    { name: "bebidas", value: 18, color: "#e6ea02" },
                    { name: "Sobremesas", value: 13, color: "#004AAD" },
                    { name: "Pizzas", value: 2, color: "#FF18C5" },
                ],
            },
        ],
    };
    
    return (
        <div className="w-full max-w-[1400px] px-4 mb-12 flex flex-wrap justify-center">
            {mockData.blocks.map((block, index) => (
                <PieChartContainer
                    key={index}
                    title={block.title}
                    onlyEdge={block.onlyEdge}
                    color={block.color}
                    statistics={block.statistics}
                />
            ))}
        </div>
    )
}