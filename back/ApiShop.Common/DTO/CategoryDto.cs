namespace ApiShop.Common.DTO
{
    public class CategoryDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public Guid? ParentCategoryId { get; set; } 
    }
}