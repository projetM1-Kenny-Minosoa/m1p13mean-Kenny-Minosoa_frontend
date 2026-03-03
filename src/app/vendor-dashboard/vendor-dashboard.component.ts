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
}

interface Shop {
  id: number;
  name: string;
  category: string;
  products: Product[];
  vendorName: string;
}

interface Order {
  id: number;
  clientName: string;
  shopId: number;
  products: any[];
  total: number;
  contact: string;
  address: string;
  deliveryDate: string;
  status: string;
}

@Component({
  selector: 'app-vendor-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, FooterComponent, NavbarComponent],
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.css']
})
export class VendorDashboardComponent implements OnInit {

  vendorName = '';
  shop: Shop | null = null;
  shops: Shop[] = [];
  orders: Order[] = [];

  newProduct: Product = { id: 0, name: '', price: 0, image: '' };
  editingProduct: Product | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (!user || user.role !== 'vendor') {
      this.router.navigate(['/login']);
      return;
    }

    this.vendorName = user.name;

    this.shops = JSON.parse(localStorage.getItem('shops') || '[]');
    this.shop = this.shops.find(s => s.vendorName === this.vendorName) || null;

    const allOrders: Order[] = JSON.parse(localStorage.getItem('orders') || '[]');

    if (this.shop) {
      this.orders = allOrders.filter(o => o.shopId === this.shop!.id);
    }
  }

  /* ================= BOUTIQUE ================= */

  createShop(name: string, category: string) {
    if (this.shop) return alert('Vous avez déjà une boutique');

    const newShop: Shop = {
      id: Date.now(),
      name,
      category,
      products: [],
      vendorName: this.vendorName
    };

    this.shops.push(newShop);
    localStorage.setItem('shops', JSON.stringify(this.shops));
    this.shop = newShop;
  }

  /* ================= PRODUITS ================= */

  addProduct() {
    if (!this.shop) return;
    if (!this.newProduct.name || !this.newProduct.price)
      return alert('Nom et prix obligatoires');

    const product: Product = {
      ...this.newProduct,
      id: Date.now()
    };

    this.shop.products.push(product);
    localStorage.setItem('shops', JSON.stringify(this.shops));

    this.newProduct = { id: 0, name: '', price: 0, image: '' };
  }

  startEdit(product: Product) {
    this.editingProduct = { ...product };
  }

  saveEdit() {
    if (!this.shop || !this.editingProduct) return;

    const index = this.shop.products.findIndex(p => p.id === this.editingProduct!.id);
    this.shop.products[index] = this.editingProduct;

    localStorage.setItem('shops', JSON.stringify(this.shops));
    this.editingProduct = null;
  }

  deleteProduct(productId: number) {
    if (!this.shop) return;

    this.shop.products = this.shop.products.filter(p => p.id !== productId);
    localStorage.setItem('shops', JSON.stringify(this.shops));
  }

  /* ================= UPLOAD IMAGE ================= */

 onImageSelected(event: any) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    this.newProduct.image = reader.result as string;
  };
  reader.readAsDataURL(file);
}

onEditImageSelected(event: any) {
  const file = event.target.files[0];
  if (!file || !this.editingProduct) return;

  const reader = new FileReader();
  reader.onload = () => {
    this.editingProduct!.image = reader.result as string;
  };
  reader.readAsDataURL(file);
}

  /* ================= COMMANDES ================= */

  changeStatus(order: Order, status: string) {
    order.status = status;

    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]')
      .map((o: Order) => o.id === order.id ? order : o);

    localStorage.setItem('orders', JSON.stringify(allOrders));
  }
}