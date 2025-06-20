﻿namespace Api.Models;

public class TaskItem
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public bool IsDone { get; set; }
    public DateTime? DueDate { get; set; }

    public string? UserId { get; set; } 
    public User? User { get; set; }


}
