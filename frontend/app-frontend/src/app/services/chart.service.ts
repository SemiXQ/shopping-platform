import { Injectable } from '@angular/core';
import { ChartConfiguration, ChartData, ChartOptions, Plugin } from 'chart.js';
import { Observable, of } from 'rxjs';
import { trendData } from 'src/test_data/charts-data';
import { ChartDataWithName, ChartType } from '../data/interfaces/chartInterfaces';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  readonly _temp_data = trendData;

  constructor() { }

  //TODO: change to REST api
  fetchDataByNames(names: string[]): Observable<ChartDataWithName[]> {
    const chartDatas: ChartDataWithName[] = [];
    for(let name of names) {
      chartDatas.push(this._temp_data[name]);
    }
    return of(chartDatas);
  }
  
  generateChartConfigs(
    type: ChartType,
    data: ChartData,
    options: ChartOptions = {}
  ): ChartConfiguration {
    const configs: ChartConfiguration = {
      type: type,
      data: data,
      options: options
    }
    return configs;
  }
}
