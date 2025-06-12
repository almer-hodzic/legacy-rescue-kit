using Api.Models;
using Api.Dtos;

namespace Api.Services.Interfaces;

public interface ITaskService
{
    Task<List<TaskItem>> GetAllAsync(string userId);
    Task<TaskItem?> GetByIdAsync(Guid id, string userId);
    Task<TaskItem> CreateAsync(TaskCreateRequest request, string userId);
    Task<bool> UpdateAsync(Guid id, TaskUpdateRequest request, string userId);
    Task<bool> DeleteAsync(Guid id, string userId);
}

