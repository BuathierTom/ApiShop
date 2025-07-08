namespace ApiShop.Common.Request
{
    public class UserCreateRequest
    {
        public string Email { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Role { get; set; } = "Client";
        public string Password { get; set; } = null!;
    }
}