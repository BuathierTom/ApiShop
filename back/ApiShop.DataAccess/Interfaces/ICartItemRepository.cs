using ApiShop.Common.DAO;

namespace ApiShop.DataAccess.Interfaces
{
    public interface ICartItemRepository
    {
        Task<IEnumerable<CartItemDao>> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken = default);
        Task<CartItemDao?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
        Task AddAsync(CartItemDao item, CancellationToken cancellationToken = default);
        Task UpdateAsync(CartItemDao item, CancellationToken cancellationToken = default);
        Task DeleteAsync(Guid id, CancellationToken cancellationToken = default);
        Task ClearCartAsync(Guid userId, CancellationToken cancellationToken = default);
    }
}