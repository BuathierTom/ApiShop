namespace ApiShop.Common.Request
{
    public class CartItemUpdateRequest
    {
        public Guid Id { get; set; }
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
        public Guid UserId { get; set; }
    }
}