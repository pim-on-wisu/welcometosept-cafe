import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 👈 1. เพิ่ม ChangeDetectorRef ตรงนี้
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../api';

@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './menu-list.html',
  styleUrl: './menu-list.css'
})
export class MenuListComponent implements OnInit {
  
  menuItems: any[] = [];

  // 👇 2. เพิ่ม cdr: ChangeDetectorRef เข้าไปในวงเล็บ
  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.api.getMenu().subscribe({
      next: (data: any) => {
        console.log('ข้อมูลมาแล้ว (Reload):', data); // เช็ค Console ดูว่าบรรทัดนี้ขึ้นไหม
        this.menuItems = data;
        
        // 👇 3. สั่งให้วาดหน้าจอใหม่ทันที!
        this.cdr.detectChanges(); 
      },
      error: (err: any) => {
        console.error('พังตรงนี้:', err); // ถ้ามีตัวแดง ให้ดูบรรทัดนี้
      }
    });
  }
}