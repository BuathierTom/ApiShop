namespace ApiShop.Common.Request
{
    public class CartItemCreateRequest
    {
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
        public Guid UserId { get; set; }
    }
}