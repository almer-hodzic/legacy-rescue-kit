using Microsoft.AspNetCore.Identity;

namespace Api.Models;

public class User : IdentityUser
{
    public DateTime RegisteredAt { get; set; } = DateTime.UtcNow;

    public string? RefreshToken { get; set; }
    public DateTime? RefreshTokenExpiresAt { get; set; }
}