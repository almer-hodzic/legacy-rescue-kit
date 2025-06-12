using Api.Dtos.Requests;
using Api.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        var success = await _authService.Register(request);
        if (!success)
            return BadRequest(new { message = "Email already in use." });

        return Ok(new { message = "User registered successfully." });
    }


    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var token = await _authService.Login(request);
        return token != null ? Ok(new { Token = token }) : Unauthorized();
    }

    [Authorize]
    [HttpGet("me")]
    public async Task<IActionResult> Me()
    {
        var user = await _authService.GetCurrentUserAsync(User);
        return user != null ? Ok(user) : Unauthorized();
    }

    [Authorize(Roles = "Admin")]
    [HttpGet("admin-stats")]
    public IActionResult AdminOnly() =>
       Ok("✅ Welcome, Admin. You have access to protected admin data.");

    [Authorize(Roles = "User")]
    [HttpGet("user-dashboard")]
    public IActionResult UserOnly() =>
        Ok("👤 Hello, User. This is your user dashboard.");

}