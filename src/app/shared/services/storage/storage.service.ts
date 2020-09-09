import { Injectable } from '@angular/core';
import { CurrentUser } from '../../models/user/user.model';
import { CartItem } from '../../models/cart/cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  currentUserKey = 'currentUser';
  cartItemsKey = 'cart';
  isAuthenticated = false;

  constructor() {
    this.isAuthenticated = CurrentUser.tokenNotExpired(this.currentUser);
  }

  get currentUser(): CurrentUser {
    return JSON.parse(localStorage.getItem(this.currentUserKey)) ?? {};
  }
  set currentUser(user: CurrentUser) {
    localStorage.setItem(this.currentUserKey, JSON.stringify(user));
  }
  emptyLocalStorage() {
    localStorage.clear();
  }
  get cartItems(): CartItem[] {
    if (this.isAuthenticated) {
      return JSON.parse(localStorage.getItem('cart')) ?? [];
    }
    return JSON.parse(sessionStorage.getItem('cart')) ?? [];
  }

  set cartItems(items: CartItem[]) {
    if (this.isAuthenticated) {
      console.log(this.isAuthenticated);
      localStorage.setItem('cart', JSON.stringify(items));
      console.log('local', items);
    } else {
      console.log(this.isAuthenticated);
      sessionStorage.setItem('cart', JSON.stringify(items));
      console.log('session', items);
    }
  }
}
