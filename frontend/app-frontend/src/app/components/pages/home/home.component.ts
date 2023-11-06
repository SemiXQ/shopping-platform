import { Component } from '@angular/core';
import { Good } from 'src/app/data/models/good';
import { GoodsService } from 'src/app/services/goods.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent {
  goods: Good[] = [];
  isPopular: (good: Good) => boolean;
  constructor(private goodService: GoodsService) {
    goodService.getAll().subscribe(goods => this.goods = goods);
    //this.goods = goodService.getAll();
    this.isPopular = goodService.isPopular;
  }
}
