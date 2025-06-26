using Api.Dtos.Requests;
using Api.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

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
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var success = await _authService.Register(request);
        if (!success)
            return BadRequest(new { message = "Email already in use." });

        return Ok(new { message = "User registered successfully." });
    }


    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var tokenResponse = await _authService.Login(request);
        if (tokenResponse == null)
            return Unauthorized();

        Response.Cookies.Append("refreshToken", tokenResponse.RefreshToken, new CookieOptions
        {
            HttpOnly = true,
            Expires = DateTimeOffset.UtcNow.AddDays(7),
            SameSite = SameSiteMode.Strict,
            Secure = true
        });

        return Ok(tokenResponse);
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

    [Authorize]
    [HttpPut("profile")]
    public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userId)) return Unauthorized();

        var result = await _authService.UpdateProfileAsync(userId, request);
        return result ? Ok(new { message = "Profile updated" }) : BadRequest(new { message = "Update failed" });
    }

    [Authorize]
    [HttpPut("change-password")]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userId)) return Unauthorized();

        var result = await _authService.ChangePasswordAsync(userId, request);
        return result ? Ok(new { message = "Password changed" }) : BadRequest(new { message = "Password change failed" });
    }

    [HttpPost("refresh")]
    public async Task<IActionResult> Refresh()
    {
        var refreshToken = Request.Cookies["refreshToken"];
        var tokenResponse = await _authService.RefreshTokenAsync(refreshToken);

        if (tokenResponse == null)
            return Unauthorized(new { message = "Invalid or expired refresh token." });

        Response.Cookies.Append("refreshToken", tokenResponse.RefreshToken, new CookieOptions
        {
            HttpOnly = true,
            Expires = DateTimeOffset.UtcNow.AddDays(7),
            SameSite = SameSiteMode.Strict,
            Secure = true
        });

        return Ok(tokenResponse);
    }

    [Authorize]
    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userId)) return Unauthorized();

        await _authService.LogoutAsync(userId);

        // Clear cookie (optional)
        Response.Cookies.Delete("refreshToken");

        return NoContent();
    }

}