using ApiShop.Common.DTO;
using ApiShop.DataAccess.Interfaces;

namespace ApiShop.DataAccess.Implementations
{
    public class ProductRepository : IProductRepository
    {
        private readonly List<ProductDto> _products = new(); // temporaire

        public Task<ProductDto?> GetByIdAsync(Guid id) =>
            Task.FromResult(_products.FirstOrDefault(p => p.Id == id));

        public Task<IEnumerable<ProductDto>> GetAllAsync() =>
            Task.FromResult<IEnumerable<ProductDto>>(_products);

        public Task<IEnumerable<ProductDto>> GetByCategoryIdAsync(Guid categoryId) =>
            Task.FromResult<IEnumerable<ProductDto>>(_products.Where(p => p.CategoryId == categoryId));

        public Task AddAsync(ProductDto product)
        {
            _products.Add(product);
            return Task.CompletedTask;
        }

        public Task UpdateAsync(ProductDto product)
        {
            var existing = _products.FirstOrDefault(p => p.Id == product.Id);
            if (existing != null)
            {
                _products.Remove(existing);
                _products.Add(product);
            }
            return Task.CompletedTask;
        }

        public Task DeleteAsync(Guid id)
        {
            var product = _products.FirstOrDefault(p => p.Id == id);
            if (product != null)
                _products.Remove(product);

            return Task.CompletedTask;
        }
    }
}