using ApiShop.Business.Interfaces;
using ApiShop.Common.DAO;
using ApiShop.Common.DTO;
using ApiShop.DataAccess.Interfaces;

namespace ApiShop.Business.Implementations
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _repository;

        public CategoryService(ICategoryRepository repository)
        {
            _repository = repository;
        }

        public async Task<CategoryDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            var dao = await _repository.GetByIdAsync(id, cancellationToken);
            return dao?.ToDto();
        }

        public async Task<IEnumerable<CategoryDto>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var daos = await _repository.GetAllAsync(cancellationToken);
            return daos.Select(c => c.ToDto());
        }

        public async Task<IEnumerable<CategoryDto>> GetByParentIdAsync(Guid? parentId, CancellationToken cancellationToken = default)
        {
            var daos = await _repository.GetByParentIdAsync(parentId, cancellationToken);
            return daos.Select(c => c.ToDto());
        }

        public async Task<CategoryDto> CreateAsync(CategoryDto dto, CancellationToken cancellationToken = default)
        {
            var dao = new CategoryDao
            {
                Id = Guid.NewGuid(),
                Name = dto.Name,
                ParentCategoryId = dto.ParentCategoryId
            };

            await _repository.AddAsync(dao, cancellationToken);
            return dao.ToDto();
        }

        public async Task UpdateAsync(CategoryDto dto, CancellationToken cancellationToken = default)
        {
            var dao = new CategoryDao
            {
                Id = dto.Id,
                Name = dto.Name,
                ParentCategoryId = dto.ParentCategoryId
            };

            await _repository.UpdateAsync(dao, cancellationToken);
        }

        public Task DeleteAsync(Guid id, CancellationToken cancellationToken = default)
            => _repository.DeleteAsync(id, cancellationToken);
    }
}