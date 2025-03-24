import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() {
    // Check if the user is already logged in (e.g., tokens exist in localStorage)
    this.isLoggedInSubject.next(!!localStorage.getItem('access_token'));
  }

  // Method to check if the user is logged in
  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }

  // Method to log in the user
  login(accessToken: string, refreshToken: string): void {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
    this.isLoggedInSubject.next(true);
  }

  // Method to log out the user
  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.isLoggedInSubject.next(false);
  }
}