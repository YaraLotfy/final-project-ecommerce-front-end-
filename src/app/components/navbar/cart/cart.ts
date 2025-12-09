import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../service/cart';
import { CartItem } from '../../../models/cart-item.model';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [CurrencyPipe]
})
export class CartComponent implements OnInit {
  items: CartItem[] = [];
  total = 0;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotal();

    this.cartService.items$.subscribe((items: CartItem[]) => {
      this.items = items;
      this.total = this.cartService.getTotal();
    });
  }

  removeItem(id: number): void {
    this.cartService.removeFromCart(id);
  }

  changeQty(id: number, qty: string): void {
    const quantity = Number(qty);
    this.cartService.updateQuantity(id, quantity);
  }

  goToCheckout(): void {
    this.router.navigate(['/checkout']);
  }
}
