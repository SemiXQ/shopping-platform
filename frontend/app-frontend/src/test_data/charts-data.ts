import { ChartData } from 'chart.js'
import { MONTHS } from 'src/app/data/constants/shared_constants';
import { ChartDataWithName } from 'src/app/data/interfaces/chartInterfaces';

export type ChartDataDict = {
    [key: string]: ChartDataWithName;
}

const _bottomsTrendName: string = "Bottoms sales in the previous 8 months";
const _jacketTrendName: string = "Jacket sales in the previous 8 months";
const _bottomTotalTrendName: string = "Bottoms sales amount in the previous 8 months";

const _bottomsTrend: ChartData = {
    labels: MONTHS.slice(2, 10),
    datasets: [
        {
            label: "Jeans",
            data: [467,576, 572, 79, 92, 574, 573, 576],
            backgroundColor: "rgba(17, 138, 178, 0.75)",
            fill: false,
            borderColor: "#118AB2",
            tension: 0.1
        },
        {
            label: "Shorts",
            data: [237, 349, 470, 512, 528, 539, 216, 153],
            backgroundColor: "rgba(255, 209, 102, 0.75)",
            fill: false,
            borderColor: "#FFD166",
            tension: 0.1
        },
        {
            label: "Dresses",
            data: [542, 542, 536, 327, 17, 0.00, 538, 541],
            backgroundColor: "rgba(239, 71, 111, 0.75)",
            fill: false,
            borderColor: "#EF476F",
            tension: 0.1
        }
    ]
};

const _bottomsTotalTrend: ChartData = {
    labels: ["Jeans", "Shorts", "Dresses"],
    datasets: [
        {
            label: "Bottom Total in previous 8 months",
            data: [3509, 3004, 3043],
            backgroundColor: [
                "rgba(17, 138, 178, 0.75)",
                "rgba(255, 209, 102, 0.75)",
                "rgba(239, 71, 111, 0.75)"
            ],
            hoverOffset: 4
        },
    ]
};

const _jacketTrend: ChartData = {
    labels: MONTHS.slice(2, 10),
    datasets: [
        {
            label: "Leather Jacket",
            data: [467,576, 572, 79, 92, 574, 573, 576],
            backgroundColor: "rgba(17, 138, 178, 0.75)",
            fill: false,
            borderColor: "#118AB2",
            tension: 0.1
        },
        {
            label: "Denim Jacket",
            data: [542, 542, 536, 327, 17, 539, 216, 153],
            backgroundColor: "rgba(255, 209, 102, 0.75)",
            fill: false,
            borderColor: "#FFD166",
            tension: 0.1
        }
    ]
};

export const trendData: ChartDataDict = {
    bottom: {name: _bottomsTrendName, chartData: _bottomsTrend},
    bottom_total: {name: _bottomTotalTrendName, chartData: _bottomsTotalTrend},
    jacket: {name: _jacketTrendName, chartData: _jacketTrend},
};