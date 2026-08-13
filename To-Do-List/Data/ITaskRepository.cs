using To_Do_List.Models;

namespace To_Do_List.Data
{
    public interface ITaskRepository
    {
        IEnumerable<Models.Task> GetAll();
        Models.Task? GetById(int id);
        Models.Task Add(Models.Task task);
        bool Update(Models.Task task);
        bool Delete(int id);
    }
}
