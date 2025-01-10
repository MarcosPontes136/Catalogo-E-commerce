
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { CartItemComponent } from '../cart-item/cart-item.component';
import { CartService } from '../../shared/services/cartService/cart.service';


@Component({
  selector: 'app-cart-list',
  imports: [MatCardModule, CartItemComponent],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.scss'
})
export class CartListComponent {
  private cartService = inject(CartService);

  cartItems = this.cartService.cartItems;
}
