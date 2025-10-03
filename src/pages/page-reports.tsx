import { BsFillBarChartFill } from "react-icons/bs";
import { Header } from "../components/component-header";
import { PieChartsPanel } from "../components/store-side/reports/pie-chart/reports-pie-charts-panel";
import { ReportStatistics } from "../components/store-side/reports/reports-statistics";
import { BarChartsPanel } from "../components/store-side/reports/bar-chart/reports-bar-chart-panel";

export const ReportsPage = () => {

    return (
        <div className="w-full flex flex-col items-center">
            <Header />
            <main className="w-full pt-12 flex flex-col items-center bg-[#F9F9F9] dark:bg-[#161A21] shadow-2xl dark:shadow-none shadow-black">
                <div className="flex items-center justify-center pb-8">
                    <BsFillBarChartFill className="text-4xl hidden sm:block" />
                    <h1 className="text-4xl border-b-2 border-primary dark:border-white text-center mx-3">Relatórios</h1>
                </div>
                <div className="relative w-[95%]  max-w-[1400px] mt-4">
                    <h4 className="absolute whitespace-nowrap top-[-12px] left-1/2 transform -translate-x-1/2 bg-[#F9F9F9] dark:bg-[#161A21] px-4 z-50">
                        Resumo de vendas
                    </h4>
                    <div className="w-full h-[1px] bg-primary translate-y-1 z-1" />
                    <ReportStatistics />
                    <PieChartsPanel />
                </div>
                <div className="relative w-[95%] max-w-[1400px] flex flex-col mt-8 pt-12">
                    <h4 className="absolute whitespace-nowrap top-[-12px] left-1/2 transform -translate-x-1/2 bg-[#F9F9F9] dark:bg-[#161A21] px-4 z-50">
                        Relatório detalhado
                    </h4>
                    <div className="w-full h-[1px] absolute top-0 bg-primary z-1" />
                    <BarChartsPanel />
                </div>
            </main>
        </div>
    );
};