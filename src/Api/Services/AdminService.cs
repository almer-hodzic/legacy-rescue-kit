using Api.Data;
using Api.Dtos.Responses;
using Api.Models;
using Api.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Api.Services;

public class AdminService : IAdminService
{
    private readonly AppDbContext _db;
    private readonly UserManager<User> _userManager;

    public AdminService(AppDbContext db, UserManager<User> userManager)
    {
        _db = db;
        _userManager = userManager;
    }

    public async Task<List<UserMeDto>> GetAllUsersAsync()
    {
        var users = await _userManager.Users.ToListAsync();
        var result = new List<UserMeDto>();

        foreach (var user in users)
        {
            var roles = await _userManager.GetRolesAsync(user);
            result.Add(new UserMeDto
            {
                Id = user.Id,
                UserName = user.UserName!,
                Email = user.Email!,
                RegisteredAt = user.RegisteredAt,
                Roles = roles.ToList()
            });
        }

        return result;
    }


    public async Task<bool> UpdateUserRoleAsync(string userId, string newRole)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null) return false;

        var currentRoles = await _userManager.GetRolesAsync(user);
        var removeResult = await _userManager.RemoveFromRolesAsync(user, currentRoles);
        if (!removeResult.Succeeded) return false;

        var addResult = await _userManager.AddToRoleAsync(user, newRole);
        return addResult.Succeeded;
    }

    public async Task<List<TaskItem>> GetAllTasksAsync()
        => await _db.Tasks.Include(t => t.User).ToListAsync();
}
