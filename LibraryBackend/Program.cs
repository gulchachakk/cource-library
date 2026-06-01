using LibraryBackend.Data;
using LibraryBackend.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
}); //доступ з одного порту в інший

//підключ бази даних
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=library.db"));

var app = builder.Build();
app.UseCors();

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

//функц для читачів
//отримати список усіх читачів GET
app.MapGet("/readers", async (AppDbContext db) =>
{
    return await db.Readers.ToListAsync();
});

//реєстрація нового читача POST
app.MapPost("/readers", async (Reader newReader, AppDbContext db) =>
{
    db.Readers.Add(newReader);
    await db.SaveChangesAsync(); //збереж в базу
    return Results.Ok(newReader);
});

//журнал видачі
//список усіх видач GET
app.MapGet("/loans", async (AppDbContext db) =>
{
    return await db.Loans.ToListAsync();
});

//видає книгу читачу POST
app.MapPost("/loans", async (Loan newLoan, AppDbContext db) =>
{
    //запис про видачу
    db.Loans.Add(newLoan);
    await db.SaveChangesAsync();
    return Results.Ok(newLoan);
});

//поверн книги PUT
//шукається запис за id і ставиться дата повернення
app.MapPut("/loans/{id}/return", async (int id, AppDbContext db) =>
{
    var loan = await db.Loans.FindAsync(id);
    
    if (loan == null) return Results.NotFound("Запис про видачу не знайдено.");
    if (loan.ReturnDate != null) return Results.BadRequest("Цю книгу вже було повернуто раніше.");

    //поточний час як дата повернення
    loan.ReturnDate = DateTime.UtcNow; 
    await db.SaveChangesAsync();
    
    return Results.Ok("Книгу успішно повернуто в бібліотеку.");
});

app.Run();