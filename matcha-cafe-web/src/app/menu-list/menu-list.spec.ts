import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'; // 1. เพิ่มตัวนี้ เพื่อกัน Error เรื่อง API
import { MenuListComponent } from './menu-list'; // 2. แก้ชื่อเป็น MenuListComponent

describe('MenuListComponent', () => { // 3. แก้ชื่อตรงนี้ด้วย
  let component: MenuListComponent;    // 4. แก้ Type
  let fixture: ComponentFixture<MenuListComponent>; // 5. แก้ Type

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // 6. ใส่ HttpClientModule เข้าไปคู่กัน
      imports: [MenuListComponent, HttpClientModule] 
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuListComponent); // 7. แก้ชื่อตอนสร้าง
    component = fixture.componentInstance;
    fixture.detectChanges(); // สั่งให้เริ่มทำงาน
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});