import { BsFillBarChartFill } from "react-icons/bs";
import { Header } from "../components/component-header";
import { PieChartsPanel } from "../components/store-side/reports/reports-pie-charts-panel";
import { ReportStatistics } from "../components/store-side/reports/reports-statistics";
import { BarChartsPanel } from "../components/store-side/reports/reports-bar-chart-panel";

export const ReportsPage = () => {
    return (
        <div className="w-full flex flex-col items-center">
            <Header />
            <main className="w-full pt-12 flex flex-col items-center bg-[#F9F9F9] dark:bg-[#161A21] shadow-2xl dark:shadow-none shadow-black">
                <div className="flex items-center justify-center pb-8">
                    <BsFillBarChartFill className="text-4xl hidden sm:block" />
                    <h1 className="text-4xl border-b-2 border-primary dark:border-white text-center mx-3">Relatórios</h1>
                </div>
                <ReportStatistics />
                <PieChartsPanel />
                <BarChartsPanel />
            </main>
        </div>
    );
};