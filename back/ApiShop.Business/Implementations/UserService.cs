using ApiShop.Business.Interfaces;
using ApiShop.Common.DTO;
using ApiShop.DataAccess.Interfaces;

namespace ApiShop.Business.Implementations
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repository;

        public UserService(IUserRepository repository)
        {
            _repository = repository;
        }

        public Task<UserDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default) =>
            _repository.GetByIdAsync(id);

        public Task<UserDto?> GetByEmailAsync(string email, CancellationToken cancellationToken = default) =>
            _repository.GetByEmailAsync(email);

        public Task<IEnumerable<UserDto>> GetAllAsync(CancellationToken cancellationToken = default) =>
            _repository.GetAllAsync();

        public async Task<UserDto> CreateAsync(UserDto dto, CancellationToken cancellationToken = default)
        {
            dto.Id = Guid.NewGuid();
            return await Task.FromResult(dto);
        }

        public Task UpdateAsync(UserDto dto, CancellationToken cancellationToken = default) =>
            _repository.UpdateAsync(dto);

        public Task DeleteAsync(Guid id, CancellationToken cancellationToken = default) =>
            _repository.DeleteAsync(id);
    }
}