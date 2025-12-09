import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { NavbarComponent }from './components/navbar/navbar';
import { LoginComponent }from './components/navbar/login/login.component';
import { RegisterComponent }from './components/navbar/register/register.component';
import { ProductListComponent }from './components/navbar/product-list/product-list.component';
import { CartComponent }from './components/navbar/cart/cart.component';
import { CheckoutComponent }from '../../components/navbar/checkout/checkout';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ProductListComponent,
    CartComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}