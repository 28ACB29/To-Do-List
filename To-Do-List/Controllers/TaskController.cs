using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using To_Do_List.Data;
using To_Do_List.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace To_Do_List.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class TaskController : ControllerBase
	{
		private readonly ITaskRepository repo;

		public TaskController(ITaskRepository repo)
		{
			this.repo = repo;
		}

		// GET: api/<TaskController>
		[HttpGet]
		public ActionResult<IEnumerable<Models.Task>> Get() => base.Ok(this.repo.GetAll());

		// GET api/<TaskController>/5
		[HttpGet("{id}", Name = "GetTask")]
		public ActionResult<Models.Task> Get(int id)
		{
			Models.Task? task = this.repo.GetById(id);
			if (task == null)
			{
				return base.NotFound();
			}

			return base.Ok(task);
		}

		// POST api/<TaskController>
		[HttpPost]
		public ActionResult<Models.Task> Post([FromBody] Models.Task task)
		{
			Models.Task created = this.repo.Add(task);
			return base.CreatedAtRoute("GetTask", new { id = created.Id }, created);
		}

		// PUT api/<TaskController>/5
		[HttpPut("{id}")]
		public ActionResult Put(int id, [FromBody] Models.Task task)
		{
			if (id != task.Id)
			{
				return base.BadRequest();
			}

			bool ok = this.repo.Update(task);
			return ok ? base.NoContent() : base.NotFound();
		}

		// DELETE api/<TaskController>/5
		[HttpDelete("{id}")]
		public ActionResult Delete(int id)
		{
			bool ok = this.repo.Delete(id);
			return ok ? base.NoContent() : base.NotFound();
		}
	}
}
