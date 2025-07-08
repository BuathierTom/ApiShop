using ApiShop.Common.DTO;

namespace ApiShop.Common.DAO
{
    public class CategoryDao
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public Guid? ParentCategoryId { get; set; }

        public CategoryDto ToDto() => new()
        {
            Id = Id,
            Name = Name,
            ParentCategoryId = ParentCategoryId
        };
    }
}