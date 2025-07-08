using ApiShop.Business.Interfaces;
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

        public Task<CategoryDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default) =>
            _repository.GetByIdAsync(id);

        public Task<IEnumerable<CategoryDto>> GetAllAsync(CancellationToken cancellationToken = default) =>
            _repository.GetAllAsync();

        public Task<IEnumerable<CategoryDto>> GetByParentIdAsync(Guid? parentId, CancellationToken cancellationToken = default) =>
            _repository.GetByParentIdAsync(parentId);

        public async Task<CategoryDto> CreateAsync(CategoryDto dto, CancellationToken cancellationToken = default)
        {
            dto.Id = Guid.NewGuid();
            await _repository.AddAsync(dto);
            return dto;
        }

        public Task UpdateAsync(CategoryDto dto, CancellationToken cancellationToken = default) =>
            _repository.UpdateAsync(dto);

        public Task DeleteAsync(Guid id, CancellationToken cancellationToken = default) =>
            _repository.DeleteAsync(id);
    }
}