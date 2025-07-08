using ApiShop.Business.Interfaces;
using ApiShop.Common.DTO;
using ApiShop.Common.Request;
using Microsoft.AspNetCore.Mvc;

namespace ApiShop.WebAPI.Controllers
{
    [ApiController]
    [Route("api/orders")]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _service;

        public OrderController(IOrderService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetAll(CancellationToken cancellationToken)
        {
            var orders = await _service.GetAllAsync(cancellationToken);
            return Ok(orders);
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<OrderDto>> GetById(Guid id, CancellationToken cancellationToken)
        {
            var order = await _service.GetByIdAsync(id, cancellationToken);
            return order is null ? NotFound() : Ok(order);
        }

        [HttpGet("user/{userId:guid}")]
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetByUser(Guid userId, CancellationToken cancellationToken)
        {
            var orders = await _service.GetByUserIdAsync(userId, cancellationToken);
            return Ok(orders);
        }

        [HttpPost]
        public async Task<ActionResult<OrderDto>> Create([FromBody] OrderCreateRequest request, CancellationToken cancellationToken)
        {
            var dto = new OrderDto
            {
                Id = Guid.NewGuid(),
                UserId = request.UserId,
                TotalPrice = request.TotalPrice,
                CreatedAt = DateTime.UtcNow,
                Status = "Pending",
                Items = request.Items
            };

            var created = await _service.CreateAsync(dto, cancellationToken);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] OrderUpdateRequest request, CancellationToken cancellationToken)
        {
            if (id != request.Id) return BadRequest();

            var dto = new OrderDto
            {
                Id = request.Id,
                UserId = request.UserId,
                TotalPrice = request.TotalPrice,
                Status = request.Status,
                CreatedAt = DateTime.UtcNow,
                Items = request.Items
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
