using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Api.Services.Interfaces;
using Api.Dtos.Responses;
using Api.Dtos.Requests;

namespace Api.Controllers;

[Authorize(Roles = "Admin")]
[ApiController]
[Route("api/admin")]
public class AdminController : ControllerBase
{
    private readonly IAdminService _adminService;

    public AdminController(IAdminService adminService)
    {
        _adminService = adminService;
    }

    [HttpGet("users")]
    public async Task<IActionResult> GetUsers()
        => Ok(await _adminService.GetAllUsersAsync());

    [HttpPut("users/{id}/role")]
    public async Task<IActionResult> ChangeRole(string id, [FromBody] UpdateRoleRequest request)
    {
        var success = await _adminService.UpdateUserRoleAsync(id, request.Role);
        return success ? Ok() : NotFound();
    }

    [HttpGet("tasks")]
    public async Task<IActionResult> GetAllTasks()
        => Ok(await _adminService.GetAllTasksAsync());
}
