// src/app/app.routes.ts
import { Routes } from '@angular/router';

import { NavbarComponent } from './components/navbar/navbar.component'; 
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

import { AuthGuard } from './guards/auth-guard';
import { GuestGuard } from './guards/guest-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'navbar', component: NavbarComponent },

  // Login & register only for guests (guard)
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [GuestGuard] },

  { path: 'products', component: ProductListComponent },

  // Only logged-in users can see cart & checkout
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },

  { path: '**', redirectTo: 'products' }
];
