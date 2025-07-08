using ApiShop.Common.DTO;

namespace ApiShop.DataAccess.Interfaces
{
    public interface IOrderRepository
    {
        Task<OrderDto?> GetByIdAsync(Guid id);
        Task<IEnumerable<OrderDto>> GetByUserIdAsync(Guid userId);
        Task<IEnumerable<OrderDto>> GetAllAsync();
        Task AddAsync(OrderDto order);
        Task UpdateAsync(OrderDto order);
        Task DeleteAsync(Guid id);
    }
}