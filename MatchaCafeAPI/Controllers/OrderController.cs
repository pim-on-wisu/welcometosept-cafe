using Microsoft.AspNetCore.Mvc;
using MatchaCafeAPI.Data;
using MatchaCafeAPI.Models;

namespace MatchaCafeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrderController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> PlaceOrder(Order order)
        {
            // บันทึกวันที่ปัจจุบัน
            order.OrderDate = DateTime.UtcNow;
            
            // สั่ง Save ลง Database (EF Core จะบันทึกทั้ง Order และ OrderItem ให้อัตโนมัติ)
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Order placed successfully!", orderId = order.Id });
        }
    }
}