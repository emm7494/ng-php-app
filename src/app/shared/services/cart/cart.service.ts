import { CartItem } from './../../models/cart/cart-item.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { StorageService } from '../storage/storage.service';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // cartTotal = new BehaviorSubject<number>(0);
  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private formBuilder: FormBuilder
  ) {
    // this.mountCartTotal();
  }
  getUserCart() {
    return this.http
      .get<CartItem[]>(`${environment.apiURL}/get_user_cart`)
      .pipe(
        catchError((errorRes) => this.handleError(errorRes)),
        tap((items: CartItem[]) => {
          this.handleCartGet(items);
        })
      );
  }

  postUserCart(items: CartItem[]) {
    return this.http
      .post<CartItem[]>(`${environment.apiURL}/post_user_cart`, {
        cart: items,
      })
      .pipe(catchError((resError) => this.handleError(resError)));
  }

  addCartItem(productId: string, quantity: number) {
    const oldCartItems: CartItem[] = this.storageService.cartItems;

    let notFound = true;
    const newCartItems = oldCartItems.map((item) => {
      if (item.product_id === productId) {
        notFound = false;
        return {
          product_id: item.product_id,
          quantity: +item.quantity + +quantity,
        };
      } else {
        return { product_id: item.product_id, quantity: item.quantity };
      }
    });
    if (notFound) {
      newCartItems.push({ product_id: productId, quantity });
    }
    // this.setCartItems(newCartItems);
    this.storageService.cartItems = newCartItems;
  }

  addCartItems(items: CartItem[], mergeItems = false) {
    if (mergeItems) {
      items.forEach(({ product_id, quantity }) =>
        this.addCartItem(product_id, quantity)
      );
    } else {
      // this.setCartItems(items);
      this.storageService.cartItems = items;
    }
  }

  // getCartItems(): CartItem[] {
  // return this.storageService.cartItems;
  // }

  // setCartItems(items: CartItem[]) {
  // this.storageService.cartItems = items;
  // this.mountCartTotal();
  // }
  private handleError(errorRes: HttpErrorResponse) {
    return throwError(errorRes);
  }
  // mountCartTotal() {
  //   this.cartTotal.next(this.getCartItems().length);
  // }
  private handleCartGet(items: CartItem[]) {
    this.addCartItems(items, false);
    this.storageService.mountCartTotal();
  }
  private createItem(item: CartItem): FormControl {
    return this.formBuilder.control(item.quantity);
  }

  toFormGroup(items: CartItem[]): FormGroup {
    console.log(items);
    const array: any[] = [];
    items.forEach((item) => {
      array.push(this.createItem(item));
    });
    console.log(array);
    return this.formBuilder.group({
      quantities: this.formBuilder.array(array),
    });
  }
}
