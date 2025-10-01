import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import { PieBorderChart } from "./reports-pie-charts";

ChartJS.register(ArcElement, Tooltip, Legend);

type ReportPizzaChartProps = {
    dateOf?: Date;
    dateUntil?: Date;
    blocks: {
        title: string;
        onlyEgde: boolean;
        color: string;
        statistics: {
            name: string;
            value: number;
            color: string;
        }[];
    }[];
};

export const PizzaChart = () => {

    const mockData: ReportPizzaChartProps = {
        blocks: [
            {
                title: "Método de pagamento",
                onlyEgde: true,
                color: "#01A71B",
                statistics: [
                    { name: "Cartão", value: 3800, color: "#0FD529" },
                    { name: "Boleto", value: 8813, color: "#004AAD" },
                    { name: "Pix", value: 2518, color: "#FF18C5" },
                    { name: "Boleto", value: 8813, color: "#004AAD" },
                    { name: "Pix", value: 2518, color: "#FF18C5" },
                    { name: "Boleto", value: 8813, color: "#004AAD" },
                    { name: "Pix", value: 2518, color: "#FF18C5" },
                ],
            },
            {
                title: "Categorias mais vendidas",
                onlyEgde: false,
                color: "#004AAD",
                statistics: [
                    { name: "Cartão", value: 3800, color: "#0FD529" },
                    { name: "Boleto", value: 8813, color: "#004AAD" },
                    { name: "Pix", value: 2518, color: "#FF18C5" },
                    { name: "Cartão", value: 3800, color: "#0FD529" },
                    { name: "Boleto", value: 8813, color: "#004AAD" },
                    { name: "Pix", value: 2518, color: "#FF18C5" },
                    { name: "Cartão", value: 3800, color: "#0FD529" },
                    { name: "Boleto", value: 8813, color: "#004AAD" },
                    { name: "Pix", value: 2518, color: "#FF18C5" },

                ],
            },
        ],
    };

    return (
        <div className="w-full flex flex-col items-center bg-zinc-200 dark:bg-[#161A21]">
            <div className="w-full max-w-[1440px] px-4 flex flex-wrap justify-center">
                {mockData.blocks.map((block, index) => (
                    <div
                        key={index}
                        className="min-w-90 max-w-190 mt-16 mx-3 flex flex-1 flex-col ms:flex-row relative border-1 border-gray-600 dark:border-gray-300 rounded-xl"
                    >
                        <div
                            style={{
                                backgroundColor: block.color,
                                height: "calc(100% + 27px)",
                            }}
                            className="w-3 absolute -top-6.5 left-4"
                        >
                            <h5 className="ml-4 font-semibold whitespace-nowrap">
                                {block.title}
                            </h5>
                        </div>
                        <div className="w-full rounded-xl z-1 bg-zinc-200 dark:bg-[#0D1117] flex flex-col justify-center items-center">
                            <PieBorderChart
                                data={block.statistics}
                                onlyEgde={block.onlyEgde}
                                title="Métodos de Pagamento"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};