import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class UserService {

  private API = 'https://api-m1p13mean-kenny-minosoa-backend.onrender.com/api/users';

  constructor(private http: HttpClient) {}

  getAllUsers(params?: any) {
    return this.http.get(this.API, { params });
  }

  getUser(id: string) {
    return this.http.get(`${this.API}/${id}`);
  }

  updateUser(id: string, data: any) {
    return this.http.put(`${this.API}/${id}`, data);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.API}/${id}`);
  }
}