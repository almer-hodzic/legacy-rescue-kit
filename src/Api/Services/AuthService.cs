using Api.Dtos.Requests;
using Api.Dtos.Responses;
using Api.Models;
using Api.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Api.Services;

public class AuthService : IAuthService
{
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;
    private readonly IConfiguration _config;

    public AuthService(UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration config)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _config = config;
    }

    public async Task<bool> Register(RegisterRequest request)
    {
        var existingUser = await _userManager.FindByEmailAsync(request.Email);
        if (existingUser != null) return false;

        var user = new User { UserName = request.Username, Email = request.Email };
        var result = await _userManager.CreateAsync(user, request.Password);
        return result.Succeeded;
    }


    public async Task<string?> Login(LoginRequest request)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);
        if (user == null) return null;

        var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);
        return result.Succeeded ? GenerateJwtToken(user) : null;
    }

    private string GenerateJwtToken(User user)
    {
        var key = Encoding.ASCII.GetBytes(_config["JwtSecret"]!);
        var tokenHandler = new JwtSecurityTokenHandler();

        var claims = new List<Claim>
    {
        new Claim(ClaimTypes.NameIdentifier, user.Id),
        new Claim(ClaimTypes.Name, user.UserName!)
    };

        // Dodaj sve role korisnika kao individualne claimove
        var roles = _userManager.GetRolesAsync(user).Result;
        claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddHours(2),
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }


    public async Task<UserMeDto?> GetCurrentUserAsync(ClaimsPrincipal user)
    {
        var userId = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userId)) return null;

        var foundUser = await _userManager.FindByIdAsync(userId);
        if (foundUser == null) return null;

        var roles = await _userManager.GetRolesAsync(foundUser);

        return new UserMeDto
        {
            Id = foundUser.Id,
            UserName = foundUser.UserName!,
            Email = foundUser.Email!,
            RegisteredAt = foundUser.RegisteredAt,
            Roles = roles.ToList()
        };
    }

}
