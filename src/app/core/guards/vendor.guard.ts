import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VendorGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {

    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');

    if (user && user.role === 'vendor') {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}