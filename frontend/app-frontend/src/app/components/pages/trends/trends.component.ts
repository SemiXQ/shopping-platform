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
  private readonly chartDataNames = ['bottom'];

  // TODO: customized for each table
  private readonly _options: ChartOptions  = { aspectRatio:2.5 };

  chartConfigsWithNameSubject: BehaviorSubject<ChartConfigWithName[]> = new BehaviorSubject<ChartConfigWithName[]>([]);
  chartConfigsWithName$: Observable<ChartConfigWithName[]>;
  constructor(private _chartService: ChartService) {
    this.chartConfigsWithName$ = this.chartConfigsWithNameSubject.asObservable();
    this._chartService.fetchDataByNames(this.chartDataNames).subscribe(
      (chartDatas: ChartDataWithName[]) => {
        const chartConfigs: ChartConfigWithName[] = [];
        chartDatas.forEach(data => {
          chartConfigs.push({
            name: data.name,
            config: this._chartService.generateChartConfigs(
              ChartType.Bar,
              data.chartData,
              this._options
          )});
        });
        this.chartConfigsWithNameSubject.next(chartConfigs);
    })
  }
}
