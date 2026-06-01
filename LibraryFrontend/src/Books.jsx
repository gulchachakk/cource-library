import { useState, useEffect } from 'react';

export default function Books() {
  const [books, setBooks] = useState([]);

  //стани для полів форми
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newYear, setNewYear] = useState('');

  //функц додав книги
  const handleAddBook = async (e) => {
    e.preventDefault(); //браузер не може перезавантажувати сторінку
    
    //об'єкт для бекенду
    const bookData = { 
        title: newTitle, 
        author: newAuthor, 
        year: parseInt(newYear), 
        isAvailable: true 
    };

    //POST запит
    const response = await fetch('http://localhost:5158/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookData)
    });

    if (response.ok) {
      const addedBook = await response.json();
      setBooks([...books, addedBook]); //+ нова книгу знизу таблиці
      
      //очищення полів вводу
      setNewTitle(''); 
      setNewAuthor(''); 
      setNewYear('');
    }
  };

  //useEffect виконується один раз при відкритті сторінки
  useEffect(() => {
    fetch('http://localhost:5158/books')
      .then(response => response.json())
      .then(data => setBooks(data));
  }, []);

  return (
    <div>
      <h3>Каталог книг</h3>
      <form onSubmit={handleAddBook} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input 
          placeholder="Назва книги" 
          value={newTitle} 
          onChange={(e) => setNewTitle(e.target.value)} 
          required 
        />
        <input 
          placeholder="Автор" 
          value={newAuthor} 
          onChange={(e) => setNewAuthor(e.target.value)} 
          required 
        />
        <input 
          type="number" 
          placeholder="Рік" 
          value={newYear} 
          onChange={(e) => setNewYear(e.target.value)} 
          required 
        />
        <button type="submit" style={{ cursor: 'pointer' }}>Додати книгу</button>
      </form>
      <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, marginTop: '20px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #ffffff' }}>
        <thead>
          <tr style={{ backgroundColor: '#2a2a2a', textAlign: 'left' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Назва</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Автор</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Рік</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{book.id}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{book.title}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{book.author}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{book.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}