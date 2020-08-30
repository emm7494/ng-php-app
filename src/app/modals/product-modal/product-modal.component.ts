import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../shared/models/product/product.model';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss'],
})
export class ProductModalComponent implements OnInit {
  faPlus = faPlus;
  faMinus = faMinus;
  quantity = 0;
  error = !this.quantity;
  product: Product = new Product();
  total = this.product.price * this.quantity;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}
  ngOnInit() {
    this.route.paramMap.subscribe((params: Params) => {
      this.productService
        .getProduct(params.get('product-id'))
        .subscribe((product: Product) => {
          this.product = product;
        });
    });
  }
  setError(state: boolean) {
    this.error = state;
  }
  setTotal() {
    this.total = this.product.price * this.quantity;
  }
  quantityChanged(value: number) {
    if (value < 1) {
      this.setError(true);
    }
    if (value > 0) {
      this.setError(false);
    }
  }
  validateQuantity() {}
  changeQuantity(action: string) {
    switch (action) {
      case 'plus':
        this.quantity++;
        this.setTotal();
        if (this.quantity > 0) {
          this.setError(false);
        }
        break;

      case 'minus':
        if (this.quantity > 0) {
          this.quantity--;
          this.setTotal();
        }
        if (this.quantity === 0) {
          this.setError(true);
        }
        break;
    }
  }

  addToCart() {
    console.log(this.total);
  }

  onClose() {
    setTimeout(() => this.router.navigate(['..']), 100);
  }
}
