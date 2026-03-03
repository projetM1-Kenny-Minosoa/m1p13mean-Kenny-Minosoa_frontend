import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {

  const router = inject(Router);
  const userRole = localStorage.getItem('role');
  const expectedRole = route.data['role'];

  if (userRole !== expectedRole) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};