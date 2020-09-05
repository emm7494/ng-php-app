import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product/product.service';
import { CartItem } from '../shared/models/cart/cart-item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  get cartItems(): CartItem[] {
    return this.productService.getCartItems();
  }

  set cartItems(items: CartItem[]) {
    this.productService.setCartItems(items);
  }
}
