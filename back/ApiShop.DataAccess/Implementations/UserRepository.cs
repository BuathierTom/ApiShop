using ApiShop.Common.DTO;
using ApiShop.DataAccess.Interfaces;

namespace ApiShop.DataAccess.Implementations
{
    public class UserRepository : IUserRepository
    {
        private readonly List<UserDto> _users = new();

        public Task<UserDto?> GetByIdAsync(Guid id) =>
            Task.FromResult(_users.FirstOrDefault(u => u.Id == id));

        public Task<UserDto?> GetByEmailAsync(string email) =>
            Task.FromResult(_users.FirstOrDefault(u => u.Email == email));

        public Task<IEnumerable<UserDto>> GetAllAsync() =>
            Task.FromResult<IEnumerable<UserDto>>(_users);

        public Task AddAsync(UserDto user)
        {
            _users.Add(user);
            return Task.CompletedTask;
        }

        public Task UpdateAsync(UserDto user)
        {
            var existing = _users.FirstOrDefault(u => u.Id == user.Id);
            if (existing != null)
            {
                _users.Remove(existing);
                _users.Add(user);
            }
            return Task.CompletedTask;
        }

        public Task DeleteAsync(Guid id)
        {
            var user = _users.FirstOrDefault(u => u.Id == id);
            if (user != null)
                _users.Remove(user);

            return Task.CompletedTask;
        }
    }
}