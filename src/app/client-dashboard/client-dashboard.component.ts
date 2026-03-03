import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';

interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
  quantity?: number;
}

interface Shop {
  id: number;
  name: string;
  category: string;
  products: Product[];
}

interface Order {
  id: number;
  clientName: string;
  shopId: number;
  products: { productId: number; name: string; quantity: number; price: number }[];
  total: number;
  contact: string;
  address: string;
  paymentMethod: string;
  deliveryDate: string;
  status: string;
}

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, FooterComponent, NavbarComponent],
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent implements OnInit {

  clientName = '';
  shops: Shop[] = [];
  orders: Order[] = [];

  showOrderForm = false;
  editingOrder: Order | null = null;
  selectedShop!: Shop;

  orderFormData = {
    contact: '',
    address: '',
    paymentMethod: 'Cash',
    deliveryDate: ''
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (!user || user.role !== 'client') {
      this.router.navigate(['/login']);
      return;
    }

    this.clientName = user.name;

    this.shops = JSON.parse(localStorage.getItem('shops') || '[]');
    this.orders = JSON.parse(localStorage.getItem('orders') || '[]')
      .filter((o: Order) => o.clientName === this.clientName);

    this.shops.forEach(shop =>
      shop.products.forEach(p => p.quantity = 0)
    );
  }

  openOrderForm(shop: Shop) {
    this.selectedShop = shop;
    this.showOrderForm = true;
  }

  confirmOrder() {
    const selectedProducts = this.selectedShop.products
      .filter(p => p.quantity && p.quantity > 0)
      .map(p => ({
        productId: p.id,
        name: p.name,
        quantity: p.quantity!,
        price: p.price
      }));

    if (!selectedProducts.length) {
      alert('Sélectionnez au moins un produit');
      return;
    }

    const newOrder: Order = {
      id: Date.now(),
      clientName: this.clientName,
      shopId: this.selectedShop.id,
      products: selectedProducts,
      total: selectedProducts.reduce((sum, p) => sum + p.price * p.quantity, 0),
      contact: this.orderFormData.contact,
      address: this.orderFormData.address,
      paymentMethod: this.orderFormData.paymentMethod,
      deliveryDate: this.orderFormData.deliveryDate,
      status: 'En attente'
    };

    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    allOrders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(allOrders));

    this.orders.push(newOrder);
    this.resetForm();
    alert('Commande passée !');
  }

  editOrder(order: Order) {
    this.editingOrder = order;
    this.orderFormData = {
      contact: order.contact,
      address: order.address,
      paymentMethod: order.paymentMethod,
      deliveryDate: order.deliveryDate
    };
  }

  saveEdit() {
    if (!this.editingOrder) return;

    this.editingOrder.contact = this.orderFormData.contact;
    this.editingOrder.address = this.orderFormData.address;
    this.editingOrder.paymentMethod = this.orderFormData.paymentMethod;
    this.editingOrder.deliveryDate = this.orderFormData.deliveryDate;

    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]')
      .map((o: Order) => o.id === this.editingOrder!.id ? this.editingOrder : o);

    localStorage.setItem('orders', JSON.stringify(allOrders));
    this.editingOrder = null;
    alert('Commande modifiée !');
  }

  deleteOrder(orderId: number) {
    this.orders = this.orders.filter(o => o.id !== orderId);

    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]')
      .filter((o: Order) => o.id !== orderId);

    localStorage.setItem('orders', JSON.stringify(allOrders));
  }

  resetForm() {
    this.showOrderForm = false;
    this.orderFormData = {
      contact: '',
      address: '',
      paymentMethod: 'Cash',
      deliveryDate: ''
    };
    this.selectedShop.products.forEach(p => p.quantity = 0);
  }

  getShopName(shopId: number): string {
    const shop = this.shops.find(s => s.id === shopId);
    return shop ? shop.name : '';
  }
}