using ApiShop.Business.Interfaces;
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

        public Task<IEnumerable<CartItemDto>> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken = default) =>
            _repository.GetByUserIdAsync(userId);

        public Task<CartItemDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default) =>
            _repository.GetByIdAsync(id);

        public async Task<CartItemDto> AddAsync(CartItemDto dto, CancellationToken cancellationToken = default)
        {
            dto.Id = Guid.NewGuid();
            await _repository.AddAsync(dto);
            return dto;
        }

        public Task UpdateAsync(CartItemDto dto, CancellationToken cancellationToken = default) =>
            _repository.UpdateAsync(dto);

        public Task DeleteAsync(Guid id, CancellationToken cancellationToken = default) =>
            _repository.DeleteAsync(id);

        public Task ClearCartAsync(Guid userId, CancellationToken cancellationToken = default) =>
            _repository.ClearCartAsync(userId);
    }
}