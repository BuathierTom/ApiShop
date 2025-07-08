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
        public DbSet<ProductDao> Products { get; set; }
        public DbSet<CategoryDao> Categories { get; set; }
        public DbSet<CartItemDao> CartItems { get; set; }
        public DbSet<OrderDao> Orders { get; set; }
        public DbSet<OrderItemDto> OrderItems { get; set; }
    }
}