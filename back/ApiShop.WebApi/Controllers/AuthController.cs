using ApiShop.Business.Interfaces;
using ApiShop.Common.Request;
using ApiShop.Common.DTO;
using Microsoft.AspNetCore.Mvc;

namespace ApiShop.WebAPI.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login([FromBody] LoginRequest request, CancellationToken cancellationToken)
        {
            var user = await _userService.LoginAsync(request, cancellationToken);
            return user is null ? Unauthorized("Invalid credentials") : Ok(user);
        }
        
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register([FromBody] UserCreateRequest request, CancellationToken cancellationToken)
        {
            var existingUser = await _userService.GetByEmailAsync(request.Email, cancellationToken);
            if (existingUser is not null)
            {
                return Conflict("Un compte avec cet email existe déjà.");
            }

            var user = await _userService.CreateAsync(request, cancellationToken);
            return CreatedAtAction(nameof(Register), new { id = user.Id }, user);
        }
    }
}