import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Good } from '../data/models/good';
// Remove after change to REST APIs
import { sample_goods } from 'src/test_data/goods-data'; 

@Injectable({
  providedIn: 'root'
})
export class GoodsService {

  constructor(private http: HttpClient) { }

  // TODO: change to REST APIs
  getAll(): Good[] {
    return sample_goods;
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
