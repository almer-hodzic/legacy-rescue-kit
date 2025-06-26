namespace Api.Dtos.Requests;

public class TaskQueryParams
{
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 10;
    public string? SortBy { get; set; } 
    public string? Status { get; set; }
}
