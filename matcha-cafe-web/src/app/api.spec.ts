import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'; // 1. ต้องเพิ่ม module นี้เพื่อจำลองการยิงเน็ต
import { ApiService } from './api'; // 2. แก้จาก Api เป็น ApiService (ให้ตรงกับชื่อ Class จริง)

describe('ApiService', () => { // 3. เปลี่ยนชื่อตรงนี้ด้วย
  let service: ApiService;     // 4. เปลี่ยน Type เป็น ApiService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule] // 5. ใส่ HttpClientModule เพื่อกัน Error เวลา Test
    });
    service = TestBed.inject(ApiService); // 6. Inject ตัว ApiService
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});