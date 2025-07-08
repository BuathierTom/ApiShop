using ApiShop.Business.Interfaces;
using ApiShop.Common.DAO;
using ApiShop.Common.DTO;
using ApiShop.DataAccess.Interfaces;

namespace ApiShop.Business.Implementations
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IOrderItemRepository _itemRepository;
        
        public OrderService(IOrderRepository orderRepository, IOrderItemRepository itemRepository)
        {
            _orderRepository = orderRepository;
            _itemRepository = itemRepository;
        }

        public async Task<OrderDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            var order = await _orderRepository.GetByIdAsync(id, cancellationToken);
            if (order is null) return null;

            var items = await _itemRepository.GetByOrderIdAsync(id, cancellationToken);
            var dto = order.ToDto();
            dto.Items = items.Select(i => i.ToDto()).ToList();
            return dto;
        }

        public async Task<IEnumerable<OrderDto>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var daos = await _orderRepository.GetAllAsync(cancellationToken);
            return daos.Select(o => o.ToDto());
        }

        public async Task<IEnumerable<OrderDto>> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken = default)
        {
            var daos = await _orderRepository.GetByUserIdAsync(userId, cancellationToken);
            return daos.Select(o => o.ToDto());
        }

        public async Task<OrderDto> CreateAsync(OrderDto dto, CancellationToken cancellationToken = default)
        {
            var orderId = Guid.NewGuid();

            var orderDao = new OrderDao
            {
                Id = orderId,
                UserId = dto.UserId,
                TotalPrice = dto.TotalPrice,
                CreatedAt = DateTime.UtcNow,
                Status = "Pending"
            };

            await _orderRepository.AddAsync(orderDao, cancellationToken);

            var itemDaos = dto.Items.Select(i => new OrderItemDao
            {
                Id = Guid.NewGuid(),
                OrderId = orderId,
                ProductId = i.ProductId,
                Quantity = i.Quantity,
                UnitPrice = i.UnitPrice
            });

            await _itemRepository.AddRangeAsync(itemDaos, cancellationToken);

            dto.Id = orderId;
            dto.CreatedAt = orderDao.CreatedAt;
            return dto;
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

            await _orderRepository.UpdateAsync(dao, cancellationToken);

            // Replace order items
            await _itemRepository.DeleteByOrderIdAsync(dto.Id, cancellationToken);

            var newItems = dto.Items.Select(i => new OrderItemDao
            {
                Id = Guid.NewGuid(),
                OrderId = dto.Id,
                ProductId = i.ProductId,
                Quantity = i.Quantity,
                UnitPrice = i.UnitPrice
            });

            await _itemRepository.AddRangeAsync(newItems, cancellationToken);
        }


        public Task DeleteAsync(Guid id, CancellationToken cancellationToken = default)
            => _orderRepository.DeleteAsync(id, cancellationToken);
    }
}