import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CartItem } from 'src/app/shared/models/cart/cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}
  getUserCart() {
    return this.http
      .get<CartItem[]>('http://localhost:4000/api/get_user_cart')
      .pipe(catchError(this.handleError));
  }

  addCartItem(productId: number, quantity: number) {
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

  getCartItems(): CartItem[] {
    return JSON.parse(localStorage.getItem('cart')) ?? [];
  }

  setCartItems(items: CartItem[]) {
    localStorage.setItem('cart', JSON.stringify(items));
  }
  private handleError(errorRes: HttpErrorResponse) {
    return throwError(errorRes);
  }
}
