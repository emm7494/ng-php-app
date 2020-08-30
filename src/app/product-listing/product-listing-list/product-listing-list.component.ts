import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product/product.model';
import { faCartPlus, faHeart } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../../services/product/product.service';
@Component({
  selector: 'app-product-listing-list',
  templateUrl: './product-listing-list.component.html',
  styleUrls: ['./product-listing-list.component.scss'],
})
export class ProductListingListComponent implements OnInit {
  // products: Product[] = [
  //   new Product('ONEPLUS', 299.99, 'assets/img/phones/oneplus.jpg'),
  //   new Product('HUAWEI', 399.99, 'assets/img/phones/huawei.jpg'),
  //   new Product('APPLE', 999.99, 'assets/img/phones/apple.jpg'),
  //   new Product('MOTOROLA', 499.99, 'assets/img/phones/motorola.jpg'),
  //   new Product('LG', 199.99, 'assets/img/phones/lg.jpg'),
  //   new Product('OPPO', 999.99, 'assets/img/phones/oppo.jpg'),
  //   new Product('INFINIX', 299.99, 'assets/img/phones/infinix.jpg'),
  //   new Product('NEXUS', 199.99, 'assets/img/phones/nexus.jpg'),
  //   new Product('NOKIA', 499.99, 'assets/img/phones/nokia.jpg'),
  //   new Product('BLACKBERRY', 599.99, 'assets/img/phones/blackberry.jpg'),
  //   new Product('SAMSUNG', 599.99, 'assets/img/phones/samsung.jpg'),
  //   new Product('SONY', 399.99, 'assets/img/phones/sony.jpg'),
  // ];
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
