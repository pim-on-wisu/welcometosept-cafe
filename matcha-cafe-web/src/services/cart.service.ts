import { Injectable, signal } from '@angular/core';

export interface CartItem {
  menuName: string;
  price: number;
  options: string; // เช่น "หวาน 50%, นมโอ๊ต"
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // ใช้ signal (ฟีเจอร์ใหม่ Angular) เพื่อให้หน้าจออัปเดตราคาเองอัตโนมัติ
  cartItems = signal<CartItem[]>([]); 

  // ฟังก์ชันเพิ่มของลงตะกร้า
  addToCart(item: CartItem) {
    this.cartItems.update(items => [...items, item]);
  }

  // ฟังก์ชันคำนวณราคารวม
  getTotalPrice() {
    return this.cartItems().reduce((sum, item) => sum + item.price, 0);
  }
  
  // ฟังก์ชันล้างตะกร้า (เผื่อใช้)
  clearCart() {
    this.cartItems.set([]);
  }
}