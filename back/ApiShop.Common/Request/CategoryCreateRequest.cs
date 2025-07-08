namespace ApiShop.Common.Request
{
    public class CategoryCreateRequest
    {
        public string Name { get; set; } = null!;
        public Guid? ParentCategoryId { get; set; }
    }
}