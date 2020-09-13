import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from 'src/app/shared/models/product/product.model';
import { CartItem } from 'src/app/shared/models/cart/cart-item.model';

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
}
