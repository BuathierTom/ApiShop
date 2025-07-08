using ApiShop.Common.DTO;

namespace ApiShop.DataAccess.Interfaces
{
    public interface ICategoryRepository
    {
        Task<CategoryDto?> GetByIdAsync(Guid id);
        Task<IEnumerable<CategoryDto>> GetAllAsync();
        Task<IEnumerable<CategoryDto>> GetByParentIdAsync(Guid? parentId);
        Task AddAsync(CategoryDto category);
        Task UpdateAsync(CategoryDto category);
        Task DeleteAsync(Guid id);
    }
}