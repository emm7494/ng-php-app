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
  cartItems: CartItem[];
  // cartRecordArray: CartRecordObject[];
  // cartRecordHeader: CartRecordHeaderObject;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.storageService.mountedCartItems.subscribe((items: CartItem[]) => {
      // this.cartItems = items;
      this.cartItems = items;
    });

    // if (this.storageService.mountedCurrentUser.value) {
    //   // console.log(this.storageService.mountedCurrentUser.value);
    //   this.cartService.getUserCart().subscribe(
    //     (cartItems: CartItem[]) => {
    //       this.cartItems = cartItems;
    //     },
    //     (error) => {
    //       console.error(error);
    //     }
    //   );
    // }
  }

  // get cartItems(): CartItem[] {
  // return this.cartService.getCartItems();
  // return this.storageService.cartItems;
  // }

  // set cartItems(items: CartItem[]) {
  // this.cartService.setCartItems(items);
  // this.storageService.cartItems = items;
  // }
}
