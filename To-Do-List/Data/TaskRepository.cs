using To_Do_List.Data;
using To_Do_List.Models;

namespace To_Do_List.Data
{
	public class TaskRepository : ITaskRepository
	{
		public Models.Task Add(Models.Task task) => throw new NotImplementedException();
		public bool Delete(int id) => throw new NotImplementedException();
		public IEnumerable<Models.Task> GetAll() => throw new NotImplementedException();
		public Models.Task? GetById(int id) => throw new NotImplementedException();
		public bool Update(Models.Task task) => throw new NotImplementedException();
	}
}
