using ApiShop.Common.DTO;

namespace ApiShop.Common.DAO
{
    public class CartItemDao
    {
        public Guid Id { get; set; }
        public Guid ProductId { get; set; }
        public Guid UserId { get; set; }
        public int Quantity { get; set; }

        public CartItemDto ToDto() => new()
        {
            Id = Id,
            ProductId = ProductId,
            UserId = UserId,
            Quantity = Quantity
        };
    }
}