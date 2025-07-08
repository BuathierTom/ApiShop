using ApiShop.Business.Interfaces;
using ApiShop.Common.DAO;
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

        public async Task<OrderDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            var dao = await _repository.GetByIdAsync(id, cancellationToken);
            return dao?.ToDto(); // Items remplis après
        }

        public async Task<IEnumerable<OrderDto>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var daos = await _repository.GetAllAsync(cancellationToken);
            return daos.Select(o => o.ToDto());
        }

        public async Task<IEnumerable<OrderDto>> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken = default)
        {
            var daos = await _repository.GetByUserIdAsync(userId, cancellationToken);
            return daos.Select(o => o.ToDto());
        }

        public async Task<OrderDto> CreateAsync(OrderDto dto, CancellationToken cancellationToken = default)
        {
            var dao = new OrderDao
            {
                Id = Guid.NewGuid(),
                UserId = dto.UserId,
                TotalPrice = dto.TotalPrice,
                CreatedAt = DateTime.UtcNow,
                Status = "Pending"
            };

            await _repository.AddAsync(dao, cancellationToken);
            return dao.ToDto();
        }

        public async Task UpdateAsync(OrderDto dto, CancellationToken cancellationToken = default)
        {
            var dao = new OrderDao
            {
                Id = dto.Id,
                UserId = dto.UserId,
                TotalPrice = dto.TotalPrice,
                CreatedAt = dto.CreatedAt,
                Status = dto.Status
            };

            await _repository.UpdateAsync(dao, cancellationToken);
        }

        public Task DeleteAsync(Guid id, CancellationToken cancellationToken = default)
            => _repository.DeleteAsync(id, cancellationToken);
    }
}