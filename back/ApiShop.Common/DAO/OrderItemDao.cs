using ApiShop.Common.DTO;

namespace ApiShop.Common.DAO
{
    public class OrderItemDao
    {
        public Guid Id { get; set; }
        public Guid OrderId { get; set; }
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }

        public OrderItemDto ToDto() => new()
        {
            Id = Id,
            OrderId = OrderId,
            ProductId = ProductId,
            Quantity = Quantity,
            UnitPrice = UnitPrice
        };
    }
}