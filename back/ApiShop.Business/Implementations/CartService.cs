using ApiShop.Business.Interfaces;
using ApiShop.Common.DAO;
using ApiShop.Common.DTO;
using ApiShop.DataAccess.Interfaces;

namespace ApiShop.Business.Implementations
{
    public class CartService : ICartService
    {
        private readonly ICartItemRepository _repository;

        public CartService(ICartItemRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<CartItemDto>> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken = default)
        {
            var daos = await _repository.GetByUserIdAsync(userId, cancellationToken);
            return daos.Select(c => c.ToDto());
        }

        public async Task<CartItemDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            var dao = await _repository.GetByIdAsync(id, cancellationToken);
            return dao?.ToDto();
        }

        public async Task<CartItemDto> AddAsync(CartItemDto dto, CancellationToken cancellationToken = default)
        {
            var dao = new CartItemDao
            {
                Id = Guid.NewGuid(),
                ProductId = dto.ProductId,
                UserId = dto.UserId,
                Quantity = dto.Quantity
            };

            await _repository.AddAsync(dao, cancellationToken);
            return dao.ToDto();
        }

        public async Task UpdateAsync(CartItemDto dto, CancellationToken cancellationToken = default)
        {
            var dao = new CartItemDao
            {
                Id = dto.Id,
                ProductId = dto.ProductId,
                UserId = dto.UserId,
                Quantity = dto.Quantity
            };

            await _repository.UpdateAsync(dao, cancellationToken);
        }

        public Task DeleteAsync(Guid id, CancellationToken cancellationToken = default)
            => _repository.DeleteAsync(id, cancellationToken);

        public Task ClearCartAsync(Guid userId, CancellationToken cancellationToken = default)
            => _repository.ClearCartAsync(userId, cancellationToken);
    }
}