using System.ComponentModel.DataAnnotations;

namespace Api.Dtos
{
    public class TaskCreateRequest
    {
        [Required]
        public string Title { get; set; } = null!;

        public DateTime? DueDate { get; set; }
    }
}
