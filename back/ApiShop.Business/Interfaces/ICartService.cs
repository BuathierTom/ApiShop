using ApiShop.Common.DTO;

namespace ApiShop.Business.Interfaces
{
    public interface ICartService
    {
        Task<IEnumerable<CartItemDto>> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken = default);
        Task<CartItemDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
        Task<CartItemDto> AddAsync(CartItemDto dto, CancellationToken cancellationToken = default);
        Task UpdateAsync(CartItemDto dto, CancellationToken cancellationToken = default);
        Task DeleteAsync(Guid id, CancellationToken cancellationToken = default);
        Task ClearCartAsync(Guid userId, CancellationToken cancellationToken = default);
    }
}