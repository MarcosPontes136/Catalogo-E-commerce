import { computed, effect, Injectable, signal } from '@angular/core';
import { CartItem } from '../../interfeces/cart-item';
import { Product } from '../../interfeces/products';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems = signal<CartItem[]>([]);
  cartCount = computed(() => this.cartItems().reduce((acc, curr) => acc + curr.quantity, 0));
  cartSubTotal = computed(() => this.cartItems().reduce((acc, curr) => acc + (curr.quantity * curr.product.price), 0));

  cartTax = computed(() => this.cartSubTotal() * 0.08);
  cartTotal = computed(() => this.cartSubTotal() + this.cartTax());

  e = effect(() => console.log('cartCount updated', this.cartCount()));
  i = effect(() => console.log('cartItems updated', this.cartItems()));

  addProducts(product: Product): void {
    const indexFound = this.cartItems().findIndex((p) => p.product.id === product.id);

    if (indexFound >= 0) {
      const cardItem = this.cartItems()[indexFound];
      cardItem.quantity += 1;
      this.updateCartQuantitu(cardItem);

    } else {
      this.cartItems.update((items) => [...items, {product, quantity: 1}]);
    }
  }

  updateCartQuantitu(cartItem: CartItem): void{
    const indexFound = this.cartItems().findIndex((p) => p.product.id === cartItem.product.id);

    if (indexFound >= 0) {
      this.cartItems.update((items) => items.map((p) => p.product.id === cartItem.product.id ? cartItem : p));
    }

  }

  removeProduct(product: Product): void {
    this.cartItems.update((items) => items.filter((p) => p.product.id !== product.id));
  }
}
