import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // 1) field initializer: NO hasToken() here
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  TOKEN_KEY: string = 'auth-token';

  // 2) constructor: uses hasToken()
  constructor(private router: Router) {
    if (this.hasToken()) {
      this.loggedInSubject.next(true);
    }
  }

  // 3) hasToken and isBrowser
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  private hasToken(): boolean {
    if (!this.isBrowser()) {
      return false;
    }
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
      if (this.isBrowser()) {
        localStorage.setItem(this.TOKEN_KEY, 'dummy-token');
      }
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
    if (this.isBrowser()) {
      localStorage.removeItem(this.TOKEN_KEY);
    }
    this.loggedInSubject.next(false);
    this.router.navigate(['/login']);
  }
}
