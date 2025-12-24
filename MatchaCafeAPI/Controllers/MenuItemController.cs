using Microsoft.AspNetCore.Mvc;
using MatchaCafeAPI.Data; // เพื่อเรียกใช้ AppDbContext
using MatchaCafeAPI.Models;
using Microsoft.EntityFrameworkCore; // เพื่อใช้ ToListAsync()

namespace MatchaCafeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuItemController : ControllerBase
    {
        // ประกาศตัวแปรเพื่อเชื่อมต่อ Database
        private readonly AppDbContext _context;

        // รับ Database เข้ามาผ่าน Constructor
        public MenuItemController(AppDbContext context)
        {
            _context = context;
        }

        // GET: ดึงข้อมูลจาก Database จริงๆ
        [HttpGet]
        public async Task<ActionResult<List<MenuItem>>> GetMenuItems()
        {
            return await _context.MenuItems.ToListAsync();
        }

        // POST: บันทึกข้อมูลลง Database จริงๆ
        [HttpPost]
        public async Task<ActionResult<MenuItem>> AddMenuItem(MenuItem newItem)
        {
            _context.MenuItems.Add(newItem);
            await _context.SaveChangesAsync(); // สั่ง Save ลง DB

            return CreatedAtAction(nameof(GetMenuItems), new { id = newItem.Id }, newItem);
        }
    }
}