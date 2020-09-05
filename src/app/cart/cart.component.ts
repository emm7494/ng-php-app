import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { ProductService } from '../services/product/product.service';
import { CartItem } from '../shared/models/cart/cart-item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  products: CartItem[] = [];
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getUserCart().subscribe(
      (products: CartItem[]) => {
        this.products = products;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  get cartItems(): CartItem[] {
    return this.cartService.getCartItems();
  }

  set cartItems(items: CartItem[]) {
    this.cartService.setCartItems(items);
  }
}
