using ApiShop.Common.DTO;

namespace ApiShop.Business.Interfaces
{
    public interface ICategoryService
    {
        Task<CategoryDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
        Task<IEnumerable<CategoryDto>> GetAllAsync(CancellationToken cancellationToken = default);
        Task<IEnumerable<CategoryDto>> GetByParentIdAsync(Guid? parentId, CancellationToken cancellationToken = default);
        Task<CategoryDto> CreateAsync(CategoryDto dto, CancellationToken cancellationToken = default);
        Task UpdateAsync(CategoryDto dto, CancellationToken cancellationToken = default);
        Task DeleteAsync(Guid id, CancellationToken cancellationToken = default);
    }
}