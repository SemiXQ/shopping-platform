import { Component } from '@angular/core';
import { DetailedCart } from 'src/app/data/models/cart';
import { User } from 'src/app/data/models/user';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.less']
})
export class CartComponent {
  cart!: DetailedCart;
  

  constructor(private _cartService: CartService) {
    this._cartService.getCart$().subscribe((cart: DetailedCart) => {
      this.cart = cart;
    })
  }

  noUser(): boolean {
    return this.cart?.user_id?.length === 0;
  }

  nonEmptyCart(): boolean {
    return (this.cart?.good_detail !== undefined) && (this.cart?.good_detail?.length !== 0);
  }

  remove(good_id: string) {
    this.cart.goods_info = this.cart.goods_info.filter(good_info => good_info.good_id !== good_id);
    this.cart.good_detail = this.cart.good_detail.filter(good_detail => good_detail.good_id !== good_id);
    this._cartService.updateCartInSession(this.cart);
  }

  private _updateGoodList() {

  }
}
