import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface PieChartData {
    name: string;
    value: number;
    color: string;
}

interface PieChartProps {
    data: PieChartData[];
    onlyEgde: boolean;
    title?: string;
    height?: number;
}

export const PieBorderChart: React.FC<PieChartProps> = ({
    data,
    onlyEgde
}) => {
    const totalValue = data.reduce((acc, curr) => acc + curr.value, 0);

    const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, value }: any) => {
        const RADIAN = Math.PI / 180;

        const radius = outerRadius + 20

        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        const percentage = ((value / totalValue) * 100).toFixed(1);

        const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

        return (
            <text
                x={x}
                y={y}
                fill={isDarkMode ? "white" : "black"}
                textAnchor={(x > cx ? "start" : "end")}
                dominantBaseline="central"
                fontSize={13}
                fontWeight="bold"
            >
                {`${percentage}%`}
            </text>
        );
    };

    return (
        <>
            <div className="w-full mx-auto focus:outline-none outline-none pointer-events-none relative">
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={data.map(item => ({
                                ...item,
                                percent: item.value / totalValue,
                            }))}
                            cx="50%"
                            cy="50%"
                            stroke="none"
                            labelLine={true}
                            label={renderCustomizedLabel}
                            outerRadius={300 * 0.30}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                {onlyEgde &&
                    <div className="inner-border-circle bg-gray-200/35 dark:bg-[#0D1117]/35">
                        <div className="centered-circle bg-gray-200 dark:bg-[#0D1117]" />
                    </div>
                }
            </div>
            <div className="flex justify-center flex-wrap gap-5 mx-6 pb-4 -translate-y-4">
                {data.map((data, index: number) => {
                    return (
                        <div key={index} className="flex flex-1 items-center gap-1 mb-1">
                            <div
                                className="w-2 h-6"
                                style={{ backgroundColor: data.color }}
                            />
                            <span className="font-extralight whitespace-nowrap">
                                <span className="font-semibold text-lg">{data.name}:</span> R$ {data.value}
                            </span>
                        </div>
                    );
                })}
            </div>
        </>
    );
};