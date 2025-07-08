using ApiShop.Business.Interfaces;
using ApiShop.Common.DAO;
using ApiShop.Common.DTO;
using ApiShop.DataAccess.Interfaces;

namespace ApiShop.Business.Implementations
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _repository;

        public ProductService(IProductRepository repository)
        {
            _repository = repository;
        }

        public async Task<ProductDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            var dao = await _repository.GetByIdAsync(id, cancellationToken);
            return dao?.ToDto();
        }

        public async Task<IEnumerable<ProductDto>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var daos = await _repository.GetAllAsync(cancellationToken);
            return daos.Select(p => p.ToDto());
        }

        public async Task<IEnumerable<ProductDto>> GetByCategoryAsync(Guid categoryId, CancellationToken cancellationToken = default)
        {
            var daos = await _repository.GetByCategoryIdAsync(categoryId, cancellationToken);
            return daos.Select(p => p.ToDto());
        }

        public async Task<ProductDto> CreateAsync(ProductDto dto, CancellationToken cancellationToken = default)
        {
            var dao = new ProductDao
            {
                Id = Guid.NewGuid(),
                Name = dto.Name,
                Description = dto.Description,
                Price = dto.Price,
                Stock = dto.Stock,
                CategoryId = dto.CategoryId,
                ImageUrl = dto.ImageUrl
            };

            await _repository.AddAsync(dao, cancellationToken);
            return dao.ToDto();
        }

        public async Task UpdateAsync(ProductDto dto, CancellationToken cancellationToken = default)
        {
            var dao = new ProductDao
            {
                Id = dto.Id,
                Name = dto.Name,
                Description = dto.Description,
                Price = dto.Price,
                Stock = dto.Stock,
                CategoryId = dto.CategoryId,
                ImageUrl = dto.ImageUrl
            };

            await _repository.UpdateAsync(dao, cancellationToken);
        }

        public Task DeleteAsync(Guid id, CancellationToken cancellationToken = default)
        {
            return _repository.DeleteAsync(id, cancellationToken);
        }
    }
}