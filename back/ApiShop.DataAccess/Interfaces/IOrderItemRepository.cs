using ApiShop.Common.DTO;

namespace ApiShop.DataAccess.Interfaces
{
    public interface IOrderItemRepository
    {
        Task<IEnumerable<OrderItemDto>> GetByOrderIdAsync(Guid orderId);
        Task<OrderItemDto?> GetByIdAsync(Guid id);
        Task AddAsync(OrderItemDto item);
        Task UpdateAsync(OrderItemDto item);
        Task DeleteAsync(Guid id);
    }
}