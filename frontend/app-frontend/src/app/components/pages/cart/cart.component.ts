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
  

  constructor(private cartService: CartService) {
    this.cartService.getCart$().subscribe((cart: DetailedCart) => {
      this.cart = cart;
    })
  }

  noUser(): boolean {
    return this.cart?.user_id?.length === 0;
  }

  nonEmptyCart(): boolean {
    return (this.cart?.good_detail !== undefined) && (this.cart?.good_detail?.length !== 0);
  }

  private _updateGoodList() {

  }
}
