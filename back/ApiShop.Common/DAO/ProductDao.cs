using ApiShop.Common.DTO;

namespace ApiShop.Common.DAO
{
    public class ProductDao
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int Stock { get; set; }
        public Guid CategoryId { get; set; }
        public string? ImageUrl { get; set; }

        public ProductDto ToDto() => new()
        {
            Id = Id,
            Name = Name,
            Description = Description,
            Price = Price,
            Stock = Stock,
            CategoryId = CategoryId,
            ImageUrl = ImageUrl
        };
    }
}