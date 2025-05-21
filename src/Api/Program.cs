using System;
using System.Collections.Generic;
using System.Linq;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

var tasks = new List<TaskItem>();

app.MapGet("/ping", () => "pong");

app.MapGet("/tasks", () => tasks);

app.MapPost("/tasks", (TaskItem task) =>
{
    task.Id = Guid.NewGuid();
    tasks.Add(task);
    return Results.Created($"/tasks/{task.Id}", task);
});

app.MapPut("/tasks/{id}", (Guid id, TaskItem updatedTask) =>
{
    var task = tasks.FirstOrDefault(t => t.Id == id);
    if (task is null) return Results.NotFound();
    task.Title = updatedTask.Title;
    task.IsDone = updatedTask.IsDone;
    task.DueDate = updatedTask.DueDate;
    return Results.Ok(task);
});

app.MapDelete("/tasks/{id}", (Guid id) =>
{
    var task = tasks.FirstOrDefault(t => t.Id == id);
    if (task is null) return Results.NotFound();
    tasks.Remove(task);
    return Results.Ok();
});

app.Run();

record TaskItem
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public bool IsDone { get; set; }
    public DateTime? DueDate { get; set; }
}
