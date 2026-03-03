import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface Shop {
  id: number;
  name: string;
  category: string;
  products: Product[];
}

export interface Order {
  id: number;
  shopId: number;
  clientName: string;
  products: { productId: number; name: string; quantity: number; price: number }[];
  total: number;
}

@Injectable({ providedIn: 'root' })
export class ShopService {

  constructor() {
    if (!localStorage.getItem('shops')) {
      const initialShops: Shop[] = [
        { 
          id: 1, 
          name: 'Boutique Alimentaire', 
          category: 'Aliment',
          products: [
            { id: 1, name: 'Riz', price: 5000 },
            { id: 2, name: 'Huile', price: 8000 }
          ]
        },
        { 
          id: 2, 
          name: 'Boutique Vêtements', 
          category: 'Vêtements',
          products: [
            { id: 3, name: 'T-shirt', price: 15000 },
            { id: 4, name: 'Jean', price: 25000 }
          ]
        },
        { 
          id: 3, 
          name: 'Boutique Accessoires', 
          category: 'Accessoires',
          products: [
            { id: 5, name: 'Montre', price: 50000 },
            { id: 6, name: 'Sac', price: 30000 }
          ]
        },
      ];
      localStorage.setItem('shops', JSON.stringify(initialShops));
    }

    if (!localStorage.getItem('orders')) {
      localStorage.setItem('orders', JSON.stringify([]));
    }
  }

  getShops(): Shop[] {
    return JSON.parse(localStorage.getItem('shops') || '[]');
  }

  getOrders(): Order[] {
    return JSON.parse(localStorage.getItem('orders') || '[]');
  }

  placeOrder(shopId: number, clientName: string, products: { productId: number; quantity: number }[]) {
    const shops: Shop[] = this.getShops();
    const shop = shops.find(s => s.id === shopId);
    if (!shop) return null;

    const orderProducts = products.map(p => {
      const prod = shop.products.find(sp => sp.id === p.productId);
      return {
        productId: p.productId,
        name: prod?.name || '',
        quantity: p.quantity,
        price: prod?.price || 0
      };
    });

    const total = orderProducts.reduce((sum, p) => sum + p.price * p.quantity, 0);

    const orders: Order[] = this.getOrders();
    const newOrder: Order = {
      id: orders.length ? orders[orders.length - 1].id + 1 : 1,
      shopId,
      clientName,
      products: orderProducts,
      total
    };
    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
    return newOrder;
  }

  deleteOrder(orderId: number) {
    let orders: Order[] = this.getOrders();
    orders = orders.filter(o => o.id !== orderId);
    localStorage.setItem('orders', JSON.stringify(orders));
  }

  updateOrder(orderId: number, products: { productId: number; quantity: number }[]) {
    const orders: Order[] = this.getOrders();
    const shops: Shop[] = this.getShops();

    const order = orders.find(o => o.id === orderId);
    if (!order) return null;

    const shop = shops.find(s => s.id === order.shopId);
    if (!shop) return null;

    const orderProducts = products.map(p => {
      const prod = shop.products.find(sp => sp.id === p.productId);
      return {
        productId: p.productId,
        name: prod?.name || '',
        quantity: p.quantity,
        price: prod?.price || 0
      };
    });

    order.products = orderProducts;
    order.total = orderProducts.reduce((sum, p) => sum + p.price * p.quantity, 0);

    localStorage.setItem('orders', JSON.stringify(orders));
    return order;
  }
}