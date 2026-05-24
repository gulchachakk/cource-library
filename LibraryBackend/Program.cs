using LibraryBackend.Data;
using LibraryBackend.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

//підключ бази даних
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=library.db"));

var app = builder.Build();

//API
//всі книги GET
//сервер іде в базу, бере список книг і віддає його.
app.MapGet("/books", async (AppDbContext db) =>
{
    return await db.Books.ToListAsync();
});

//додавання книги POST
//сервер зберігає дані нової книги в базу.
app.MapPost("/books", async (Book newBook, AppDbContext db) =>
{
    db.Books.Add(newBook); //додати книгу
    await db.SaveChangesAsync(); //збереження змін у файл
    return Results.Ok(newBook); //все пройшло успішно
});

//видалення книги DELETE
// {id} - конкретний номер книги, "/books/1"
app.MapDelete("/books/{id}", async (int id, AppDbContext db) =>
{
    //шукаємо книгу в базі за її номером
    var book = await db.Books.FindAsync(id);
    
    //якщо книги немає - помилка "Не знайдено"
    if (book == null) return Results.NotFound("Книгу не знайдено.");

    //якщо знайшли - видаляємо з бази
    db.Books.Remove(book);
    await db.SaveChangesAsync(); //зберігаємо зміни у файл
    
    return Results.Ok("Книгу успішно видалено.");
});

app.Run();