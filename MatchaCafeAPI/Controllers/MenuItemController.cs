using Microsoft.AspNetCore.Mvc;
using MatchaCafeAPI.Models;

namespace MatchaCafeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuItemController : ControllerBase
    {
        // สร้างข้อมูลจำลอง (Mock Data)
        private static List<MenuItem> _menuItems = new List<MenuItem>
{
    // --- แถวที่ 1 ---
    new MenuItem { Id = 1, Name = "Classic Matcha", Description = "Rich & Creamy", Price = 120, Category = "Milk", ImageUrl = "/images/menulatte.png" },
    new MenuItem { Id = 2, Name = "Matcha Yuzu", Description = "Refreshing Citrus", Price = 140, Category = "Fruit", ImageUrl = "/images/menuyuzu.png" },
    new MenuItem { Id = 3, Name = "Matcha Coconut", Description = "Sweet & Tropical", Price = 135, Category = "Fruit", ImageUrl = "/images/menucoconut.png" },
    new MenuItem { Id = 4, Name = "Matcha Cold Whisk", Description = "Pure & Authentic", Price = 130, Category = "Clear", ImageUrl = "/images/menucoldwhisk.png" },

    // --- แถวที่ 2 (เพิ่มใหม่) ---
    new MenuItem { Id = 5, Name = "Hojicha Latte", Description = "Roasted Tea Aroma", Price = 125, Category = "Milk", ImageUrl = "/images/menuhojicha.png" },
    new MenuItem { Id = 6, Name = "Matcha Frappe", Description = "Ice Blended Style", Price = 150, Category = "Frappe", ImageUrl = "/images/menufrappe.png" },
    new MenuItem { Id = 7, Name = "Clear Matcha", Description = "Light & Healthy", Price = 100, Category = "Clear", ImageUrl = "/images/menuclear.png" },
    new MenuItem { Id = 8, Name = "Matcha Soft Serve", Description = "Premium Ice Cream", Price = 89, Category = "Dessert", ImageUrl = "/images/menusoftserve.png" }
};
        [HttpGet]
        public ActionResult<List<MenuItem>> GetMenuItems()
        {
            return Ok(_menuItems);
        }

        [HttpPost]
        public ActionResult<List<MenuItem>> AddMenuItem(MenuItem newItem)
        {
            newItem.Id = _menuItems.Max(m => m.Id) + 1;
            _menuItems.Add(newItem);
            return Ok(_menuItems);
        }
    }
}