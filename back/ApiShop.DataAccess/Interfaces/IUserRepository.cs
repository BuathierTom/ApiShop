using ApiShop.Common.DTO;

namespace ApiShop.DataAccess.Interfaces
{
    public interface IUserRepository
    {
        Task<UserDto?> GetByIdAsync(Guid id);
        Task<UserDto?> GetByEmailAsync(string email);
        Task<IEnumerable<UserDto>> GetAllAsync();
        Task AddAsync(UserDto user);
        Task UpdateAsync(UserDto user);
        Task DeleteAsync(Guid id);
    }
}