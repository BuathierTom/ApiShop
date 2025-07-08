using ApiShop.Business.Interfaces;
using ApiShop.Common.DTO;
using ApiShop.DataAccess.Interfaces;

namespace ApiShop.Business.Implementations
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _repository;

        public OrderService(IOrderRepository repository)
        {
            _repository = repository;
        }

        public Task<OrderDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default) =>
            _repository.GetByIdAsync(id);

        public Task<IEnumerable<OrderDto>> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken = default) =>
            _repository.GetByUserIdAsync(userId);

        public Task<IEnumerable<OrderDto>> GetAllAsync(CancellationToken cancellationToken = default) =>
            _repository.GetAllAsync();

        public async Task<OrderDto> CreateAsync(OrderDto dto, CancellationToken cancellationToken = default)
        {
            dto.Id = Guid.NewGuid();
            dto.CreatedAt = DateTime.UtcNow;
            await _repository.AddAsync(dto);
            return dto;
        }

        public Task UpdateAsync(OrderDto dto, CancellationToken cancellationToken = default) =>
            _repository.UpdateAsync(dto);

        public Task DeleteAsync(Guid id, CancellationToken cancellationToken = default) =>
            _repository.DeleteAsync(id);
    }
}