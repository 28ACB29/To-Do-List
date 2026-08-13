using System.Text.Json;
using To_Do_List.Data;
using To_Do_List.Models;

namespace To_Do_List.Data
{
	public class TaskRepository : ITaskRepository
	{

		private readonly string filePath;

		private readonly object fileLock = new();

		public TaskRepository(IHostEnvironment env)
		{
			string dir = Path.Combine(env.ContentRootPath, "wwwroot", "app-data");
			Directory.CreateDirectory(dir);
			this.filePath = Path.Combine(dir, "tasks.json");
		}

		private List<Models.Task> ReadAll()
		{
			lock (this.fileLock)
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
			lock (this.fileLock)
			{
				string json = JsonSerializer.Serialize(tasks, new JsonSerializerOptions { WriteIndented = true });
				File.WriteAllText(this.filePath, json);
			}
		}


		public Models.Task Add(Models.Task task)
		{
			List<Models.Task> tasks = this.ReadAll();
			int id = tasks.Count != 0 ? tasks.Max(t => t.Id) + 1 : 1;
			task.Id = id;
			tasks.Add(task);
			this.WriteAll(tasks);
			return task;
		}

		public bool Delete(int id)
		{
			List<Models.Task> tasks = this.ReadAll();
			bool removed = tasks.RemoveAll(t => t.Id == id) > 0;
			if (removed)
			{
				this.WriteAll(tasks);
			}

			return removed;
		}

		public IEnumerable<Models.Task> GetAll() => this.ReadAll();

		public Models.Task? GetById(int id) => this.ReadAll().FirstOrDefault(t => t.Id == id);

		public bool Update(Models.Task task)
		{
			List<Models.Task> tasks = this.ReadAll();
			int index = tasks.FindIndex(t => t.Id == task.Id);
			if (index == -1)
			{
				return false;
			}

			tasks[index] = task;
			this.WriteAll(tasks);
			return true;
		}
	}
}
