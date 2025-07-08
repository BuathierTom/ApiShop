using ApiShop.Business.Interfaces;
using ApiShop.Common.DAO;
using ApiShop.Common.DTO;
using ApiShop.Common.Request;
using ApiShop.DataAccess.Interfaces;
using BCrypt.Net;

namespace ApiShop.Business.Implementations
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repository;

        public UserService(IUserRepository repository)
        {
            _repository = repository;
        }

        public async Task<UserDto> CreateAsync(UserCreateRequest request, CancellationToken cancellationToken = default)
        {
            var user = new UserDao
            {
                Id = Guid.NewGuid(),
                Email = request.Email,
                FirstName = request.FirstName,
                LastName = request.LastName,
                Role = "Client",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password)
            };

            await _repository.AddAsync(user, cancellationToken);
            return user.ToDto();
        }

        public async Task<UserDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            var user = await _repository.GetByIdAsync(id, cancellationToken);
            return user?.ToDto();
        }

        public async Task<UserDto?> GetByEmailAsync(string email, CancellationToken cancellationToken = default)
        {
            var user = await _repository.GetByEmailAsync(email, cancellationToken);
            return user?.ToDto();
        }

        public async Task<IEnumerable<UserDto>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var users = await _repository.GetAllAsync(cancellationToken);
            return users.Select(u => u.ToDto());
        }

        public async Task UpdateAsync(UserDto dto, CancellationToken cancellationToken = default)
        {
            var user = new UserDao
            {
                Id = dto.Id,
                Email = dto.Email,
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Role = dto.Role,
                PasswordHash = "NO_CHANGE"
            };

            await _repository.UpdateAsync(user, cancellationToken);
        }

        public Task DeleteAsync(Guid id, CancellationToken cancellationToken = default)
            => _repository.DeleteAsync(id, cancellationToken);
        
        public async Task<UserDto?> LoginAsync(LoginRequest request, CancellationToken cancellationToken = default)
        {
            var userDao = await _repository.GetByEmailAsync(request.Email, cancellationToken);
            if (userDao is null)
                return null;

            bool isValid = BCrypt.Net.BCrypt.Verify(request.Password, userDao.PasswordHash);

            return isValid ? userDao.ToDto() : null;
        }
        
        public async Task PromoteToAdminAsync(Guid userId, CancellationToken cancellationToken = default)
        {
            var user = await _repository.GetByIdAsync(userId, cancellationToken);
            if (user is null)
                throw new Exception("Utilisateur non trouvé.");

            user.Role = "Admin";
            await _repository.UpdateAsync(user, cancellationToken);
        }
    }
}
