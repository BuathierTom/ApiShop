using ApiShop.Common.DAO;
using ApiShop.DataAccess.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ApiShop.DataAccess.Implementations
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly ApiShopDbContext _context;

        public CategoryRepository(ApiShopDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(CategoryDao category, CancellationToken cancellationToken = default)
        {
            _context.Categories.Add(category);
            await _context.SaveChangesAsync(cancellationToken);
        }

        public async Task DeleteAsync(Guid id, CancellationToken cancellationToken = default)
        {
            var category = await _context.Categories.FindAsync(new object[] { id }, cancellationToken);
            if (category is not null)
            {
                _context.Categories.Remove(category);
                await _context.SaveChangesAsync(cancellationToken);
            }
        }

        public async Task<IEnumerable<CategoryDao>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            return await _context.Categories.ToListAsync(cancellationToken);
        }

        public async Task<CategoryDao?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            return await _context.Categories.FindAsync(new object[] { id }, cancellationToken);
        }

        public async Task<IEnumerable<CategoryDao>> GetByParentIdAsync(Guid? parentId, CancellationToken cancellationToken = default)
        {
            return await _context.Categories
                .Where(c => c.ParentCategoryId == parentId)
                .ToListAsync(cancellationToken);
        }

        public async Task UpdateAsync(CategoryDao category, CancellationToken cancellationToken = default)
        {
            _context.Categories.Update(category);
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}