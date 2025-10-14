import { CustomDatePicker } from "./reports-date-picker";
import "react-datepicker/dist/react-datepicker.css";

type ReportStatisticsProps = {
    dateOf?: Date;
    dateUntil?: Date;
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

    const mockData: ReportStatisticsProps = {
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
                title: "Pedidos",
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
                    { value: "Pizza de Calabresa", label: "30 vendidos" }
                ],
            },
        ],
    };

    return (
        <>
            <div className="w-full flex flex-col items-center">
                <CustomDatePicker
                    filterType="date-range"
                    onDateChange={(value) => console.log(value)} // { type: "range", start: Date, end: Date }
                />
                <div className="w-full max-w-[1400px] px-4 flex flex-wrap justify-center">
                    {mockData.blocks.map((block, index) => (
                        <div
                            key={index}
                            className="mt-16 mx-3 flex flex-1 flex-col ms:flex-row relative border-1 border-gray-600 dark:border-gray-300 rounded-xl"
                        >
                            <div
                                style={{
                                    backgroundColor: block.color,
                                    height: "calc(100% + 27px)",
                                }}
                                className="w-3 absolute -top-6.5 left-4"
                            >
                                <h5 className="ml-4 font-semibold whitespace-nowrap">{block.title}</h5>
                            </div>
                            {block.statistics.map((stat, statIndex) => {
                                const isTwoItems = block.statistics.length === 2;

                                const shouldRemoveRightRadius = isTwoItems && statIndex === 0;
                                const shouldRemoveLeftRadius = isTwoItems && statIndex === 1;

                                return (
                                    <div
                                        key={statIndex}
                                        className={`w-full min-w-56 h-18 ms:h-26 flex flex-col items-center justify-center px-4 py-4 z-1 bg-[#F9F9F9] dark:bg-[#0D1117] border-b-1 ms:border-b-none ms:border-r dark:border-gray-300 border-gray-800 ms:last:border-none
                                            ${isTwoItems ? 'w-1/2' : 'w-full'}
                                            ${shouldRemoveRightRadius ? 'rounded-t-xl ms:rounded-l-xl ms:border-b-none ms:rounded-t-none' : ''}
                                            ${shouldRemoveLeftRadius ? 'rounded-b-xl ms:rounded-r-xl ms:rounded-l-none' : ''}
                                            ${!isTwoItems ? 'rounded-xl' : ''}
                                        `}
                                    >
                                        <h4 className="text-center text-xl mx-6 font-bold dark:text-white whitespace-nowrap">
                                            {stat.value}
                                        </h4>
                                        <span className="text-sm dark:text-gray-300 whitespace-nowrap">
                                            {stat.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};