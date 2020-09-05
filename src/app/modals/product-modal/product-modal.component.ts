import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../shared/models/product/product.model';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private fb: FormBuilder
  ) {}
  ngOnInit() {
    this.productForm = this.fb.group({
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
    this.total = this.product.price * quantity;
  }
  get quantity(): AbstractControl {
    return this.productForm.get('quantity');
  }

  set quantityValue(value: number) {
    this.productForm.controls.quantity.setValue(value);
  }

  changeQuantity(action: string) {
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
      this.productService.addCartItem(
        +this.product.id,
        this.productForm.value.quantity
      );
      this.closeBtn.nativeElement.click();
    }
  }

  onClose() {
    setTimeout(() => this.router.navigate(['..']), 100);
  }
}
