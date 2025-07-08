using ApiShop.Common.DTO;

namespace ApiShop.Common.Request
{
    public class OrderCreateRequest
    {
        public Guid UserId { get; set; }
        public decimal TotalPrice { get; set; }
        public List<OrderItemDto> Items { get; set; } = new();
    }
}