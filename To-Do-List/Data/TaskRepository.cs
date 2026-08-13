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


		public Models.Task Add(Models.Task task) => throw new NotImplementedException();

		public bool Delete(int id) => throw new NotImplementedException();

		public IEnumerable<Models.Task> GetAll() => throw new NotImplementedException();

		public Models.Task? GetById(int id) => throw new NotImplementedException();

		public bool Update(Models.Task task) => throw new NotImplementedException();
	}
}
