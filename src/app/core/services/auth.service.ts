import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email?: string;
  password: string;
  role: 'admin' | 'vendor' | 'client';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userKey = 'users';
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  constructor(private router: Router) {
    const users = JSON.parse(localStorage.getItem(this.userKey) || '[]');
    const adminExists = users.some((u: User) => u.role === 'admin');
    if (!adminExists) {
      users.push({ name: 'admin', password: 'admin', role: 'admin' });
      localStorage.setItem(this.userKey, JSON.stringify(users));
    }

    const storedUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (storedUser) this.currentUserSubject.next(storedUser);
  }

  login(emailOrName: string, password: string): Observable<User> {
    const users: User[] = JSON.parse(localStorage.getItem(this.userKey) || '[]');
    const user = users.find(u => (u.email === emailOrName || u.name === emailOrName) && u.password === password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return of(user);
    } else {
      return throwError(() => ({ message: 'Nom ou mot de passe incorrect' }));
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  register(user: User): Observable<User> {
    const users: User[] = JSON.parse(localStorage.getItem(this.userKey) || '[]');
    if (users.some(u => u.email === user.email || u.name === user.name)) {
      return throwError(() => ({ message: 'Utilisateur déjà existant' }));
    }
    users.push(user);
    localStorage.setItem(this.userKey, JSON.stringify(users));
    return of(user);
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getRole(): string {
    return this.currentUser?.role || '';
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }
}