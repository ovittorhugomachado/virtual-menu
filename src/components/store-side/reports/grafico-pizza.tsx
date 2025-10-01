import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface PieChartData {
    name: string;
    value: number;
    color: string;
}

interface CustomPieChartProps {
    data: PieChartData[];
    title?: string;
    height?: number;
}

export const CustomPieBorderChart: React.FC<CustomPieChartProps> = ({
    data,
    height = 300
}) => {
    const totalValue = data.reduce((acc, curr) => acc + curr.value, 0);

    return (
        <>
            <div className="w-full mx-auto focus:outline-none outline-none pointer-events-none relative">
                <ResponsiveContainer width="100%" height={height}>
                    <PieChart>
                        <Pie
                            data={data.map(item => ({
                                ...item,
                                percent: item.value / totalValue,
                            }))}
                            cx="50%"
                            cy="50%"
                            stroke="none"
                            labelLine={false}
                            outerRadius={height * 0.35}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                <div
                    className="absolute bg-white/30 dark:bg-[#0D1117]/30 rounded-full"
                    style={{
                        width: `${height * 0.55}px`,
                        height: `${height * 0.55}px`,
                        top: "50.4%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    <div
                        className="absolute bg-gray-200 dark:bg-[#0D1117] rounded-full"
                        style={{
                            width: `${height * 0.48}px`,
                            height: `${height * 0.48}px`,
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                        }}
                    />
                </div>
            </div>
            <div className="flex justify-center flex-wrap gap-5 mx-6 pb-4 -translate-y-4">
                {data.map((data, index: number) => {
                    const percentage = ((data.value / totalValue) * 100).toFixed(1);
                    return (
                        <div key={index} className="flex items-center gap-1 mb-1">
                            <div
                                className="w-2 h-6"
                                style={{ backgroundColor: data.color }}
                            />
                            <span className="font-extralight whitespace-nowrap">
                                <span className="font-semibold text-lg">{data.name}:</span> R${data.value} ({percentage}%)
                            </span>
                        </div>
                    );
                })}
            </div>
        </>
    );
};