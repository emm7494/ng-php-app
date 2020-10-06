import {
  Component,
  OnInit,
  Input,
  ViewChildren,
  ElementRef,
  QueryList,
  ViewChild,
} from '@angular/core';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { CartItem } from '../../../shared/models/cart/cart-item.model';
import { CartService } from '../../../shared/services/cart/cart.service';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/shared/models/product/product.model';
import { ProductService } from '../../../shared/services/product/product.service';
import { AfterViewInit } from '@angular/core';
import { StorageService } from '../../../shared/services/storage/storage.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal/modal.component';

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
  isLoading: boolean;
  // @ViewChild('modalComponent') modalComponent: ModalComponent;
  @Input() cartItems: CartItem[];
  @ViewChildren('input', { read: ElementRef }) inputs: QueryList<ElementRef>;
  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private storageService: StorageService
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
    this.cartForm.valueChanges.subscribe((values) => {
      // console.log(values.quantities);
      this.updateCart(values.quantities);
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
  get quantityFormGroups() {
    return this.q.controls as FormGroup[];
  }
  deleteRow(index, id) {
    console.log(id);
    this.cartService.deleteUserCartItem(id).subscribe(
      (res) => {
        console.log(res);
        this.q.removeAt(index);
        this.cartItems.splice(+index, 1);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  editRow(index: number) {
    this.inputs
      .filter((ele, idx) => idx === index)
      .pop().nativeElement.disabled = false;
  }

  updateCart(items: CartItem[]) {
    if (this.cartForm.valid) {
      this.isLoading = true;
      if (this.storageService.mountedCurrentUser.value) {
        setTimeout(() => {
          this.cartService.postUserCart(items).subscribe(
            (res: CartItem[]) => {
              console.log('wait..');
              console.log(res);
              this.cartService.addCartItems(res);
              // this.modalComponent.onClose();
            },
            (error) => {
              console.error(error);
              // this.modalComponent.onClose();
            },
            () => {
              // this.modalComponent.onClose();
            }
          );
        }, 500);
      } else {
        setTimeout(() => {
          this.cartService.addCartItems(items);
          // this.modalComponent.onClose();
        }, 250);
      }
    }
  }
}
