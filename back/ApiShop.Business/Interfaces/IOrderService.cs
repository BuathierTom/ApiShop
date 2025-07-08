using ApiShop.Common.DTO;

namespace ApiShop.Business.Interfaces
{
    public interface IOrderService
    {
        Task<OrderDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
        Task<IEnumerable<OrderDto>> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken = default);
        Task<IEnumerable<OrderDto>> GetAllAsync(CancellationToken cancellationToken = default);
        Task<OrderDto> CreateAsync(OrderDto dto, CancellationToken cancellationToken = default);
        Task UpdateAsync(OrderDto dto, CancellationToken cancellationToken = default);
        Task DeleteAsync(Guid id, CancellationToken cancellationToken = default);
    }
}