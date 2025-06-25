using System.ComponentModel.DataAnnotations;

namespace Api.Dtos.Requests
{
    public class ChangePasswordRequest
    {
        [Required]
        public string CurrentPassword { get; set; } = default!;

        [Required]
        [MinLength(6)]
        public string NewPassword { get; set; } = default!;
    }
}
