import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Good } from '../data/models/good';
// Remove after change to REST APIs
import { sample_goods } from 'src/test_data/goods-data'; 
import { Observable, catchError, of, map } from 'rxjs';
import { GoodIds, GoodItem, GoodList } from '../data/interfaces/goodInterfaces';
import { GOOD_URLS } from '../routes/route';
import { User } from '../data/models/user';

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
    const fetchedGoodList =  this.http.get<GoodList>(GOOD_URLS.getAll);
    return this._extractGoodList(fetchedGoodList, "Fetching all goods");
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

  // REST API: get goods by ids
  getGoodsByIds(ids: GoodIds): Observable<Good[]> {
    // Since XHR doesn't allow to send json in request body in get method,
    // So, I use post here, even though get is expected to use for this case
    if (ids.ids?.length === 0) {
      return of([]);
    } else {
      const fetchedGoodList = this.http.post<GoodList>(GOOD_URLS.getItemListByIds, ids);
      return this._extractGoodList(fetchedGoodList, "Fetching goods by ids");
    }
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

  _extractGoodList(goodList: Observable<GoodList>, error_msg: string): Observable<Good[]> {
    const error: string = `Error in ${error_msg}: `;
    return goodList.pipe(
      map((res: GoodList) => {
        if(res.error !== undefined) {
          console.log(error, res.error);
        }
        return res.goods ?? this._emptyGoodsBuilder();
      }),
      catchError((error: any) => {
        console.log(error, error);
        return of(this._emptyGoodsBuilder());
      })
    )
  }
}
