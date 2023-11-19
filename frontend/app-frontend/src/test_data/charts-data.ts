import { ChartData } from 'chart.js'
import { MONTHS } from 'src/app/data/constants/shared_constants';
import { ChartDataWithName } from 'src/app/data/interfaces/chartInterfaces';

export type ChartDataDict = {
    [key: string]: ChartDataWithName;
}

const _bottomsTrendName: string = "Bottoms sale in the previous 8 months"

const _bottomsTrend: ChartData = {
    labels: MONTHS.slice(2, 10),
    datasets: [
        {
            label: "jeans",
            data: [467,576, 572, 79, 92, 574, 573, 576],
            backgroundColor: "rgba(17, 138, 178, 0.75)",
            fill: false,
            borderColor: "#118AB2",
            tension: 0.1
        },
        {
            label: "shorts",
            data: [237, 349, 470, 512, 528, 539, 216, 153],
            backgroundColor: "rgba(255, 209, 102, 0.75)",
            fill: false,
            borderColor: "#FFD166",
            tension: 0.1
        },
        {
            label: "dresses",
            data: [542, 542, 536, 327, 17, 0.00, 538, 541],
            backgroundColor: "rgba(239, 71, 111, 0.75)",
            fill: false,
            borderColor: "#EF476F",
            tension: 0.1
        }
    ]
};

export const trendData: ChartDataDict = {
    bottom: {name: _bottomsTrendName, chartData: _bottomsTrend},
};