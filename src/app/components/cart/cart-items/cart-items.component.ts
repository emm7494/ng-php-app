import {
  Component,
  OnInit,
  Input,
  ViewChildren,
  ElementRef,
  QueryList,
} from '@angular/core';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { CartItem } from '../../../shared/models/cart/cart-item.model';
import { CartService } from '../../../shared/services/cart/cart.service';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/shared/models/product/product.model';
import { ProductService } from '../../../shared/services/product/product.service';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.scss'],
})
export class CartItemsComponent implements OnInit, AfterViewInit {
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  cartForm: FormGroup;
  products: Product[] = [];
  @Input() cartItems: CartItem[];
  @ViewChildren('input', { read: ElementRef }) inputs: QueryList<ElementRef>;
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
  }

  ngAfterViewInit(): void {
    this.inputs.forEach((input: ElementRef) => {
      input.nativeElement.disabled = true;
    });
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
  deleteRow(index) {
    this.q.removeAt(index);
  }
  editRow(index: number) {
    this.inputs
      .filter((ele, idx) => idx === index)
      .pop().nativeElement.disabled = false;
  }
}
