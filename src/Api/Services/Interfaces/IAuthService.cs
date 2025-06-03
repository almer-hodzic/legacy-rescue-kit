using Api.Dtos.Requests;

namespace Api.Services.Interfaces
{
    public interface IAuthService
    {
        Task<bool> Register(RegisterRequest request);
        Task<string?> Login(LoginRequest request);
    }


}
