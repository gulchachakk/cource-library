using LibraryBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace LibraryBackend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        //табл книг
        public DbSet<Book> Books { get; set; }

        //табл читачів
        public DbSet<Reader> Readers { get; set; }

        //табл журналу видачі
        public DbSet<Loan> Loans { get; set; }
    }
}