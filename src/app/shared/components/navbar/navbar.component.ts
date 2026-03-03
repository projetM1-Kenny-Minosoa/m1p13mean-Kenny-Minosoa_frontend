import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navbar">
      <div class="navbar-content">
        <span *ngIf="userName" class="user-text">Bienvenue, {{ userName }}</span>
        <button class="logout-btn" (click)="logout()">Déconnexion</button>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      display: flex;
      justify-content: flex-end; 
      align-items: center;
      width: 100%;
      background: rgba(5, 28, 77, 0.95); 
      backdrop-filter: blur(5px);
      padding: 8px 0; 
      position: sticky;
      top: 0;
      left: 0; 
      z-index: 1000;
      font-family: Arial, sans-serif;
      margin: 0; 
      margin-top: 0px;
      margin-left: 0;
    }

    .navbar-content {
      display: flex;
      align-items: center;
      gap: 8px; 
      max-width: 500px; 
      width: 100%;
      justify-content: flex-end; 
      padding: 0 10px;
    }

    .user-text {
      font-weight: 700;
      color: white;
    }

    .logout-btn {
      padding: 6px 12px;
      border: 2px solid black;
      border-radius: 12px;
      background-color: rgba(200,200,200,0.2);
      color: white;
      cursor: pointer;
      font-family: Arial, sans-serif;
      transition: background 0.2s, transform 0.2s;
    }

    .logout-btn:hover {
      background-color: rgba(200,200,200,0.4);
      transform: scale(1.05);
    }
  `]
})
export class NavbarComponent {
  userName = '';

  constructor(private router: Router) {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.userName = user?.name || '';
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}