using ApiShop.Common.DTO;
using ApiShop.DataAccess.Interfaces;

namespace ApiShop.DataAccess.Implementations
{
    public class CartItemRepository : ICartItemRepository
    {
        private readonly List<CartItemDto> _cartItems = new();

        public Task<IEnumerable<CartItemDto>> GetByUserIdAsync(Guid userId) =>
            Task.FromResult<IEnumerable<CartItemDto>>(_cartItems.Where(c => c.UserId == userId));

        public Task<CartItemDto?> GetByIdAsync(Guid id) =>
            Task.FromResult(_cartItems.FirstOrDefault(c => c.Id == id));

        public Task AddAsync(CartItemDto item)
        {
            _cartItems.Add(item);
            return Task.CompletedTask;
        }

        public Task UpdateAsync(CartItemDto item)
        {
            var existing = _cartItems.FirstOrDefault(c => c.Id == item.Id);
            if (existing != null)
            {
                _cartItems.Remove(existing);
                _cartItems.Add(item);
            }
            return Task.CompletedTask;
        }

        public Task DeleteAsync(Guid id)
        {
            var item = _cartItems.FirstOrDefault(c => c.Id == id);
            if (item != null)
                _cartItems.Remove(item);

            return Task.CompletedTask;
        }

        public Task ClearCartAsync(Guid userId)
        {
            _cartItems.RemoveAll(c => c.UserId == userId);
            return Task.CompletedTask;
        }
    }
}