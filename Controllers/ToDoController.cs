using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using ToDoRESTAPI.Data;
using ToDoRESTAPI.Models;

namespace ToDoRESTAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    
    public class ToDoController : ControllerBase
    {
        private readonly ToDoDbContext _db;
        public ToDoController(ToDoDbContext db) => _db = db;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ToDoItem>>> GetAllTasks() =>
            await _db.ToDoItems.ToListAsync();

        [HttpGet("{id}")]
        public async Task<ActionResult<ToDoItem>> GetTask(int id)
        {
            var task = await _db.ToDoItems.FindAsync(id);
            return task is null ? NotFound() : task;
        }

        [HttpPost]
        public async Task<ActionResult<ToDoItem>> CreateTask(ToDoItem task)
        {
            _db.ToDoItems.Add(task);
            await _db.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateTask(int id, ToDoItem task)
        {
            if (id != task.Id)
                return BadRequest();

            _db.Entry(task).State = EntityState.Modified;
            await _db.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var task = await _db.ToDoItems.FindAsync(id);

            if (task is null)
                return NotFound();

            _db.ToDoItems.Remove(task);
            await _db.SaveChangesAsync();
            return NoContent();
        }
    }
}
