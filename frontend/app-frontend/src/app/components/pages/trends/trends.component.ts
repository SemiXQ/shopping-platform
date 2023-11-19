import { Component } from '@angular/core';
import { ChartService } from 'src/app/services/chart.service';
import { ChartConfiguration, ChartData, ChartOptions } from 'chart.js';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChartConfigWithName, ChartDataWithName, ChartType } from 'src/app/data/interfaces/chartInterfaces';

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.less']
})
export class TrendsComponent {
  // TODO: change to user input
  private readonly chartDataNames = ['bottom', 'bottom_total', 'jacket'];

  // TODO: customized for each table
  //private readonly _options: ChartOptions  = { aspectRatio:2.5 };
  private readonly _options: ChartOptions  = { maintainAspectRatio: false };

  chartTypes: ChartType[] = [ChartType.Bar, ChartType.Donut, ChartType.Line];
  chartIDs: string[] = ['my-bar-chart', 'my-donut-chart', 'my-line-chart'];

  chartConfigsWithNameSubject: BehaviorSubject<ChartConfigWithName[]> = new BehaviorSubject<ChartConfigWithName[]>([]);
  chartConfigsWithName$: Observable<ChartConfigWithName[]>;
  constructor(private _chartService: ChartService) {
    this.chartConfigsWithName$ = this.chartConfigsWithNameSubject.asObservable();
    this._chartService.fetchDataByNames(this.chartDataNames).subscribe(
      (chartDatas: ChartDataWithName[]) => {
        const chartConfigs: ChartConfigWithName[] = [];
        chartDatas.forEach((data, idx) => {
          const options = {...this._options};
          if (this.chartTypes[idx] === ChartType.Donut) {
            options.scales = {
              x: {
                display: false
              },
              y: {
                display: false
              }
            }
          }
          chartConfigs.push({
            name: data.name,
            chartId: this.chartIDs[idx],
            config: this._chartService.generateChartConfigs(
              this.chartTypes[idx],
              data.chartData,
              options
          )});
        });
        this.chartConfigsWithNameSubject.next(chartConfigs);
    })
  }
}
