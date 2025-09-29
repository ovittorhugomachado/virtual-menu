import { useState } from "react";
import { CustomDatePicker } from "./date-picker";
import "react-datepicker/dist/react-datepicker.css";

type ReportStatisticsProps = {
    dateOf: Date;
    dateUntil: Date;
    blocks: {
        title: string;
        color: string;
        statistics: {
            value: string | number;
            label: string;
        }[];
    }[];
};

export const ReportStatistics = () => {
    const [startDate, setStartDate] = useState(new Date(2025, 8, 1)); // Data inicial
    const [endDate, setEndDate] = useState(new Date(2025, 8, 30)); // Data final

    const mockData: ReportStatisticsProps = {
        dateOf: startDate,
        dateUntil: endDate,
        blocks: [
            {
                title: "Faturamento",
                color: "#01A71B",
                statistics: [
                    { value: "R$ 950,00", label: "Total vendido" },
                    { value: "R$ 39,60", label: "Ticket médio" },
                ],
            },
            {
                title: "Faturamento",
                color: "#004AAD",
                statistics: [
                    { value: "19", label: "Pedidos" },
                    { value: "11", label: "Clientes" },
                ],
            },
            {
                title: "Campeão de vendas",
                color: "#FBFF36",
                statistics: [
                    { value: "A la Minuta", label: "30 vendidos" }
                ],
            },
            // {
            //     statistics: [
            //         { value: 15, label: "Pedidos cancelados" },
            //         { value: "R$ 1.234,56", label: "Reembolsos" },
            //     ],
            // },
        ],
    };

    const handleDateChange = (startDate: Date, endDate: Date) => {
        console.log("Data inicial:", startDate);
        console.log("Data final:", endDate);
    };

    return (
        <>
            <CustomDatePicker onDateChange={handleDateChange} />
            <div className="flex flex-col">
                <h1 className="w-full flex justify-center mb-16">Relatório de Estatísticas</h1>
                <div className="w-full flex flex-wrap justify-center">
                    {mockData.blocks.map((block, index) => (
                        <div
                            className="min-w-80 max-w-120 h-40 ms:h-30 mt-16 mx-3 flex flex-col ms:flex-row relative bg-black border-2 border-gray-300 rounded-xl"
                        >
                            <div
                                style={{ backgroundColor: block.color }}
                                className="w-3 h-48 ms:h-38 z-[-1] absolute -top-7 left-4"
                            >
                                <h4 className="ml-4 -translate-y-1 font-semibold">{block.title}</h4>
                            </div>
                            {block.statistics.map((stat, statIndex) => (
                                <div
                                    key={statIndex}
                                    className={`w-full flex flex-col items-center justify-center h-full border-b ms:border-r border-gray-300 last:border-none px-4 ${block.statistics.length > 1 ? 'w-1/2' : 'w-full'}`}
                                >
                                    <h3 className="text-center text-2xl mx-6 font-bold text-white whitespace-nowrap">{stat.value}</h3>
                                    <span className="text-sm text-gray-300 whitespace-nowrap">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    ))}

                    {/* <div
                        className="max-w-120 h-36 mx-3 relative bg-black border-2 border-gray-300 rounded-xl"
                    >
                        <div className="w-3 h-44 bg-red-600 z-[-1] absolute -top-7 left-4"></div>

                    </div> */}
                </div>
            </div>
        </>
    );
};