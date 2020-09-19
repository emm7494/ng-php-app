import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { Product } from 'src/app/shared/models/product/product.model';
import { CartService } from 'src/app/shared/services/cart/cart.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CartItem } from 'src/app/shared/models/cart/cart-item.model';
import { ModalComponent } from 'src/app/shared/components/modal/modal/modal.component';
import { StorageService } from '../../shared/services/storage/storage.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  faPlus = faPlus;
  faMinus = faMinus;
  product: Product;
  productForm: FormGroup;
  private total: number;
  isLoading: boolean;

  @ViewChild('modalComponent') modalComponent: ModalComponent;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      quantity: [1, [Validators.required, Validators.min(1)]],
    });
    this.productForm.controls.quantity.valueChanges.subscribe((value) => {
      this.totalAmount = value;
    });
    this.productService
      .getProduct(this.route.snapshot.paramMap.get('product-id'))
      .subscribe((product: Product) => {
        this.product = product;
        this.totalAmount = 1;
      });
  }

  get totalAmount(): number {
    return this.total;
  }
  set totalAmount(quantity: number) {
    this.total = +this.product.price * quantity;
  }
  get quantity(): AbstractControl {
    return this.productForm.get('quantity');
  }

  set quantityValue(value: number) {
    this.productForm.controls.quantity.setValue(value);
  }

  changeQuantity(action: string, e: Event) {
    e.preventDefault();
    switch (action) {
      case 'plus':
        this.quantityValue = this.quantity.value + 1;
        break;

      case 'minus':
        this.quantityValue = this.quantity.value - 1;
        break;
    }
  }

  addToCart() {
    if (this.productForm.valid) {
      this.isLoading = true;
      if (this.storageService.mountedCurrentUser.value) {
        setTimeout(() => {
          this.cartService
            .postUserCart([
              {
                product_id: this.product.id,
                quantity: this.productForm.value.quantity,
              },
            ])
            .subscribe(
              (res: CartItem[]) => {
                console.log(res);
                this.cartService.addCartItem(
                  this.product.id,
                  this.productForm.value.quantity
                );
                // this.modalComponent.onClose();
              },
              (error) => {
                console.error(error);
                this.modalComponent.onClose();
              },
              () => {
                this.modalComponent.onClose();
              }
            );
        }, 500);
      } else {
        setTimeout(() => {
          this.cartService.addCartItem(
            this.product.id,
            this.productForm.value.quantity
          );
          this.modalComponent.onClose();
        }, 250);
      }
    }
  }
}
