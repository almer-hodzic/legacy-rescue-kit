using System.ComponentModel.DataAnnotations;

namespace Api.Dtos.Requests
{
    public class UpdateProfileRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = default!;

        [Required]
        public string Username { get; set; } = default!;
    }
}
