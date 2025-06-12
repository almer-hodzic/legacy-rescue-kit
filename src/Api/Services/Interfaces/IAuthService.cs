using Api.Dtos.Requests;
using Api.Dtos.Responses;
using System.Security.Claims;

namespace Api.Services.Interfaces
{
    public interface IAuthService
    {
        Task<bool> Register(RegisterRequest request);
        Task<string?> Login(LoginRequest request);
        Task<UserMeDto?> GetCurrentUserAsync(ClaimsPrincipal user);

    }


}
