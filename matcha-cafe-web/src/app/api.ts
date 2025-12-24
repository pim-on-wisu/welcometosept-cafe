// ใน Angular (และงานระดับ Enterprise) เราจะไม่ให้หน้าจอ (Component) คุยกับ API เองโดยตรงครับ เราจะสร้างคนกลางที่เรียกว่า Service ขึ้นมาจัดการ เพื่อความเป็นระเบียบและดูแลรักษาง่าย
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // 👇 ใส่เลข Port ของคุณตรงนี้! (ดูจาก Swagger)
  private apiUrl = 'http://localhost:5193/api/MenuItem'; 

  constructor(private http: HttpClient) { }

  getMenu() {
    // สั่งให้ยิง GET ไปที่ URL นั้น เพื่อขอข้อมูล
    return this.http.get<any[]>(this.apiUrl);
  }
}