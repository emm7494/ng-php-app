import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.cart.subscribe((items) => {
      this.productService.saveLocally(items);
      console.log(items);
    });
    this.productService.addCartItem(9, 6);
  }
}
