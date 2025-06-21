using Api.Dtos.Responses;
using Api.Models;

namespace Api.Services.Interfaces;

public interface IAdminService
{
    Task<List<UserMeDto>> GetAllUsersAsync();
    Task<bool> UpdateUserRoleAsync(string userId, string newRole);
    Task<List<TaskAdminDto>> GetAllTasksAsync();
}
