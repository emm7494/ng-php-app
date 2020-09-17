import { Component, OnInit, ViewChild } from '@angular/core';
import { faCartPlus, faHeart } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { Product } from 'src/app/shared/models/product/product.model';
@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss'],
})
export class ProductListingComponent implements OnInit {
  products: Product[];
  faCartPlus = faCartPlus;
  faHeart = faHeart;

  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((products: Product[]) => {
      this.products = products;
    });
  }
}
