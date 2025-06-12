namespace Api.Dtos.Responses
{
    public class UserMeDto
    {
        public string Id { get; set; } = default!;
        public string UserName { get; set; } = default!;
        public string Email { get; set; } = default!;
        public DateTime RegisteredAt { get; set; }
        public List<string> Roles { get; set; } = new();
    }
}
