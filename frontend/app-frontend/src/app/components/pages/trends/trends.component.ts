import { Component } from '@angular/core';
import { ChartService, ChartType } from 'src/app/services/chart.service';
import { ChartConfiguration, ChartData, ChartOptions } from 'chart.js';
import { BehaviorSubject, Observable } from 'rxjs';

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

  chartConfigSubject: BehaviorSubject<ChartConfiguration[]> = new BehaviorSubject<ChartConfiguration[]>([]);
  chartConfigs$: Observable<ChartConfiguration[]>;
  constructor(private _chartService: ChartService) {
    this.chartConfigs$ = this.chartConfigSubject.asObservable();
    this._chartService.fetchDataByNames(this.chartDataNames).subscribe(
      (chartDatas: ChartData[]) => {
        const chartConfigs: ChartConfiguration[] = [];
        chartDatas.forEach(data => {
          chartConfigs.push(this._chartService.generateChartConfigs(
            ChartType.Bar,
            data,
            this._options
          ));
        });
        this.chartConfigSubject.next(chartConfigs);
    })
  }
}
