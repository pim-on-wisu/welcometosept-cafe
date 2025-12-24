using Microsoft.EntityFrameworkCore;
using MatchaCafeAPI.Models;

namespace MatchaCafeAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        // สร้างตารางชื่อ MenuItems เก็บข้อมูลตามแบบ MenuItem
        public DbSet<MenuItem> MenuItems { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
    }
}