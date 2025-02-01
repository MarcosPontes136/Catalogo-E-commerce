import { Component } from '@angular/core';
import { CartTotalSummaryComponent } from '../cart-total-summary/cart-total-summary.component';
import { CartListComponent } from '../cart-list/cart-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-cart',
  imports: [MatToolbarModule, CartListComponent, CartTotalSummaryComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

}
