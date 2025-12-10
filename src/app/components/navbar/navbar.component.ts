import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth';
import { CartService } from '../../service/cart';
import { CartItem } from '../../models/cart-item.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule]
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  cartCount = 0;

  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe((status: boolean) => {
      this.isLoggedIn = status;
    });

    this.cartService.items$.subscribe((items: CartItem[]) => {
      this.cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
