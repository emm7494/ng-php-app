import { Injectable } from '@angular/core';
import { CurrentUser } from '../../models/user/user.model';
import { CartItem } from '../../models/cart/cart-item.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  currentUserKey = 'currentUser';
  cartItemsKey = 'cart';
  mountedCurrentUser = new BehaviorSubject<CurrentUser>(null);
  cartTotal = new BehaviorSubject<number>(0);

  constructor() {
    this.mountedCurrentUser.next(this.currentUser);
    this.mountCartTotal();
  }

  get currentUser(): CurrentUser {
    const storedUser = JSON.parse(localStorage.getItem(this.currentUserKey));
    if (storedUser && CurrentUser.tokenNotExpired(storedUser)) {
      return storedUser;
    }
    return null;
  }
  set currentUser(user: CurrentUser) {
    localStorage.setItem(this.currentUserKey, JSON.stringify(user));
    if (!user) {
      this.cartTotal.next(0);
    }
    this.mountedCurrentUser.next(user);
    console.log('user: ', user);
    console.log('this.currentUser: ', this.currentUser);
  }
  emptyLocalStorage() {
    localStorage.clear();
  }
  get cartItems(): CartItem[] {
    return JSON.parse(localStorage.getItem('cart')) ?? [];
  }

  set cartItems(items: CartItem[]) {
    localStorage.setItem('cart', JSON.stringify(items));
    this.mountCartTotal();
  }
  mountCartTotal() {
    console.log(this.cartItems.length);
    this.cartTotal.next(this.cartItems.length);
  }
}
