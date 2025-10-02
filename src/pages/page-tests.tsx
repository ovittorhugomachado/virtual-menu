import { PieChartsPanel } from "../components/store-side/reports/reports-pie-charts-panel";
import { ReportStatistics } from "../components/store-side/reports/reports-statistics";

export const TestPage = () => {
    return (
        <div className="w-full flex flex-col items-center bg-zinc-200 dark:bg-[#161A21]">
            <ReportStatistics />
            <PieChartsPanel />
        </div>
    );
};