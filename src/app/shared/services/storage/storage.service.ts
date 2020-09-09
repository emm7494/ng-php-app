import { Injectable } from '@angular/core';
import { CurrentUser } from '../../models/user/user.model';
import { CartItem } from '../../models/cart/cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  currentUserKey = 'currentUser';
  cartItemsKey = 'cart';

  constructor() {}

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
    return JSON.parse(localStorage.getItem('cart')) ?? [];
  }

  set cartItems(items: CartItem[]) {
    localStorage.setItem('cart', JSON.stringify(items));
  }
}
