using ApiShop.Common.DTO;

namespace ApiShop.Common.DAO
{
    public class UserDao
    {
        public Guid Id { get; set; }
        public string Email { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Role { get; set; } = "Client";
        public string PasswordHash { get; set; } = null!;

        public UserDto ToDto() => new()
        {
            Id = Id,
            Email = Email,
            FirstName = FirstName,
            LastName = LastName,
            Role = Role
        };
    }
}