import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly CART_KEY = 'cart';

  private itemsSubject = new BehaviorSubject<CartItem[]>(this.loadCartFromStorage());

  items$: Observable<CartItem[]> = this.itemsSubject.asObservable();

  constructor() {}

  private loadCartFromStorage(): CartItem[] {
    const saved = localStorage.getItem(this.CART_KEY);
    return saved ? JSON.parse(saved) : [];
  }

  private saveCartToStorage(items: CartItem[]): void {
    localStorage.setItem(this.CART_KEY, JSON.stringify(items));
  }

  getItems(): CartItem[] {
    return this.itemsSubject.value;
  }

  addToCart(product: Product): void {
    const current = this.getItems();
    const index = current.findIndex(i => i.product.id === product.id);

    if (index > -1) {
      current[index].quantity += 1;
    } else {
      current.push({ product, quantity: 1 });
    }

    this.itemsSubject.next(current);
    this.saveCartToStorage(current);
  }

  removeFromCart(productId: number): void {
    const updated = this.getItems().filter(i => i.product.id !== productId);
    this.itemsSubject.next(updated);
    this.saveCartToStorage(updated);
  }

  updateQuantity(productId: number, quantity: number): void {
    const current = this.getItems();
    const index = current.findIndex(i => i.product.id === productId);
    if (index > -1) {
      current[index].quantity = quantity;
      if (current[index].quantity <= 0) {
        current.splice(index, 1);
      }
    }
    this.itemsSubject.next(current);
    this.saveCartToStorage(current);
  }

  clearCart(): void {
    this.itemsSubject.next([]);
    this.saveCartToStorage([]);
  }

  getTotal(): number {
    return this.getItems().reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }
}
