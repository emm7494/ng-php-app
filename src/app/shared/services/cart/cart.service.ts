import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { CartItem } from 'src/app/shared/models/cart/cart-item.model';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartTotal = new BehaviorSubject<number>(0);
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {
    this.mountCartTotal();
  }
  getUserCart() {
    return this.http
      .get<CartItem[]>('http://localhost:4000/api/get_user_cart')
      .pipe(catchError((errorRes) => this.handleError(errorRes)));
  }

  postUserCart(items: CartItem[]) {
    return this.http
      .post<CartItem[]>('http://localhost:4000/api/post_user_cart', {
        cart: items,
      })
      .pipe(catchError((resError) => this.handleError(resError)));
  }

  addCartItem(productId: string, quantity: number) {
    const oldCartItems: CartItem[] = this.getCartItems();

    let notFound = true;
    const newCartItems = oldCartItems.map((item) => {
      if (item.product_id === productId) {
        notFound = false;
        return {
          product_id: item.product_id,
          quantity: item.quantity + quantity,
        };
      } else {
        return { product_id: item.product_id, quantity: item.quantity };
      }
    });
    if (notFound) {
      newCartItems.push({ product_id: productId, quantity });
    }
    this.setCartItems(newCartItems);
  }

  addCartItems(items: CartItem[], mergeItems = false) {
    if (mergeItems) {
      items.forEach(({ product_id, quantity }) =>
        this.addCartItem(product_id, +quantity)
      );
    } else {
      this.setCartItems(items);
    }
  }

  getCartItems(): CartItem[] {
    return this.storageService.cartItems;
  }

  setCartItems(items: CartItem[]) {
    this.storageService.cartItems = items;
    this.mountCartTotal();
  }
  private handleError(errorRes: HttpErrorResponse) {
    return throwError(errorRes);
  }
  mountCartTotal() {
    this.cartTotal.next(this.getCartItems().length);
  }
}
