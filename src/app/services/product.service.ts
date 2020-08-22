import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  getAllProducts() {
    return this.http.get('http://localhost:4000/api/get_products_json');
  }
  getProduct(productId: string) {
    return this.http.get('http://localhost:4000/api/get_product_json', {
      params: new HttpParams().set('product-id', productId),
    });
  }
}
