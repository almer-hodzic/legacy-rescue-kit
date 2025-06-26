using Api.Dtos.Requests;
using Api.Dtos.Responses;
using System.Security.Claims;

namespace Api.Services.Interfaces
{
    public interface IAuthService
    {
        Task<bool> Register(RegisterRequest request);
        Task<TokenResponse?> Login(LoginRequest request);
        Task<UserMeDto?> GetCurrentUserAsync(ClaimsPrincipal user);
        Task<bool> UpdateProfileAsync(string userId, UpdateProfileRequest request);
        Task<bool> ChangePasswordAsync(string userId, ChangePasswordRequest request);
        Task<TokenResponse?> RefreshTokenAsync(string? refreshToken);
    }


}
