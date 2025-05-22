namespace Api.Dtos;

public class TaskCreateRequest
{
    public string Title { get; set; } = null!;
    public DateTime? DueDate { get; set; }
}
