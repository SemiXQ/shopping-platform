import { ChartData } from 'chart.js'
import { MONTHS } from 'src/app/data/constants/shared_constants';

type ChartDataDict = {
    [key: string]: ChartData;
}

const _bottomsTrend: ChartData = {
    labels: MONTHS.slice(2, 10),
    datasets: [
        {
            label: "jeans",
            data: [467,576, 572, 79, 92, 574, 573, 576],
            backgroundColor: '#118AB2'
        },
        {
            label: "shorts",
            data: [237, 349, 470, 512, 528, 539, 216, 153],
            backgroundColor: "#FFD166"
        },
        {
            label: "dresses",
            data: [542, 542, 536, 327, 17, 0.00, 538, 541],
            backgroundColor: "EF476F"
        }
    ]
};

export const trendData: ChartDataDict = {
    bottom: _bottomsTrend,
};