using ApiShop.Common.DAO;
using ApiShop.DataAccess.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ApiShop.DataAccess.Implementations
{
    public class CartItemRepository : ICartItemRepository
    {
        private readonly ApiShopDbContext _context;

        public CartItemRepository(ApiShopDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CartItemDao>> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken = default)
        {
            return await _context.CartItems
                .Where(c => c.UserId == userId)
                .ToListAsync(cancellationToken);
        }

        public async Task<CartItemDao?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            return await _context.CartItems.FindAsync(new object[] { id }, cancellationToken);
        }

        public async Task AddAsync(CartItemDao item, CancellationToken cancellationToken = default)
        {
            _context.CartItems.Add(item);
            await _context.SaveChangesAsync(cancellationToken);
        }

        public async Task UpdateAsync(CartItemDao item, CancellationToken cancellationToken = default)
        {
            _context.CartItems.Update(item);
            await _context.SaveChangesAsync(cancellationToken);
        }

        public async Task DeleteAsync(Guid id, CancellationToken cancellationToken = default)
        {
            var item = await _context.CartItems.FindAsync(new object[] { id }, cancellationToken);
            if (item is not null)
            {
                _context.CartItems.Remove(item);
                await _context.SaveChangesAsync(cancellationToken);
            }
        }

        public async Task ClearCartAsync(Guid userId, CancellationToken cancellationToken = default)
        {
            var items = _context.CartItems.Where(c => c.UserId == userId);
            _context.CartItems.RemoveRange(items);
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
