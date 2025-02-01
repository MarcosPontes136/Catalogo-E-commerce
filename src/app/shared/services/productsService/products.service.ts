import { inject, Injectable } from '@angular/core';
import { ApiResponse, Product } from '../../interfeces/products';
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
  private readonly postProducts = `/product`;
  private readonly deleteProducts = `/product/id`;
  private http = inject(HttpClient);

  load(): Observable<ApiResponse<Product[]>> {
    return this.http.get<ApiResponse<Product[]>>(`${this.apiUrl}`+`${this.getProducts}`);
  }

  create(product: Product): Observable<Product> {
    this.products.push(product);
    return this.http.post<Product>(`${this.apiUrl}` + `${this.postProducts}`, product);
  }

  delete(productId: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}${this.deleteProducts}/${productId}`);
  }
}
