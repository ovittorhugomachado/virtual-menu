import { BarChartContainer } from "./bar-chart/reports-bar-chart";
import mockData from "../../../json/mock-data.json"; // Importa o JSON
import { PieChartContainer } from "./pie-chart/reports-pie-chart";

export const ChartPanel = () => {
    // const [isSmallScreen, setIsSmallScreen] = useState(window.matchMedia("(max-width: 530px)").matches);

    // useEffect(() => {
    //     const mediaQuery = window.matchMedia("(max-width: 1050px)");

    //     const handleResize = () => {
    //         setIsSmallScreen(mediaQuery.matches);
    //     };

    //     mediaQuery.addEventListener("change", handleResize);

    //     return () => {
    //         mediaQuery.removeEventListener("change", handleResize);
    //     };
    // }, []);

    // Filtra os blocks com chartType: "bar"
    const barBlocks = mockData.blocks.filter((block) => block.chartType === "bar");
    const pieBlocks = mockData.blocks.filter((block) => block.chartType === "pie");

    return (
        <div className="w-full max-w-[1400px] mb-12 flex flex-col justify-center">
            <div className="w-full flex justify-center flex-wrap mb-16">
                {pieBlocks.map((block, index) => (
                    <PieChartContainer
                        key={index}
                        title={block.title}
                        onlyEdge={block.onlyEdge}
                        color={block.color}
                        statistics={block.statistics}
                    />
                ))}
            </div>
            <div className="w-full flex justify-center flex-wrap">
                {barBlocks.map((block, index) => (
                    <BarChartContainer
                        key={index}
                        title={block.title}
                        color={block.color}
                        barColor={block.barColor}
                        isHorizontal={block.isHorizontal}
                        rotateIn={block.rotateIn}
                        flexValue={block.flexValue}
                        dateFilter={
                            block.dateFilter &&
                                ["year", "single-date", "date-range"].includes(block.dateFilter)
                                ? (block.dateFilter as "year" | "single-date" | "date-range")
                                : undefined
                        }
                        statistics={block.statistics}
                    />
                ))}
            </div>
        </div>
    );
};