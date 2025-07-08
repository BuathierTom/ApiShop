using ApiShop.Business.Interfaces;
using ApiShop.Common.DTO;
using ApiShop.DataAccess.Interfaces;

namespace ApiShop.Business.Implementations
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;

        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<ProductDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            return await _productRepository.GetByIdAsync(id);
        }

        public async Task<IEnumerable<ProductDto>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            return await _productRepository.GetAllAsync();
        }

        public async Task<IEnumerable<ProductDto>> GetByCategoryAsync(Guid categoryId, CancellationToken cancellationToken = default)
        {
            return await _productRepository.GetByCategoryIdAsync(categoryId);
        }

        public async Task<ProductDto> CreateAsync(ProductDto dto, CancellationToken cancellationToken = default)
        {
            dto.Id = Guid.NewGuid();
            await _productRepository.AddAsync(dto);
            return dto;
        }

        public async Task UpdateAsync(ProductDto dto, CancellationToken cancellationToken = default)
        {
            await _productRepository.UpdateAsync(dto);
        }

        public async Task DeleteAsync(Guid id, CancellationToken cancellationToken = default)
        {
            await _productRepository.DeleteAsync(id);
        }
    }
}