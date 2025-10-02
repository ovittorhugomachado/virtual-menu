import React from "react";
import Color from "color";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    LabelList,
} from "recharts";

interface BarChartData {
    name: string;
    quantity: number;
}

interface SingleBarChartProps {
    title: string;
    color: string;
    isHorizontal?: boolean;
    barColor: string;
    barWidth?: number;
    statistics: BarChartData[];
}

export const BarChartContainer: React.FC<SingleBarChartProps> = ({
    title,
    color,
    barColor,
    isHorizontal = true,
    statistics,
}) => {
    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const colorObj = Color(barColor);
    const startColor = colorObj.darken(0.4).hex();
    const endColor = colorObj.darken(0).hex();

    // Trunca o `name` para no máximo 5 caracteres quando !isHorizontal
    const processedData = statistics.map((item) => ({
        ...item,
        name: !isHorizontal && item.name.length > 5 ? item.name.slice(0, 5) + "…" : item.name,
    }));

    return (
        <div className="w-full min-w-85 max-w-220 mt-16 mx-3 flex flex-1 flex-col ms:flex-row relative border-1 border-gray-600 dark:border-gray-300 rounded-xl">
            <div
                style={{
                    backgroundColor: color,
                    height: "calc(100% + 27px)",
                }}
                className="w-3 absolute -top-6.5 left-4"
            >
                <h5 className="ml-4 font-semibold whitespace-nowrap">{title}</h5>
            </div>
            <div className="w-full rounded-xl z-1 bg-[#F9F9F9] dark:bg-[#0D1117] flex flex-col justify-center items-center">
                <div className="w-full mx-auto focus:outline-none outline-none pointer-events-none relative">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                            data={processedData} // Usa os dados processados
                            layout={isHorizontal ? "vertical" : "horizontal"}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 5,
                                bottom: 5,
                            }}
                            barSize={isHorizontal ? 10 : 30}
                        >
                            {!isHorizontal && (
                                <defs>
                                    <linearGradient
                                        id="barGradient"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop offset="0%" stopColor={endColor} />
                                        <stop offset="100%" stopColor={startColor} />
                                    </linearGradient>
                                </defs>
                            )}
                            {isHorizontal ? (
                                <>
                                    <XAxis type="number" />
                                    <YAxis
                                        dataKey="name"
                                        type="category"
                                        width={120}
                                        tick={{ fill: isDarkMode ? "white" : "black" }}
                                    />
                                </>
                            ) : (
                                <>
                                    <XAxis
                                        dataKey="name"
                                        type="category"
                                        tick={{ fill: isDarkMode ? "white" : "black" }}
                                    />
                                    <YAxis type="number" />
                                </>
                            )}
                            <Tooltip />
                            <Bar
                                dataKey="quantity"
                                fill={isHorizontal ? barColor : "url(#barGradient)"} // Cor sólida no horizontal
                                radius={isHorizontal ? [0, 4, 4, 0] : [4, 4, 0, 0]} // Ajusta os cantos arredondados
                            >
                                <LabelList
                                    dataKey="quantity"
                                    position={isHorizontal ? "right" : "top"}
                                    fill={isDarkMode ? "white" : "black"}
                                />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};