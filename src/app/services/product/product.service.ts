import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Product } from '../../shared/models/product/product.model';
import { CartItem } from '../../shared/models/cart/cart-item.model';
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
    const oldCartItems: CartItem[] = this.getCartItems();

    let notFound = true;
    const newCartItems = oldCartItems.map((item) => {
      if (item.id === id) {
        notFound = false;
        return { id: item.id, quantity: item.quantity + quantity };
      } else {
        return { id: item.id, quantity: item.quantity };
      }
    });
    if (notFound) {
      newCartItems.push({ id, quantity });
    }
    this.setCartItems(newCartItems);
  }

  getCartItems(): CartItem[] {
    return JSON.parse(localStorage.getItem('cart')) ?? [];
  }

  setCartItems(items: CartItem[]) {
    localStorage.setItem('cart', JSON.stringify(items));
  }

  mergeCartItems(remote: CartItem[]) {
    remote.forEach(({ id, quantity }) => this.addCartItem(id, quantity));
  }
}
