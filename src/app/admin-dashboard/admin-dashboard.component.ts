import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { FooterComponent } from '../shared/components/footer/footer.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  users: any[] = [];
  shops: any[] = [];
  orders: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (!user || user.role !== 'admin') {
      this.router.navigate(['/login']);
      return;
    }

    this.loadData();
  }

  loadData() {
    this.users = JSON.parse(localStorage.getItem('users') || '[]');
    this.shops = JSON.parse(localStorage.getItem('shops') || '[]');
    this.orders = JSON.parse(localStorage.getItem('orders') || '[]');
  }

  deleteShop(id: number) {
    this.shops = this.shops.filter(s => s.id !== id);
    localStorage.setItem('shops', JSON.stringify(this.shops));
  }

  deleteUser(id: number) {
    this.users = this.users.filter(u => u.id !== id);
    localStorage.setItem('users', JSON.stringify(this.users));
  }
}