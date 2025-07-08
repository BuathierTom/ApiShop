using ApiShop.Common.DTO;
using ApiShop.DataAccess.Interfaces;

namespace ApiShop.DataAccess.Implementations
{
    public class OrderItemRepository : IOrderItemRepository
    {
        private readonly List<OrderItemDto> _orderItems = new();

        public Task<IEnumerable<OrderItemDto>> GetByOrderIdAsync(Guid orderId) =>
            Task.FromResult<IEnumerable<OrderItemDto>>(_orderItems.Where(i => i.OrderId == orderId));

        public Task<OrderItemDto?> GetByIdAsync(Guid id) =>
            Task.FromResult(_orderItems.FirstOrDefault(i => i.Id == id));

        public Task AddAsync(OrderItemDto item)
        {
            _orderItems.Add(item);
            return Task.CompletedTask;
        }

        public Task UpdateAsync(OrderItemDto item)
        {
            var existing = _orderItems.FirstOrDefault(i => i.Id == item.Id);
            if (existing != null)
            {
                _orderItems.Remove(existing);
                _orderItems.Add(item);
            }
            return Task.CompletedTask;
        }

        public Task DeleteAsync(Guid id)
        {
            var item = _orderItems.FirstOrDefault(i => i.Id == id);
            if (item != null)
                _orderItems.Remove(item);

            return Task.CompletedTask;
        }
    }
}