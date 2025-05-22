using Api.Data;
using Api.Models;
using Api.Dtos;
using Api.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Api.Services;

public class TaskService : ITaskService
{
    private readonly AppDbContext _db;

    public TaskService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<TaskItem>> GetAllAsync() =>
        await _db.Tasks.ToListAsync();

    public async Task<TaskItem?> GetByIdAsync(Guid id) =>
        await _db.Tasks.FindAsync(id);

    public async Task<TaskItem> CreateAsync(TaskCreateRequest request)
    {
        var task = new TaskItem
        {
            Id = Guid.NewGuid(),
            Title = request.Title,
            DueDate = request.DueDate,
            IsDone = false
        };

        _db.Tasks.Add(task);
        await _db.SaveChangesAsync();
        return task;
    }

    public async Task<bool> UpdateAsync(Guid id, TaskUpdateRequest request)
    {
        var task = await _db.Tasks.FindAsync(id);
        if (task == null) return false;

        task.Title = request.Title;
        task.IsDone = request.IsDone;
        task.DueDate = request.DueDate;

        await _db.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var task = await _db.Tasks.FindAsync(id);
        if (task == null) return false;

        _db.Tasks.Remove(task);
        await _db.SaveChangesAsync();
        return true;
    }
}

