import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../../shared/models/product/product.model';
interface CartItem {
  id: number;
  quantity: number;
}
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  cart = new BehaviorSubject<CartItem[]>([]);

  constructor(private http: HttpClient) {}
  getAllProducts() {
    return this.http
      .get<Product[]>('http://localhost:4000/api/get_products')
      .pipe(catchError(this.handleError));
  }

  getProduct(id: string) {
    return this.http
      .get<Product>('http://localhost:4000/api/get_product', {
        params: new HttpParams().set('id', id),
      })
      .pipe(catchError(this.handleError));
  }
  private handleError(errorRes: HttpErrorResponse) {
    return throwError(errorRes);
  }

  addCartItem(id: number, quantity: number) {
    const cartItems: CartItem[] = this.getCartItems();
    cartItems.push({ id, quantity });
    this.cart.next(cartItems);
    this.saveLocally(cartItems);
  }

  getCartItems(): CartItem[] {
    return this.cart.getValue();
  }

  saveLocally(cartItems: CartItem[]) {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }

  saveRemotely() {}
}
