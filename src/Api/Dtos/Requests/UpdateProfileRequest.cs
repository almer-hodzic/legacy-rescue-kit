namespace Api.Dtos.Requests
{
    public class UpdateProfileRequest
    {
        public string Email { get; set; } = default!;
        public string Username { get; set; } = default!;
    }
}
