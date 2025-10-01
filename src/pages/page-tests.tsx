import { PieBorderChart } from "../components/store-side/reports/reports-pie-charts";
import { PizzaChart } from "../components/store-side/reports/reports-pizza-chart";
//import { PizzaChart } from "../components/store-side/reports/reports-pizza-chart";
import { ReportStatistics } from "../components/store-side/reports/reports-statistics";

export const TestPage = () => {

    return (
        <>
            <ReportStatistics />
            <PizzaChart />

        </>
    );
};