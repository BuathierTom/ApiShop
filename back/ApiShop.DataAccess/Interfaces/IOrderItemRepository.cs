using ApiShop.Common.DAO;

namespace ApiShop.DataAccess.Interfaces
{
    public interface IOrderItemRepository
    {
        Task<IEnumerable<OrderItemDao>> GetByOrderIdAsync(Guid orderId, CancellationToken cancellationToken = default);
        Task AddRangeAsync(IEnumerable<OrderItemDao> items, CancellationToken cancellationToken = default);
        Task DeleteByOrderIdAsync(Guid orderId, CancellationToken cancellationToken = default);
    }
}