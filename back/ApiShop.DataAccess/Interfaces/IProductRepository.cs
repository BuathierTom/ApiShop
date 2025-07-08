using ApiShop.Common.DTO;

namespace ApiShop.DataAccess.Interfaces
{
    public interface IProductRepository
    {
        Task<ProductDto?> GetByIdAsync(Guid id);
        Task<IEnumerable<ProductDto>> GetAllAsync();
        Task<IEnumerable<ProductDto>> GetByCategoryIdAsync(Guid categoryId);
        Task AddAsync(ProductDto product);
        Task UpdateAsync(ProductDto product);
        Task DeleteAsync(Guid id);
    }
}