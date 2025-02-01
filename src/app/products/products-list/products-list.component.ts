import { Component, Renderer2, OnInit, inject, model, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../shared/services/cartService/cart.service';
import { ProductsService } from '../../shared/services/productsService/products.service';
import { Product } from '../../shared/interfeces/products';
import { PaginatorComponent } from "../../shared/paginator/paginator.component";
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ModalComponent } from '../../shared/modal/modal/modal.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
export interface DialogData {
  menssage: string,
}

@Component({
  selector: 'app-products-list',
  imports: [MatCardModule, MatButtonModule, MatIconModule, PaginatorComponent, CurrencyPipe],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent implements OnInit {

  private destroy$ = new Subject<void>();

  protected displayedProducts: Product[] = [];

  protected totalProduct = 0;
  protected pageSize = 6;
  protected pageIndex = 0;

  isFavorite = false;

  readonly dialog = inject(MatDialog);
  dialogRef: MatDialogRef<ModalComponent> | null = null;

  constructor(private router: Router,
    private cartService: CartService,
    private productsService: ProductsService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.productsService.load()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        {
          next: (products) => {
            this.displayedProducts = products.data;
            this.totalProduct = products.data.length;
            this.updateDisplayedProducts(products.data);
            //Mensagem pop-up (em desenvolvimento)
          },
          error: (error) => {
            //Mensagem pop-up (em desenvolvimento)
          }
        });
  }

  addProductToCart(product: Product): void {
    this.cartService.addProducts(product);
  }

  //Aba de detalhes do produto por ID (em desenvolvimento)
  navToDetail(productId: string): void {
    this.router.navigate(['/details', productId]);
  }

  onPageChange(event: { pageSize: number; pageIndex: number }): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

    const products$ = this.productsService.load();

    products$
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        {
          next: (products) => {
            this.updateDisplayedProducts(products.data);
          }
        });
  }

  updateDisplayedProducts(products: Product[]): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedProducts = products.slice(startIndex, endIndex);
  }



  validModal(product: string): void {
    this.dialogRef = this.openDialog("Do you really want to remove the Product?");

    this.dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result) => {
          if (result == true) {
            this.removeProductFromCart(product);
          }
        }
      });
  }

  removeProductFromCart(product: string): void {
    this.productsService.delete(product)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        {
          next: (response) => {
            this.displayedProducts = this.displayedProducts.filter(p => p.id !== product);
            this.totalProduct -= 1;
            this.updateDisplayedProducts(this.displayedProducts);
            //Mensagem pop-up (em desenvolvimento)
          },
          error: (error) => {

            //Mensagem pop-up (em desenvolvimento)
            console.error("Erro ao excluir o produto:", error.error.message);
          }
        });
  };

  openDialog(data: string): MatDialogRef<ModalComponent> {
    return this.dialog.open(ModalComponent, {
      data: { menssage: data },
    });
  }

  toggleFavorite(event: Event): void {
    //Requisição para dicionar favorito (em desenvolvimento)

    const button = event.target as HTMLElement;

    button.classList.contains('buttonFavorite-active') ? this.renderer.removeClass(button, 'buttonFavorite-active') : this.renderer.addClass(button, 'buttonFavorite-active');
  }

}
