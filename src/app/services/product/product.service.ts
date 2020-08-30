import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../shared/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  getAllProducts() {
    return this.http.get<Product[]>('http://localhost:4000/api/get_products');
  }

  getProduct(id: string) {
    return this.http.get<Product>('http://localhost:4000/api/get_product', {
      params: new HttpParams().set('id', id),
    });
  }
}
