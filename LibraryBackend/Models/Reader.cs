namespace LibraryBackend.Models
{
    public class Reader
    {
        public int Id { get; set; } //ID
        public string FullName { get; set; } = string.Empty; //ПІБ
        public string Phone { get; set; } = string.Empty; //телефон
    }
}