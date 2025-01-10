import { Component, Input, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CartItem } from '../../shared/interfeces/cart-item';
import { CartService } from '../../shared/services/cartService/cart.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart-item',
  imports: [MatFormFieldModule, MatSelectModule, MatOptionModule, MatButtonModule, MatIconModule, CurrencyPipe],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {
  @Input({ required: true, alias: 'item' }) cartItem !: CartItem;

  quantityOptions = [0, 1, 2, 3, 4, 5];

  private cartService = inject(CartService);

  onQuantityChange(quantity: number, cartItem: CartItem): void{
    cartItem.quantity = quantity;
    this.cartService.updateCartQuantitu(cartItem);
  }

  onRemove(): void{
    this.cartService.removeProduct(this.cartItem.product);
  }

}
