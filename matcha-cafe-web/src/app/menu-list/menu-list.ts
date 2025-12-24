import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // 👈 1. Import อันนี้สำคัญมาก (สำหรับ Radio/Select)
import { ApiService } from '../api';
import { CartItem, CartService } from '../../services/cart.service';

@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule], // 👈 3. ใส่ FormsModule ในนี้ด้วย
  templateUrl: './menu-list.html',
  styleUrl: './menu-list.css'
})
export class MenuListComponent implements OnInit {
  
  menuItems: any[] = [];

  // --- ตัวแปรสำหรับจัดการ Popup เลือกออปชั่น ---
  selectedItem: any = null; // เก็บเมนูที่กำลังเลือก (ถ้าเป็น null แปลว่าปิด popup)
  
  // ค่าเริ่มต้นของออปชั่นต่างๆ
  sweetnessLevel: number = 100;
  milkType: string = 'Normal';
  matchaGrade: string = 'Standard';
  showCart: boolean = false;

  constructor(
    private api: ApiService, 
    private cdr: ChangeDetectorRef,
    public cart: CartService // 👈 4. ฉีด CartService เข้ามา (ใช้ public เพื่อให้ html เรียกใช้ได้)
  ) {}

  ngOnInit() {
    this.api.getMenu().subscribe({
      next: (data: any) => {
        console.log('ข้อมูลมาแล้ว (Reload):', data);
        this.menuItems = data;
        this.cdr.detectChanges(); 
      },
      error: (err: any) => {
        console.error('พังตรงนี้:', err);
      }
    });
  }

  // --- ฟังก์ชันใหม่ที่เพิ่มเข้ามา ---

  // 1. เปิดหน้าต่างปรับแต่งเมนู (ทำงานเมื่อกดปุ่ม "สั่งเลย")
  openCustomize(item: any) {
    this.selectedItem = item;
    // รีเซ็ตค่าเป็นค่าเริ่มต้นทุกครั้งที่เปิดใหม่
    this.sweetnessLevel = 100;
    this.milkType = 'Normal';
    this.matchaGrade = 'Standard';
  }

  // 2. ปิดหน้าต่าง
  closeCustomize() {
    this.selectedItem = null;
  }

  // 3. คำนวณราคาปัจจุบัน (ราคาฐาน + ส่วนเพิ่ม)
  calculateTotalPrice(): number {
    if (!this.selectedItem) return 0;

    let total = this.selectedItem.price;

    // บวกค่านม
    if (this.milkType === 'Oat') total += 15;
    if (this.milkType === 'Almond') total += 20;

    // บวกค่าเกรดชา
    if (this.matchaGrade === 'Premium') total += 30;
    if (this.matchaGrade === 'Ceremonial') total += 50;

    return total;
  }

  // 4. ยืนยันคำสั่งซื้อ (โยนเข้าตะกร้า)
  confirmOrder() {
    if (!this.selectedItem) return;

    // สร้างข้อความสรุปออปชั่น เช่น "Sweet 50%, Oat Milk"
    let options = `Sweet ${this.sweetnessLevel}%`;
    if (this.milkType !== 'Normal') options += `, ${this.milkType} Milk`;
    if (this.matchaGrade !== 'Standard') options += `, ${this.matchaGrade} Grade`;

    // สร้าง Object สินค้าที่จะโยนลงตะกร้า
    const orderItem: CartItem = {
      menuName: this.selectedItem.name,
      price: this.calculateTotalPrice(),
      options: options
    };

    // สั่งให้ Service เอาของลงตะกร้า
    this.cart.addToCart(orderItem);

    // ปิด Popup
    this.closeCustomize();
  }
  
  // 1. ฟังก์ชันเปิดหน้าตะกร้า
  openCart() {
    this.showCart = true;
  }

  // 2. ฟังก์ชันปิดหน้าตะกร้า
  closeCart() {
    this.showCart = false;
  }

  // 3. ฟังก์ชันลบของออกจากตะกร้า
  removeItem(index: number) {
    this.cart.cartItems.update(items => {
      const newItems = [...items];
      newItems.splice(index, 1);
      return newItems;
    });
    
    // ถ้าลบจนหมด ให้ปิดหน้านี้ไปเลย
    if (this.cart.cartItems().length === 0) {
      this.closeCart();
    }
  }

  // ... (ฟังก์ชัน removeItem เดิม) ...

  // 👇 เพิ่มฟังก์ชันสั่งซื้อครับ
  placeOrder() {
    // 1. เช็คว่ามีของในตะกร้าไหม
    if (this.cart.cartItems().length === 0) return;

    // 2. เตรียมข้อมูลให้ตรงกับที่ C# Backend ต้องการ
    // (Backend ต้องการ: Items และ TotalAmount)
    const orderData = {
      totalAmount: this.cart.getTotalPrice(),
      items: this.cart.cartItems().map(item => ({
        menuName: item.menuName,
        price: item.price,
        options: item.options,
        quantity: 1 // (สมมติว่าเป็น 1 แก้วต่อ 1 รายการในตะกร้า)
      }))
    };

    // 3. ส่งไปที่ API
    this.api.createOrder(orderData).subscribe({
      next: (res) => {
        alert('✅ สั่งซื้อสำเร็จ! ขอบคุณที่อุดหนุนครับ');
        this.cart.clearCart(); // ล้างตะกร้า
        this.closeCart(); // ปิดหน้าต่าง
      },
      error: (err) => {
        console.error('สั่งซื้อไม่สำเร็จ:', err);
        alert('❌ เกิดข้อผิดพลาด กรุณาลองใหม่');
      }
    });
  }
}