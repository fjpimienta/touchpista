import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly validEmail = 'test@example.com';
  private readonly validPassword = 'password123';
  private loggedIn = false;

  login(email: string, password: string): boolean {
    if (email === this.validEmail && password === this.validPassword) {
      this.loggedIn = true;
      return true;
    }
    return false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  logout(): void {
    this.loggedIn = false;
  }
}
