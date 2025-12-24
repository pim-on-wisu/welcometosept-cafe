namespace MatchaCafeAPI.Models
{
    public class OrderItem
    {
        public int Id { get; set; }
        public string MenuName { get; set; } = string.Empty;
        public string Options { get; set; } = string.Empty; // เช่น "Sweet 50%, Oat Milk"
        public decimal Price { get; set; } // ราคาต่อแก้ว (ณ ตอนที่ซื้อ)
        public int Quantity { get; set; } // จำนวนแก้ว
        
        // เชื่อมกลับไปหาออเดอร์หลัก
        public int OrderId { get; set; }
    }
}