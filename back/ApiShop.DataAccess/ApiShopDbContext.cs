using ApiShop.Common.DAO;
using ApiShop.Common.DTO;
using Microsoft.EntityFrameworkCore;

namespace ApiShop.DataAccess
{
    public class ApiShopDbContext : DbContext
    {
        public ApiShopDbContext(DbContextOptions<ApiShopDbContext> options)
            : base(options) {}

        public DbSet<UserDao> Users { get; set; }
        public DbSet<ProductDto> Products { get; set; }
        public DbSet<CategoryDto> Categories { get; set; }
        public DbSet<CartItemDto> CartItems { get; set; }
        public DbSet<OrderDto> Orders { get; set; }
        public DbSet<OrderItemDto> OrderItems { get; set; }
    }
}