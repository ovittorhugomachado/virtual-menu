import { useEffect, useState } from "react";
import { CountdownTimerProps } from "../../types/types-orders.d";

export const CountdownTimer = ({ createdAt, durationSeconds }: CountdownTimerProps) => {
    const [secondsLeft, setSecondsLeft] = useState(durationSeconds);

    useEffect(() => {
        const created = new Date(createdAt).getTime();
        const end = created + durationSeconds * 1000;

        const update = () => {
            const now = Date.now();
            const diff = Math.max(0, Math.floor((end - now) / 1000));
            setSecondsLeft(diff);
        };

        update();
        const interval = setInterval(update, 1000);
        return () => clearInterval(interval);
    }, [createdAt, durationSeconds]);

    const min = Math.floor(secondsLeft / 60);
    const sec = secondsLeft % 60;

    const radius = 18;
    const circumference = 2 * Math.PI * radius;
    const percent = secondsLeft / durationSeconds;
    const strokeDashoffset = circumference * (1 - percent);

    return (
        <div className="w-20 h-20 text-sm absolute right-0 top-0 -translate-y-2 translate-x-5 flex flex-col items-center justify-center">
            <svg width={80} height={80}>
                <circle
                    cx={40}
                    cy={40}
                    r={radius}
                    stroke="#e5e7eb"
                    strokeWidth={4}
                    fill="none"
                />
                <circle
                    cx={40}
                    cy={40}
                    r={radius}
                    stroke="#E7000B"
                    strokeWidth={4}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    style={{ transition: "stroke-dashoffset 1s linear" }}
                    transform="rotate(-90 40 40)"
                />
                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dy=".3em"
                    fontSize="0.95em"
                    fill="#E7000B"
                    fontWeight="bold"
                >
                    {min}:{sec.toString().padStart(2, "0")}
                </text>
            </svg>
        </div>
    );
};