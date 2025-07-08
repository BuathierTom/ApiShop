using ApiShop.Common.DAO;

namespace ApiShop.DataAccess.Interfaces
{
    public interface ICategoryRepository
    {
        Task<CategoryDao?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
        Task<IEnumerable<CategoryDao>> GetAllAsync(CancellationToken cancellationToken = default);
        Task<IEnumerable<CategoryDao>> GetByParentIdAsync(Guid? parentId, CancellationToken cancellationToken = default);
        Task AddAsync(CategoryDao category, CancellationToken cancellationToken = default);
        Task UpdateAsync(CategoryDao category, CancellationToken cancellationToken = default);
        Task DeleteAsync(Guid id, CancellationToken cancellationToken = default);
    }
}