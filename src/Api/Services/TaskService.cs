﻿using Api.Data;
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

    public async Task<List<TaskItem>> GetAllAsync(string userId) =>
        await _db.Tasks.Where(t => t.UserId == userId).ToListAsync();

    public async Task<TaskItem?> GetByIdAsync(Guid id, string userId) =>
        await _db.Tasks.FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

    public async Task<TaskItem> CreateAsync(TaskCreateRequest request, string userId)
    {
        var task = new TaskItem
        {
            Id = Guid.NewGuid(),
            Title = request.Title,
            DueDate = request.DueDate,
            IsDone = false,
            UserId = userId
        };

        _db.Tasks.Add(task);
        await _db.SaveChangesAsync();
        return task;
    }

    public async Task<bool> UpdateAsync(Guid id, TaskUpdateRequest request, string userId)
    {
        var task = await _db.Tasks.FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);
        if (task == null) return false;

        task.Title = request.Title;
        task.IsDone = request.IsDone;
        task.DueDate = request.DueDate;

        await _db.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(Guid id, string userId)
    {
        var task = await _db.Tasks.FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);
        if (task == null) return false;

        _db.Tasks.Remove(task);
        await _db.SaveChangesAsync();
        return true;
    }
}



