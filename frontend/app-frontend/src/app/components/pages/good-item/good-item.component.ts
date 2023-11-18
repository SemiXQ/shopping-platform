import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Good } from 'src/app/data/models/good';
import { CartService } from 'src/app/services/cart.service';
import { GoodsService } from 'src/app/services/goods.service';

@Component({
  selector: 'app-good-item',
  templateUrl: './good-item.component.html',
  styleUrls: ['./good-item.component.less']
})
export class GoodItemComponent {
  good!: Good | undefined;
  quantityControl!: FormControl;
  constructor(private _route: ActivatedRoute, 
              private _goodService: GoodsService,
              private _cartService: CartService) {
    this.quantityControl = new FormControl<number>(1, [
      Validators.max(5),
      Validators.min(1)
    ]);
    _route.params.subscribe(params => {
      _goodService.getGoodById(params['id']).subscribe((good: Good | undefined) => {
        this.good = good;
      });
    })
  }

  addToCart() {
    // console.log(event);
    //console.log("here", this.quantityControl.value);
    if (this.good !== undefined) {
      this._cartService.addGoodsToCart(this.good, this.quantityControl.value);
    }
  }
}
