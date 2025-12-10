import { Component, OnInit, Inject } from '@angular/core';
import { CartService } from '../../service/cart';
import { CartItem } from '../../models/cart-item.model';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  imports: [CurrencyPipe]
})
export class CheckoutComponent implements OnInit {
  items: CartItem[] = [];
  total = 0;
  orderPlaced = false;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotal();

    if (this.items.length === 0) {
      // if no items, redirect to products
      this.router.navigate(['/products']);
    }
  }

  placeOrder(): void {
    // Here you would call backend API to create order
    this.orderPlaced = true;
    this.cartService.clearCart();
  }
}
