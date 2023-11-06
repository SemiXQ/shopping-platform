import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Good } from '../data/models/good';
// Remove after change to REST APIs
import { sample_goods } from 'src/test_data/goods-data'; 
import { Observable, catchError, of, map } from 'rxjs';
import { GoodItem, GoodList } from '../data/interfaces/goodInterfaces';
import { GOOD_URLS } from '../routes/route';

@Injectable({
  providedIn: 'root'
})
export class GoodsService {

  constructor(private http: HttpClient) { }

  private _emptyGoodsBuilder() {
    const goods: Good[] = [];
    return goods;
  }

  // REST API: get all goods
  getAll(): Observable<Good[]> {
    return this.http.get<GoodList>(GOOD_URLS.getAll).pipe(
      map((res: GoodList) => {
        if(res.error !== undefined) {
          console.log("Error in fetching goods: ", res.error);
        }
        return res.goods ?? this._emptyGoodsBuilder();
      }),
      catchError((error: any) => {
        console.log("Error in fetching goods: ", error);
        return of(this._emptyGoodsBuilder());
      })
    );
  }

  // REST API: get good by id
  getGoodById(id: string): Observable<Good | undefined> {
    return this.http.get<GoodItem>(GOOD_URLS.getItemById(id)).pipe(
      map((res: GoodItem) => {
        if (res.error !== undefined) {
          console.log("Error in fetching good item: ", res.error);
        }
        return res.good;
      }),
      catchError((error: any) => {
        console.log("Error in fetching good item: ", error);
        return of(undefined);
      })
    );
  }

  discount(good: Good): number | undefined {
        if (good.on_sale) {
            const factor = 10 ** 2;
            return Math.round((good.current_price - good.pre_price) / good.pre_price * factor) / factor;
        } else {
            return undefined;
        }
  }

  isPopular(good: Good): boolean {
    return good.favors >= 300;
  }
}
