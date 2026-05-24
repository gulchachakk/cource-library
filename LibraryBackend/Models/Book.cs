namespace LibraryBackend.Models
{
    public class Book
    {
        public int Id { get; set; } //унікальний номер книги в базі
        public string Title { get; set; } = string.Empty; //назва
        public string Author { get; set; } = string.Empty; //автор
        public int Year { get; set; } //рік видання
        public bool IsAvailable { get; set; } = true; //чи доступна книга для видачі
    }
}