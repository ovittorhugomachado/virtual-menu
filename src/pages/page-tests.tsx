import { Header } from "../components/component-header";
import { PieChartsPanel } from "../components/store-side/reports/reports-pie-charts-panel";
import { ReportStatistics } from "../components/store-side/reports/reports-statistics";

export const TestPage = () => {
    return (
        <div className="w-full flex flex-col items-center">
            <Header />
            <main className="w-full flex flex-col items-center bg-[#F9F9F9] dark:bg-[#161A21] shadow-2xl dark:shadow-none shadow-black">
                <ReportStatistics />
                <PieChartsPanel />
            </main>
        </div>
    );
};