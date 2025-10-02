
//import { Header } from "../components/component-header";
import { BarChartContainer } from "../components/store-side/reports/reports-bar-chart";
import { BarChartsPanel } from "../components/store-side/reports/reports-bar-chart-panel";

export const TestPage = () => {
    return (
        <div className="w-full flex flex-col items-center">
            {/* <Header /> */}
            <main className="w-full px-6 flex flex-col items-center bg-[#F9F9F9] dark:bg-[#161A21] shadow-2xl dark:shadow-none shadow-black">
                <BarChartsPanel />
            </main>
        </div>
    );
};