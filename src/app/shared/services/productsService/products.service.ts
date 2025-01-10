import { inject, Injectable } from '@angular/core';
import { Product } from '../../interfeces/products';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private products: Product[] = [];

  private readonly API = `/products`;
  private readonly isLocal = true;
  private http = inject(HttpClient);

  totalProduct = 0;


  load(): Observable<Product[]> {
    if (this.isLocal) {
      for (let num = 1; num <= 10; num++) {
          this.addProducts(num);
      }
      this.totalProduct = this.products.length;
      return of(this.products);
    }
    return this.http.get<Product[]>(this.API);
  }

  create(product:Product): Observable<Product> {
    if (this.isLocal) {
      this.products.push(product);
      return of(product);
    }
    return this.http.post<Product>(this.API, product,);
  }

  private addProducts(i: number): void {
    this.products.push({
      id: `${i}`,
      price: parseFloat((Math.random() * (0.0 - 10.0) + 10.0).toFixed(2)),
      status: 'sale',
      discounted: ['', '', '', 'discounted'][Math.floor(Math.random() * 4)],
      discount: parseFloat((Math.random() * (0.0 - 10.0) + 10.0).toFixed(2)),
      name: ['Coffee'][Math.floor(Math.random() * 1)],
      description: ['B & W', 'Grey', 'Black', 'Green', 'Black'][Math.floor(Math.random() * 5)],
      image: `${i}`
    });
  }
}
