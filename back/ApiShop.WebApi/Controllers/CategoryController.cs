using ApiShop.Business.Interfaces;
using ApiShop.Common.DTO;
using ApiShop.Common.Request;
using Microsoft.AspNetCore.Mvc;

namespace ApiShop.WebAPI.Controllers
{
    [ApiController]
    [Route("api/categories")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _service;

        public CategoryController(ICategoryService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetAll(CancellationToken cancellationToken)
        {
            var categories = await _service.GetAllAsync(cancellationToken);
            return Ok(categories);
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<CategoryDto>> GetById(Guid id, CancellationToken cancellationToken)
        {
            var category = await _service.GetByIdAsync(id, cancellationToken);
            return category is null ? NotFound() : Ok(category);
        }

        [HttpGet("parent/{parentId:guid}")]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetByParentId(Guid parentId, CancellationToken cancellationToken)
        {
            var children = await _service.GetByParentIdAsync(parentId, cancellationToken);
            return Ok(children);
        }

        [HttpPost]
        public async Task<ActionResult<CategoryDto>> Create([FromBody] CategoryCreateRequest request, CancellationToken cancellationToken)
        {
            var dto = new CategoryDto
            {
                Id = Guid.NewGuid(),
                Name = request.Name,
                ParentCategoryId = request.ParentCategoryId
            };

            var created = await _service.CreateAsync(dto, cancellationToken);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] CategoryUpdateRequest request, CancellationToken cancellationToken)
        {
            if (id != request.Id) return BadRequest();

            var dto = new CategoryDto
            {
                Id = request.Id,
                Name = request.Name,
                ParentCategoryId = request.ParentCategoryId
            };

            await _service.UpdateAsync(dto, cancellationToken);
            return NoContent();
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
        {
            await _service.DeleteAsync(id, cancellationToken);
            return NoContent();
        }
    }
}
