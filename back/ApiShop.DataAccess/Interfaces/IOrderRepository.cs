using ApiShop.Common.DAO;

namespace ApiShop.DataAccess.Interfaces
{
    public interface IOrderRepository
    {
        Task<OrderDao?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
        Task<IEnumerable<OrderDao>> GetAllAsync(CancellationToken cancellationToken = default);
        Task<IEnumerable<OrderDao>> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken = default);
        Task AddAsync(OrderDao order, CancellationToken cancellationToken = default);
        Task UpdateAsync(OrderDao order, CancellationToken cancellationToken = default);
        Task DeleteAsync(Guid id, CancellationToken cancellationToken = default);
    }
}