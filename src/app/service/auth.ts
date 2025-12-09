import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';

  private loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private router: Router) {}

  private hasToken(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  isLoggedInSync(): boolean {
    return this.hasToken();
  }

  // Fake login – in real app call HTTP API
  login(email: string, password: string): Observable<boolean> {
    if (email && password) {
      localStorage.setItem(this.TOKEN_KEY, 'dummy-token');
      this.loggedInSubject.next(true);
      return of(true);
    }
    return of(false);
  }

  // Fake register – just logs in the user
  register(name: string, email: string, password: string): Observable<boolean> {
    return this.login(email, password);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.loggedInSubject.next(false);
    this.router.navigate(['/login']);
  }
}
