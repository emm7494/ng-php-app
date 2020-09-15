import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
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
import { RouterService } from '../../../../services/router/router.service';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss'],
})
export class ProductModalComponent implements OnInit {
  faPlus = faPlus;
  faMinus = faMinus;
  product: Product = new Product();
  productForm: FormGroup;
  private total: number;
  @ViewChild('closeBtn') closeBtn;

  showModal = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cartService: CartService,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private routerService: RouterService
  ) {}

  ngOnInit() {
    // this.routerService.unSetAuxiliaryRoute();
    this.route.data.subscribe((data: Data) => {
      this.showModal = data.showModal;
    });
    this.productForm = this.formBuilder.group({
      quantity: [1, [Validators.required, Validators.min(1)]],
    });
    this.productForm.controls.quantity.valueChanges.subscribe((value) => {
      this.totalAmount = value;
    });
    this.route.paramMap.subscribe((params: Params) => {
      this.productService
        .getProduct(params.get('product-id'))
        .subscribe((product: Product) => {
          this.product = product;
          this.totalAmount = 1;
        });
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
      this.cartService.addCartItem(
        this.product.id,
        this.productForm.value.quantity
      );
      if (this.authService.currentUser.value) {
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
            },
            (error) => {
              console.error(error);
            }
          );
      }
      this.closeBtn.nativeElement.click();
    }
  }

  onClose() {
    this.routerService.unSetAuxiliaryRoute();
  }
}
