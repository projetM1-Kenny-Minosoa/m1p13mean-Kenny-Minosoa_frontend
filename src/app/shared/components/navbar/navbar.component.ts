import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navbar">
      <div class="right-section">
        <span>Bienvenue, {{ userName }}</span>

        <button (click)="toggleTheme()">
          {{ isDark ? 'Light' : 'Dark' }}
        </button>

        <button (click)="logout()">Déconnexion</button>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 15px;
      background-color: var(--nav-bg);
      color: var(--text-color);
    }

    .right-section {
      display: flex;
      gap: 15px;
      align-items: center;
    }

    button {
      padding: 6px 12px;
      border: none;
      cursor: pointer;
      border-radius: 5px;
    }
  `]
})
export class NavbarComponent {

  userName = '';
  isDark = false;

  constructor(private auth: AuthService) {
    this.userName = this.auth.getUserName(); // doit exister dans ton AuthService
  }

  logout() {
    this.auth.logout();
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    document.body.classList.toggle('dark-theme');
  }
}