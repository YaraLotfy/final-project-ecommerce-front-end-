// import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet],
//   template: `
//     <h1>Welcome to {{ title() }}!</h1>

//     <router-outlet />
//   `,
//   styles: [],
// })
// export class App {
//   protected readonly title = signal('final-project-ecommerce');
// }
import { Component } from '@angular/core';
import { NavbarComponent } from "./components/navbar/navbar";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [NavbarComponent, RouterOutlet]
})
export class AppComponent {
  title = 'angular-ecommerce';
}
