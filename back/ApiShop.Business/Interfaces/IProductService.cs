using ApiShop.Common.DTO;

namespace ApiShop.Business.Interfaces
{
    public interface IProductService
    {
        Task<ProductDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
        Task<IEnumerable<ProductDto>> GetAllAsync(CancellationToken cancellationToken = default);
        Task<IEnumerable<ProductDto>> GetByCategoryAsync(Guid categoryId, CancellationToken cancellationToken = default);
        Task<ProductDto> CreateAsync(ProductDto dto, CancellationToken cancellationToken = default);
        Task UpdateAsync(ProductDto dto, CancellationToken cancellationToken = default);
        Task DeleteAsync(Guid id, CancellationToken cancellationToken = default);
    }
}