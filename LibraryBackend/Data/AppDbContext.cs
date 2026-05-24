using LibraryBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace LibraryBackend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // Цей рядок створює таблицю "Books" у нашій базі даних
        public DbSet<Book> Books { get; set; }
    }
}