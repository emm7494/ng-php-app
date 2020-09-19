import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart/cart.service';
import { CartItem } from 'src/app/shared/models/cart/cart-item.model';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { StorageService } from '../../shared/services/storage/storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  products: CartItem[] = [];
  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    if (this.storageService.mountedCurrentUser.value) {
      // console.log(this.storageService.mountedCurrentUser.value);
      this.cartService.getUserCart().subscribe(
        (products: CartItem[]) => {
          this.products = products;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  get cartItems(): CartItem[] {
    return this.cartService.getCartItems();
  }

  set cartItems(items: CartItem[]) {
    this.cartService.setCartItems(items);
  }
}
