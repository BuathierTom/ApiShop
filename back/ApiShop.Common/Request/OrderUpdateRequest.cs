using ApiShop.Common.DTO;

namespace ApiShop.Common.Request
{
    public class OrderUpdateRequest
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public decimal TotalPrice { get; set; }
        public string Status { get; set; } = "Pending";
        public List<OrderItemDto> Items { get; set; } = new();
    }
}