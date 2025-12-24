import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // URL ของ Backend (ตรวจสอบ Port ให้ตรงกับที่รัน dotnet run อยู่นะครับ ปกติคือ 5000-5xxx)
  private apiUrl = 'http://localhost:5193/api'; 

  constructor(private http: HttpClient) { }

  getMenu() {
    return this.http.get(`${this.apiUrl}/MenuItem`);
  }

  // 👇 เพิ่มฟังก์ชันนี้เข้าไปครับ
  createOrder(orderData: any) {
    return this.http.post(`${this.apiUrl}/Order`, orderData);
  }
}