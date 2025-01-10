import { Component, inject } from '@angular/core';

import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CartService } from '../../shared/services/cartService/cart.service';

@Component({
  selector: 'app-cart-total-summary',
  imports: [MatCardModule, MatButtonModule, CurrencyPipe],
  templateUrl: './cart-total-summary.component.html',
  styleUrl: './cart-total-summary.component.scss'
})
export class CartTotalSummaryComponent {
  cartService = inject(CartService);
}
