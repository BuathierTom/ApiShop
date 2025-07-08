using ApiShop.Common.DAO;

namespace ApiShop.DataAccess.Interfaces
{
    public interface IUserRepository
    {
        Task<UserDao?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
        Task<UserDao?> GetByEmailAsync(string email, CancellationToken cancellationToken = default);
        Task<IEnumerable<UserDao>> GetAllAsync(CancellationToken cancellationToken = default);
        Task AddAsync(UserDao user, CancellationToken cancellationToken = default);
        Task UpdateAsync(UserDao user, CancellationToken cancellationToken = default);
        Task DeleteAsync(Guid id, CancellationToken cancellationToken = default);
    }
}