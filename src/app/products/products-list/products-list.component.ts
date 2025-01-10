import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { CartService } from '../../shared/services/cartService/cart.service';
import { ProductsService } from '../../shared/services/productsService/products.service';
import { Product } from '../../shared/interfeces/products';

@Component({
  selector: 'app-products-list',
  imports: [MatCardModule, MatButtonModule, MatIconModule, AsyncPipe],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent {

  private service = inject(ProductsService);
  private cartService = inject(CartService);
  products$ = this.service.load();


  addProductToCart(product: Product): void{
    this.cartService.addProducts(product);
  }
}
