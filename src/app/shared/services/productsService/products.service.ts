import { inject, Injectable } from '@angular/core';
import { Product } from '../../interfeces/products';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private products: Product[] = [];

  private readonly apiUrl = environment.apiUrl;
  private readonly getProducts = `/products`;
  private readonly isLocal = true;
  private http = inject(HttpClient);

  load(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}`+`${this.getProducts}`)
  }

  create(product:Product): Observable<Product> {
    if (this.isLocal) {
      this.products.push(product);
      return of(product);
    }
    return this.http.post<Product>(this.getProducts, product,);
  }
}
