using ApiShop.Common.DTO;
using ApiShop.DataAccess.Interfaces;

namespace ApiShop.DataAccess.Implementations
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly List<CategoryDto> _categories = new();

        public Task<CategoryDto?> GetByIdAsync(Guid id) =>
            Task.FromResult(_categories.FirstOrDefault(c => c.Id == id));

        public Task<IEnumerable<CategoryDto>> GetAllAsync() =>
            Task.FromResult<IEnumerable<CategoryDto>>(_categories);

        public Task<IEnumerable<CategoryDto>> GetByParentIdAsync(Guid? parentId) =>
            Task.FromResult<IEnumerable<CategoryDto>>(_categories.Where(c => c.ParentCategoryId == parentId));

        public Task AddAsync(CategoryDto category)
        {
            _categories.Add(category);
            return Task.CompletedTask;
        }

        public Task UpdateAsync(CategoryDto category)
        {
            var existing = _categories.FirstOrDefault(c => c.Id == category.Id);
            if (existing != null)
            {
                _categories.Remove(existing);
                _categories.Add(category);
            }
            return Task.CompletedTask;
        }

        public Task DeleteAsync(Guid id)
        {
            var category = _categories.FirstOrDefault(c => c.Id == id);
            if (category != null)
                _categories.Remove(category);

            return Task.CompletedTask;
        }
    }
}