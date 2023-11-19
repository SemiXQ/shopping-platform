import { ChartConfiguration, ChartData, ChartOptions } from 'chart.js';

export enum ChartType {
    Bar = "bar",
    Line = "line",
    Scatter = "scatter",
    Donut = "doughnut",
    Pie = "pie"
}

export interface ChartConfigWithName {
    name: string,
    config: ChartConfiguration
}  

export interface ChartDataWithName {
    name: string,
    chartData: ChartData
}