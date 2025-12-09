import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
// Update the import path below to the correct location of your AuthService
import { Inject } from '@angular/core';
// Update the path below to the correct location of AuthService, for example:
import { AuthService } from '../../../service/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
   standalone: true,
  imports: [FormsModule]
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  constructor(
    @Inject(AuthService) private authService: AuthService,
    private router: Router
  ) {}
  

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    this.authService.login(this.email, this.password).subscribe((success: any) => {
      if (success) {
        this.router.navigate(['/products']);
      } else {
        this.errorMessage = 'Invalid credentials.';
      }
    });
  }
}
