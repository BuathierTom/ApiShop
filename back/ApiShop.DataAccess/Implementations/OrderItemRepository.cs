using ApiShop.Common.DAO;
using ApiShop.DataAccess.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ApiShop.DataAccess.Implementations
{
    public class OrderItemRepository : IOrderItemRepository
    {
        private readonly ApiShopDbContext _context;

        public OrderItemRepository(ApiShopDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<OrderItemDao>> GetByOrderIdAsync(Guid orderId, CancellationToken cancellationToken = default)
        {
            return await _context.OrderItems
                .Where(oi => oi.OrderId == orderId)
                .ToListAsync(cancellationToken);
        }

        public async Task AddRangeAsync(IEnumerable<OrderItemDao> items, CancellationToken cancellationToken = default)
        {
            _context.OrderItems.AddRange(items);
            await _context.SaveChangesAsync(cancellationToken);
        }

        public async Task DeleteByOrderIdAsync(Guid orderId, CancellationToken cancellationToken = default)
        {
            var items = _context.OrderItems.Where(oi => oi.OrderId == orderId);
            _context.OrderItems.RemoveRange(items);
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}