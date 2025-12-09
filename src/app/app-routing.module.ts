import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../..components/login/login';
import { RegisterComponent } from './components/register/register';
import { ProductListComponent } from './components/product-list/product-list';
import { CartComponent } from './components/cart/cart';
import { CheckoutComponent } from '../../components/checkout/checkout.component';

import { AuthGuard } from './guards/auth-guard';
import { GuestGuard } from './guards/guest-guard';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },

  // Login & register only for guests (guard)
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [GuestGuard] },

  { path: 'products', component: ProductListComponent },

  // Only logged in user can see cart & checkout
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },

  { path: '**', redirectTo: 'products' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
