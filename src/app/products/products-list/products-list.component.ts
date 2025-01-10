import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { CartService } from '../../shared/services/cartService/cart.service';
import { ProductsService } from '../../shared/services/productsService/products.service';
import { Product } from '../../shared/interfeces/products';
import { PaginatorComponent } from "../../shared/paginator/paginator.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  imports: [MatCardModule, MatButtonModule, MatIconModule, PaginatorComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent implements OnInit {

  private service = inject(ProductsService);
  private cartService = inject(CartService);
  products$ = this.service.load();

  displayedProducts: Product[] = [];

  totalProduct = this.service.totalProduct;
  pageSize = 4;
  pageIndex = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.service.load().subscribe((products) => {
      this.displayedProducts = products;
      this.updateDisplayedProducts(products);
    });
  }

  addProductToCart(product: Product): void{
    this.cartService.addProducts(product);
  }

  navToDetail(productId: string): void {
    this.router.navigate(['/details', productId]);
  }

  onPageChange(event: { pageSize: number; pageIndex: number }): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

    this.products$.subscribe((products) => {
      this.updateDisplayedProducts(products);
    });
  }

  updateDisplayedProducts(products: Product[]): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedProducts = products.slice(startIndex, endIndex);
  }

}
