namespace ApiShop.Common.Request
{
    public class ProductUpdateRequest
    {
        public Guid Id { get; set; } 
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int Stock { get; set; }
        public Guid CategoryId { get; set; }
        public string? ImageUrl { get; set; }
    }
}