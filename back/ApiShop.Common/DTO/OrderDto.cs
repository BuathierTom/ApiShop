namespace ApiShop.Common.DTO
{
    public class OrderDto
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public DateTime CreatedAt { get; set; }
        public decimal TotalPrice { get; set; }
        public string Status { get; set; } = "Pending"; // Paid, Shipped, Refunded...
        public List<OrderItemDto> Items { get; set; } = new();
    }
}