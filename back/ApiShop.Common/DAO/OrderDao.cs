using ApiShop.Common.DTO;

namespace ApiShop.Common.DAO
{
    public class OrderDao
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public decimal TotalPrice { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Status { get; set; } = "Pending";

        public OrderDto ToDto() => new()
        {
            Id = Id,
            UserId = UserId,
            TotalPrice = TotalPrice,
            CreatedAt = CreatedAt,
            Status = Status,
            Items = new List<OrderItemDto>()
        };
    }
}