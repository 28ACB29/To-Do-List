using System.Text.Json;
using To_Do_List.Data;
using To_Do_List.Models;

namespace To_Do_List.Data
{
	public class TaskRepository : ITaskRepository
	{

		private readonly string filePath;

		private readonly object @lock = new();

		public TaskRepository(IHostEnvironment env)
		{
			string dir = Path.Combine(env.ContentRootPath, "wwwroot", "app-data");
			Directory.CreateDirectory(dir);
			this.filePath = Path.Combine(dir, "tasks.json");
		}

		private List<Models.Task> ReadAll()
		{
			lock (this.@lock)
			{
				if (!File.Exists(this.filePath))
				{
					return new List<Models.Task>();
				}

				string json = File.ReadAllText(this.filePath);
				if (string.IsNullOrWhiteSpace(json))
				{
					return new List<Models.Task>();
				}

				return JsonSerializer.Deserialize<List<Models.Task>>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true })
					   ?? new List<Models.Task>();
			}
		}

		private void WriteAll(List<Models.Task> tasks)
		{
			lock (this.@lock)
			{
				string json = JsonSerializer.Serialize(tasks, new JsonSerializerOptions { WriteIndented = true });
				File.WriteAllText(this.filePath, json);
			}
		}


		public Models.Task Add(Models.Task task) => throw new NotImplementedException();

		public bool Delete(int id) => throw new NotImplementedException();

		public IEnumerable<Models.Task> GetAll() => throw new NotImplementedException();

		public Models.Task? GetById(int id) => throw new NotImplementedException();

		public bool Update(Models.Task task) => throw new NotImplementedException();
	}
}
