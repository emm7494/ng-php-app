import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-product-listing-list',
  templateUrl: './product-listing-list.component.html',
  styleUrls: ['./product-listing-list.component.scss'],
})
export class ProductListingListComponent implements OnInit {
  products: Product[] = [
    new Product('Nokia', 499.99, 'https://source.unsplash.com/random/1'),
    new Product('Apple', 999.99, 'https://source.unsplash.com/random/2'),
    new Product('OnePlus', 299.99, 'https://source.unsplash.com/random/3'),
    new Product('LG', 199.99, 'https://source.unsplash.com/random/4'),
    new Product('Samsung', 599.99, 'https://source.unsplash.com/random/5'),
    new Product('Huawei', 399.99, 'https://source.unsplash.com/random/6'),
    new Product('Motorola', 499.99, 'https://source.unsplash.com/random/7'),
    new Product('Oppo', 999.99, 'https://source.unsplash.com/random/8'),
    new Product('Infinix', 299.99, 'https://source.unsplash.com/random/9'),
    new Product('Nexus', 199.99, 'https://source.unsplash.com/random/10'),
    new Product('Blackberry', 599.99, 'https://source.unsplash.com/random/11'),
    new Product('Sony', 399.99, 'https://source.unsplash.com/random/12'),
  ];
  constructor() {}

  ngOnInit(): void {}
}
