namespace To_Do_List.Models
{
    public class Task
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public TaskStatus Status { get; set; }
    }
}
