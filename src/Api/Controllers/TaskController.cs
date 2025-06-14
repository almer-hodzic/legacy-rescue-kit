﻿using Microsoft.AspNetCore.Mvc;
using Api.Services.Interfaces;
using Api.Dtos;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;


namespace Api.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class TaskController : ControllerBase
{
    private readonly ITaskService _service;

    public TaskController(ITaskService service)
    {
        _service = service;
    }

    private string GetUserId()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userId))
            throw new UnauthorizedAccessException("Token missing or malformed.");
        return userId;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var userId = GetUserId();
        var tasks = await _service.GetAllAsync(userId);
        return Ok(tasks);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var userId = GetUserId();
        var task = await _service.GetByIdAsync(id, userId);
        return task == null ? NotFound() : Ok(task);
    }

    [HttpPost]
    public async Task<IActionResult> Create(TaskCreateRequest request)
    {
        var userId = GetUserId();
        var task = await _service.CreateAsync(request, userId);
        return CreatedAtAction(nameof(GetById), new { id = task.Id }, task);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, TaskUpdateRequest request)
    {
        var userId = GetUserId();
        var result = await _service.UpdateAsync(id, request, userId);
        return result ? NoContent() : NotFound();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var userId = GetUserId();
        var result = await _service.DeleteAsync(id, userId);
        return result ? NoContent() : NotFound();
    }
}


