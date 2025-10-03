import React, { useEffect, useState } from "react";
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
    rotateIn?: string; //PRA TRANSFORMAR EM HORIZONTAL OU VERTICAL DEPENDENDO DA LARGURA
    minWidth?: string;
    barColor: string;
    barWidth?: number;
    flexValue?: number;
    statistics: BarChartData[];
}

export const BarChartContainer: React.FC<SingleBarChartProps> = ({
    title,
    color,
    barColor,
    isHorizontal = true,
    rotateIn,
    minWidth,
    flexValue = 1,
    statistics,
}) => {
    console.log("BAR CHARTS CONTAINER")
    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const [horizontal, setHorizontal] = useState(isHorizontal);

    useEffect(() => {
        if (!rotateIn) return;

        const mediaQuery = window.matchMedia(`(max-width: ${rotateIn})`);

        const handleResize = () => {
            setHorizontal(mediaQuery.matches);
        };

        mediaQuery.addEventListener("change", handleResize);

        handleResize();

        return () => {
            mediaQuery.removeEventListener("change", handleResize);
        };
    }, [rotateIn]);

    const colorObj = Color(barColor);
    const startColor = colorObj.darken(0.4).hex();
    const endColor = colorObj.darken(0).hex();

    const gradientId = `barGradient-${title.replace(/\s+/g, "-").toLowerCase()}`;

    const processedData = statistics.map((item) => ({
        ...item,
        name: !horizontal && item.name.length > 5 ? item.name.slice(0, 5) + "…" : item.name,
    }));

    // //CALCULA A ALTURA DO CONTAINER DO GRÁFICO
    // const getContainerChartHeight = (dataLength: number) => {
    //     if (dataLength > 16 && horizontal) return 700;
    //     if (dataLength > 11 && horizontal) return 360;
    //     if (dataLength > 7 && horizontal) return 400;
    //     return 300;
    // };

    //CALCULA A ALTURA DO GRÁFICO
    const getChartHeight = (dataLength: number) => {
        if (dataLength > 16 && horizontal) return 700;
        if (dataLength > 12 && horizontal) return 500;
        if (dataLength > 7 && horizontal) return 400;
        return 300;
    };

    return (
        <div
            style={{ minWidth: minWidth }}
            id="container-bar-chart"
            className={`flex-${flexValue} w-full mt-4 mb-12 mx-3 flex flex-col ms:flex-row relative border-1 border-gray-600 dark:border-gray-300 rounded-xl`}
        >
            <div
                style={{
                    backgroundColor: color,
                    height: "calc(100% + 27px)",
                }}
                className="w-3 absolute -top-6.5 left-4"
            >
                <h5 className="ml-4 font-semibold whitespace-nowrap">{title}</h5>
            </div>
            <div
                id="bar-chart"
                className="w-full rounded-xl z-1 bg-[#F9F9F9] dark:bg-[#0D1117] flex flex-col justify-center items-center"
            // style={{ height: getContainerChartHeight(statistics.length) }}
            >
                <div className="w-full pr-4 mx-auto focus:outline-none outline-none pointer-events-none relative">
                    <ResponsiveContainer
                        className={"bar-chart"}
                        width="100%"
                        height={getChartHeight(statistics.length)}>
                        <BarChart
                            data={processedData}
                            layout={horizontal ? "vertical" : "horizontal"}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 5,
                                bottom: 5,
                            }}
                            barSize={horizontal ? 10 : 30}
                        >
                            {!horizontal && (
                                <defs>
                                    <linearGradient
                                        id={gradientId}
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
                            {horizontal ? (
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
                                fill={horizontal ? barColor : `url(#${gradientId})`}
                                radius={horizontal ? [0, 4, 4, 0] : [4, 4, 0, 0]}
                            >
                                <LabelList
                                    dataKey="quantity"
                                    position={horizontal ? "right" : "top"}
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