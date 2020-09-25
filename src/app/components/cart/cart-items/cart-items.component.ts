import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { CartItem } from '../../../shared/models/cart/cart-item.model';
import { CartService } from '../../../shared/services/cart/cart.service';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/shared/models/product/product.model';
import { ProductService } from '../../../shared/services/product/product.service';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.scss'],
})
export class CartItemsComponent implements OnInit {
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  cartForm: FormGroup;
  products: Product[] = [];
  @Input() cartItems: CartItem[];
  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.cartForm = this.cartService.toFormGroup(this.cartItems);
    this.cartItems.forEach((item: CartItem) => {
      this.productService
        .getProduct(item.product_id)
        .subscribe((product: Product) => {
          this.products.push(product);
        });
    });
    console.log(this.products);
  }
  get f() {
    return this.cartForm.controls;
  }

  get q() {
    return this.f.quantities as FormArray;
  }
  get quantityFormControls() {
    return this.q.controls as FormControl[];
  }
}
