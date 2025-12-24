import { Component } from '@angular/core';
// 👇 1. ต้องมีบรรทัด Import นี้
import { MenuListComponent } from './menu-list/menu-list'; 

@Component({
  selector: 'app-root',
  standalone: true,
  // 👇 2. ต้องเอาชื่อมาใส่ในวงเล็บนี้ด้วย!
  imports: [MenuListComponent], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'matcha-cafe-web';
}