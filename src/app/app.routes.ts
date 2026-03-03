import { Routes } from '@angular/router';
import { VendorGuard } from './core/guards/vendor.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./auth/register/register.component').then(m => m.RegisterComponent)
  },

  {
    path: 'admin',
    loadComponent: () =>
      import('./admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
  },

  {
    path: 'client',
    loadComponent: () =>
      import('./client-dashboard/client-dashboard.component').then(m => m.ClientDashboardComponent)
  },

  {
    path: 'vendor',
    canActivate: [VendorGuard],
    loadComponent: () =>
      import('./vendor-dashboard/vendor-dashboard.component').then(m => m.VendorDashboardComponent)
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];