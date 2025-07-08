using ApiShop.Common.DTO;

namespace ApiShop.DataAccess.Interfaces
{
    public interface ICartItemRepository
    {
        Task<IEnumerable<CartItemDto>> GetByUserIdAsync(Guid userId);
        Task<CartItemDto?> GetByIdAsync(Guid id);
        Task AddAsync(CartItemDto item);
        Task UpdateAsync(CartItemDto item);
        Task DeleteAsync(Guid id);
        Task ClearCartAsync(Guid userId);
    }
}