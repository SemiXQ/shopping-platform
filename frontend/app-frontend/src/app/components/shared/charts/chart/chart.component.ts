import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.less']
})
export class ChartComponent implements OnInit, AfterViewInit {
  @Input({ required: true }) chartName!: string;
  @Input({ required: true }) chartId!: string;
  @Input({ required: true }) chartConfigs!: ChartConfiguration;


  chart!: Chart;

  constructor() { }

  ngOnInit(): void {
      //this.createChart();
  }

  ngAfterViewInit(): void {
      if(this.chartId !== undefined) {
        this.createChart();
      }
  }

  createChart() {
    this.chart = new Chart(this.chartId, this.chartConfigs);
  }
}
