namespace MatchaCafeAPI.Models
{
    public class Order
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.UtcNow; // วันที่สั่ง (Auto)
        public decimal TotalAmount { get; set; } // ราคารวมทั้งบิล
        
        // รายการสินค้าในออเดอร์นี้ (1 ออเดอร์ มีได้หลายรายการ)
        public List<OrderItem> Items { get; set; } = new List<OrderItem>();
    }
}