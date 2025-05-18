import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn = signal(false); // estado reactivo

  login(username: string, password: string): boolean {
    // Simulación de autenticación real
    if (username === 'admin' && password === 'admin') {
      this._isLoggedIn.set(true);
      return true;
    }
    return false;
  }

  logout() {
    this._isLoggedIn.set(false);
  }

  isLoggedIn(): boolean {
    return this._isLoggedIn();
  }
}
