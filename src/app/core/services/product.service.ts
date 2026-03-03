import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ProductService {

  private API = 'https://api-m1p13mean-kenny-minosoa-backend.onrender.com/api/products';

  constructor(private http: HttpClient) {}

  getAll(params?: any) {
    return this.http.get(this.API, { params });
  }

  getById(id: string) {
    return this.http.get(`${this.API}/${id}`);
  }

  getByShop(shopId: string) {
    return this.http.get(`${this.API}/shop/${shopId}`);
  }

  create(data: any) {
    return this.http.post(this.API, data);
  }

  update(id: string, data: any) {
    return this.http.put(`${this.API}/${id}`, data);
  }

  delete(id: string) {
    return this.http.delete(`${this.API}/${id}`);
  }
}