using ApiShop.Common.DAO;

namespace ApiShop.DataAccess.Interfaces
{
    public interface IProductRepository
    {
        Task<ProductDao?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
        Task<IEnumerable<ProductDao>> GetAllAsync(CancellationToken cancellationToken = default);
        Task<IEnumerable<ProductDao>> GetByCategoryIdAsync(Guid categoryId, CancellationToken cancellationToken = default);
        Task AddAsync(ProductDao product, CancellationToken cancellationToken = default);
        Task UpdateAsync(ProductDao product, CancellationToken cancellationToken = default);
        Task DeleteAsync(Guid id, CancellationToken cancellationToken = default);
    }
}