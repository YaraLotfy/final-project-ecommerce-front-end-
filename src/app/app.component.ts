// import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { NavbarComponent } from './components/navbar/navbar.component';
// import { LoginComponent } from './components/login/login.component';
// import { AppRoutingModule } from "./app-routing.module";

// @Component({
//   selector: 'app-root',
//     templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css'],
//   template: `
//     <h1>Welcome to {{ title() }}!</h1>

//     <router-outlet />
//   `,
//   styles: [],
//   imports: [AppRoutingModule, NavbarComponent],
// })
// export class AppComponent {
//   protected readonly title = signal('final-project-ecommerce');
// }
import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { NavbarComponent } from "./components/navbar/navbar.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet, NavbarComponent]
})
export class AppComponent {
  title = 'final-project-ecommerce';
}
