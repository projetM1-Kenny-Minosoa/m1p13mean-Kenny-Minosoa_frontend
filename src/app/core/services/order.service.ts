import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class OrderService {

  private API = 'https://api-m1p13mean-kenny-minosoa-backend.onrender.com/api/orders';

  constructor(private http: HttpClient) {}

  create(data: any) {
    return this.http.post(this.API, data);
  }

  getAll() {
    return this.http.get(this.API);
  }

  getMyOrders() {
    return this.http.get(`${this.API}/my-orders`);
  }

  getShopOrders() {
    return this.http.get(`${this.API}/shop-orders`);
  }

  getById(id: string) {
    return this.http.get(`${this.API}/${id}`);
  }

  updateStatus(id: string, status: string) {
    return this.http.put(`${this.API}/${id}/status`, { status });
  }

  cancel(id: string, reason: string) {
    return this.http.put(`${this.API}/${id}/cancel`, { reason });
  }
}