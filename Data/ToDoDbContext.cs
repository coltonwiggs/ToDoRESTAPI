using Microsoft.EntityFrameworkCore;
using ToDoRESTAPI.Models;

namespace ToDoRESTAPI.Data
{
    public class ToDoDbContext : DbContext
    {
        public ToDoDbContext(DbContextOptions<ToDoDbContext> options) : base(options) { }
        public DbSet<ToDoItem> ToDoItems => Set<ToDoItem>();
    }
}
