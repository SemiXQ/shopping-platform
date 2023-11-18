import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, combineLatest } from 'rxjs';
import { Cart, DetailedCart, GoodDetail } from '../data/models/cart';
import { sample_carts } from 'src/test_data/cart-data';
import { of, map, take } from 'rxjs';
import { SessionStorageService } from 'ngx-webstorage';
import { UserService } from './user.service';
import { User } from '../data/models/user';
import { GoodsService } from './goods.service';
import { Good } from '../data/models/good';
import { HttpClient } from '@angular/common/http';
import { CART_URLS } from '../routes/route';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  static readonly CART_KEY: string = "CART";

  private readonly _sample_cart: Cart[] = sample_carts;

  // private _cartObservable!: Observable<DetailedCart>;
  // private _cartSubject!: BehaviorSubject<DetailedCart>;
  
  private _user!: User;

  //TODO: add cart status and store it in session storage,
  // if failed to fetch cart, set status = false and add code to
  // make sure _getCartFromSessionStorage will call _fetchCart first in that case

  constructor(private _sessionStorage: SessionStorageService, 
              private _http: HttpClient, 
              private _userService: UserService,
              private _goodService: GoodsService) {
    //this._cartObservable = this._cartSubject.asObservable();
    this._userService.getUserObservable().subscribe(user => this._user = user);
    this._userService.getUserLogoutObservable().subscribe((logoutStatus: boolean) => {
      if (logoutStatus) {
        this.updateCart(true);
      }
    });
  }

  getCart$(): Observable<DetailedCart> {
    return this._getCartFromSessionStorage()
  }

  updateCartInSession(cart: DetailedCart) {
    this._setCartToSessionStorage(cart);
  }

  addGoodsToCart(good: Good, amount: number) {
    if (this._user?.id === undefined || this._user?.id === null) {
      return;
    } else {
      this._getCartFromSessionStorage().pipe(take(1)).subscribe((cart: DetailedCart) => {
        let find = false;
        cart.goods_info.map(good_info => {
          if (good_info.good_id === good.id) {
            good_info.good_count += amount;
            find = true;
          }
        });
        if (find) {
          cart.good_detail.map(good_detail => {
            if(good_detail.good_id === good.id) {
              good_detail.good_count += amount;
            }
          });
        } else {
          cart.goods_info.push({good_id: good.id, good_count: amount});
          cart.good_detail.push(this._initGoodDetail(good, amount))
        }
        this._setCartToSessionStorage(cart);
      });
    }
  }

  //TODO: REST API to update cart on server
  updateCart(sessionClosed: boolean) {
    // when user logout, update cart info to db
    // TODO:

    if(sessionClosed) {
      this._clearCartSessionStorage();
    }
  }

  // REST API to fetch Cart
  private _fetchCart(user_id: string): Observable<DetailedCart> {
    const cart$: Observable<Cart> = this._http.get<Cart>(CART_URLS.getOrUpdateCartById(user_id)).pipe(
      map((res: Cart) => res),
      catchError((err) => {
        console.log("Error in fetching cart by id: ", err);
        // TODO: add update to cart status
        return of(this._emptyCartBuilder(user_id));
      })
    )
    //const cart = this._sample_cart.find((cart) => cart.user_id === user_id) ?? this._emptyCartBuilder(user_id);
    
    const goods$: Observable<Good[]> = this._goodService.getAll();
    return combineLatest(cart$, goods$).pipe(map(([cart, goods]: [Cart, Good[]]) => {
      const good_details: GoodDetail[] = []
      cart.goods_info.forEach((good_info) => {
        const good = goods.find(target => target.id === good_info.good_id);
        if(good !== undefined) {
          const good_detail: GoodDetail = {...good_info, good_imgUrl: good.imageUrl, good_preprice: good.pre_price, 
            good_price: good.current_price, good_name: good.name};
          good_details.push(good_detail);
        }
      });
      const detailed_cart: DetailedCart = {...cart, good_detail: good_details};
      this._setCartToSessionStorage(detailed_cart);
      return detailed_cart;
    }))
  }

  // private _fetchGoodsDetails(cart: Cart): Observable<Good[]> {
  //   const ids: string[] = cart.goods_info.map((good_info) => good_info.good_id);
  //   return this._goodService.getGoodsByIds({ids: ids});
  // }

  private _emptyCartBuilder(user_id: string): Cart {
    const cart = new Cart();
    this._initDefault(cart, user_id);
    return cart;
  }

  private _emptyDetailedCartBuilder(user_id: string): DetailedCart {
    const cart = new DetailedCart();
    this._initDefault(cart, user_id);
    cart.good_detail = [];
    return cart;
  }

  private _initDefault(cart: Cart, user_id: string) {
    cart.user_id = user_id;
    cart.goods_info = [];
    cart.price_amount = 0;
    cart.isDirty = false;
    cart.timeStamp = 0;
  }

  private _initGoodDetail(good: Good, amount: number = 0): GoodDetail {
    return {good_id: good.id, good_count: amount, good_imgUrl: good.imageUrl, 
      good_name: good.name, good_preprice: good.pre_price, good_price: good.current_price};
  }

  private _getCartFromSessionStorage(): Observable<DetailedCart> {
    const cartJson = this._sessionStorage.retrieve(CartService.CART_KEY);
    if (cartJson === undefined || cartJson === null) {
      if (this._user?.id === undefined || this._user?.id === null) {
        // const cart = this._emptyDetailedCartBuilder("");
        // this._cartSubject.next(cart);
        // return of(cart);
        return of(this._emptyDetailedCartBuilder(""));
      } else {
        return this._fetchCart(this._user.id);
      }
    } else {
      return of(JSON.parse(cartJson) as DetailedCart);
    }
  }

  private _setCartToSessionStorage(cart: DetailedCart) {
    this._sessionStorage.store(CartService.CART_KEY, JSON.stringify(cart));
    //this._cartSubject.next(cart);
  }

  private _clearCartSessionStorage() {
    this._sessionStorage.clear(CartService.CART_KEY);
  }
}
