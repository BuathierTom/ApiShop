using ApiShop.Common.DTO;
using ApiShop.DataAccess.Interfaces;

namespace ApiShop.DataAccess.Implementations
{
    public class OrderRepository : IOrderRepository
    {
        private readonly List<OrderDto> _orders = new();

        public Task<OrderDto?> GetByIdAsync(Guid id) =>
            Task.FromResult(_orders.FirstOrDefault(o => o.Id == id));

        public Task<IEnumerable<OrderDto>> GetByUserIdAsync(Guid userId) =>
            Task.FromResult<IEnumerable<OrderDto>>(_orders.Where(o => o.UserId == userId));

        public Task<IEnumerable<OrderDto>> GetAllAsync() =>
            Task.FromResult<IEnumerable<OrderDto>>(_orders);

        public Task AddAsync(OrderDto order)
        {
            _orders.Add(order);
            return Task.CompletedTask;
        }

        public Task UpdateAsync(OrderDto order)
        {
            var existing = _orders.FirstOrDefault(o => o.Id == order.Id);
            if (existing != null)
            {
                _orders.Remove(existing);
                _orders.Add(order);
            }
            return Task.CompletedTask;
        }

        public Task DeleteAsync(Guid id)
        {
            var order = _orders.FirstOrDefault(o => o.Id == id);
            if (order != null)
                _orders.Remove(order);

            return Task.CompletedTask;
        }
    }
}