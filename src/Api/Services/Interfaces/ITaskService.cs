using Api.Models;
using Api.Dtos;

namespace Api.Services.Interfaces;

public interface ITaskService
{
    Task<List<TaskItem>> GetAllAsync();
    Task<TaskItem?> GetByIdAsync(Guid id);
    Task<TaskItem> CreateAsync(TaskCreateRequest request);
    Task<bool> UpdateAsync(Guid id, TaskUpdateRequest request);
    Task<bool> DeleteAsync(Guid id);
}

