import { Component, Input, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.less']
})
export class ChartComponent implements OnInit {
  @Input({ required: true }) chartName!: string;
  @Input({ required: true }) chartConfigs!: ChartConfiguration;


  chart!: Chart;

  constructor() { }

  ngOnInit(): void {
      this.createChart();
  }

  createChart() {
    this.chart = new Chart("my-chart", this.chartConfigs);
  }
}
