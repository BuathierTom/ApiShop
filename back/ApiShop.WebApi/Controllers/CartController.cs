using ApiShop.Business.Interfaces;
using ApiShop.Common.DTO;
using Microsoft.AspNetCore.Mvc;

namespace ApiShop.WebAPI.Controllers
{
    [ApiController]
    [Route("api/cart")]
    public class CartController : ControllerBase
    {
        private readonly ICartService _service;

        public CartController(ICartService service)
        {
            _service = service;
        }

        [HttpGet("{userId:guid}")]
        public async Task<ActionResult<IEnumerable<CartItemDto>>> GetCartByUser(Guid userId, CancellationToken cancellationToken)
        {
            var items = await _service.GetByUserIdAsync(userId, cancellationToken);
            return Ok(items);
        }

        [HttpPost]
        public async Task<ActionResult<CartItemDto>> AddItem([FromBody] CartItemDto dto, CancellationToken cancellationToken)
        {
            var created = await _service.AddAsync(dto, cancellationToken);
            return CreatedAtAction(nameof(GetCartByUser), new { userId = created.UserId }, created);
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> UpdateItem(Guid id, [FromBody] CartItemDto dto, CancellationToken cancellationToken)
        {
            if (id != dto.Id) return BadRequest();
            await _service.UpdateAsync(dto, cancellationToken);
            return NoContent();
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteItem(Guid id, CancellationToken cancellationToken)
        {
            await _service.DeleteAsync(id, cancellationToken);
            return NoContent();
        }

        [HttpDelete("user/{userId:guid}")]
        public async Task<IActionResult> ClearCart(Guid userId, CancellationToken cancellationToken)
        {
            await _service.ClearCartAsync(userId, cancellationToken);
            return NoContent();
        }
    }
}