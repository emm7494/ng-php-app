import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-product-listing-list',
  templateUrl: './product-listing-list.component.html',
  styleUrls: ['./product-listing-list.component.scss'],
})
export class ProductListingListComponent implements OnInit {
  products: Product[] = [
    new Product('ONEPLUS', 299.99, 'assets/phone-images/oneplus.jpg'),
    new Product('HUAWEI', 399.99, 'assets/phone-images/huawei.jpg'),
    new Product('APPLE', 999.99, 'assets/phone-images/apple.jpg'),
    new Product('MOTOROLA', 499.99, 'assets/phone-images/motorola.jpg'),
    new Product('LG', 199.99, 'assets/phone-images/lg.jpg'),
    new Product('OPPO', 999.99, 'assets/phone-images/oppo.jpg'),
    new Product('INFINIX', 299.99, 'assets/phone-images/infinix.jpg'),
    new Product('NEXUS', 199.99, 'assets/phone-images/nexus.jpg'),
    new Product('NOKIA', 499.99, 'assets/phone-images/nokia.jpg'),
    new Product('BLACKBERRY', 599.99, 'assets/phone-images/blackberry.jpg'),
    new Product('SAMSUNG', 599.99, 'assets/phone-images/samsung.jpg'),
    new Product('SONY', 399.99, 'assets/phone-images/sony.jpg'),
  ];
  // products: Product[] = [
  //   new Product('NOKIA', 499.99, 'https://source.unsplash.com/random/1'),
  //   new Product('APPLE', 999.99, 'https://source.unsplash.com/random/2'),
  //   new Product('ONEPLUS', 299.99, 'https://source.unsplash.com/random/3'),
  //   new Product('LG', 199.99, 'https://source.unsplash.com/random/4'),
  //   new Product('SAMSUNG', 599.99, 'https://source.unsplash.com/random/5'),
  //   new Product('HUAWEI', 399.99, 'https://source.unsplash.com/random/6'),
  //   new Product('MOTOROLA', 499.99, 'https://source.unsplash.com/random/7'),
  //   new Product('OPPO', 999.99, 'https://source.unsplash.com/random/8'),
  //   new Product('INFINIX', 299.99, 'https://source.unsplash.com/random/9'),
  //   new Product('NEXUS', 199.99, 'https://source.unsplash.com/random/10'),
  //   new Product('BLACKBERRY', 599.99, 'https://source.unsplash.com/random/11'),
  //   new Product('SONY', 399.99, 'https://source.unsplash.com/random/12'),
  // ];
  constructor() {}

  ngOnInit(): void {}
}
