using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using ApiShop.DataAccess;
using ApiShop.DataAccess.Interfaces;
using ApiShop.DataAccess.Implementations;
using ApiShop.Business.Interfaces;
using ApiShop.Business.Implementations;
using Swashbuckle.AspNetCore.SwaggerUI;

var builder = WebApplication.CreateBuilder(args);

const string CorsPolicyName = "AllowAll";

// --- CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy(CorsPolicyName, policy =>
    {
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

// --- Controllers + Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "ApiShop API", Version = "v1" });
});

// --- Services Business
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ICartService, CartService>();
builder.Services.AddScoped<IOrderService, OrderService>();

// --- Repositories
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ICartItemRepository, CartItemRepository>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IOrderItemRepository, OrderItemRepository>();

// --- User Secrets
builder.Configuration.AddUserSecrets<Program>(true).Build();

// --- DBContext
builder.Services.AddDbContext<ApiShopDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("ApiShop")));

// --- Health Checks
builder.Services.AddHealthChecks()
    .AddNpgSql(builder.Configuration.GetConnectionString("ApiShop")!);

var app = builder.Build();

// --- Pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.ConfigObject.Urls = new[]
        {
            new UrlDescriptor
            {
                Name = "ApiShop API",
                Url = "/swagger/v1/swagger.json"
            }
        };
    });
}

app.UseCors(CorsPolicyName);

app.MapHealthChecks("/health");

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

// --- Migration automatique
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<ApiShopDbContext>();
    dbContext.Database.Migrate();
}

app.Run();