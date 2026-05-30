using System;

namespace LibraryBackend.Models
{
    public class Loan
    {
        public int Id { get; set; } //ID самого запису в журналі
        
        public int BookId { get; set; } //номер видан книги
        public int ReaderId { get; set; } //номер читача
        
        public DateTime LoanDate { get; set; } = DateTime.UtcNow; //дата видачі (автомат поточн час)
        public DateTime DueDate { get; set; } //дедлайн
        
        public DateTime? ReturnDate { get; set; } 
    }
}