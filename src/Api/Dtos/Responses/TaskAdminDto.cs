namespace Api.Dtos.Responses
{
    public class TaskAdminDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = default!;
        public bool IsDone { get; set; }
        public DateTime? DueDate { get; set; }
        public string? UserEmail { get; set; }
    }
}
