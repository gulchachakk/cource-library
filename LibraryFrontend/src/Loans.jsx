import { useState, useEffect } from 'react';

export default function Loans() {
  const [loans, setLoans] = useState([]);
  const [bookId, setBookId] = useState('');
  const [readerId, setReaderId] = useState('');
  const [dueDate, setDueDate] = useState('');

  //функція для завантаж оновленого списку видач
  const loadLoans = () => {
    fetch('http://localhost:5158/loans')
      .then(response => response.json())
      .then(data => setLoans(data));
  };

  useEffect(() => {
    loadLoans();
  }, []);

  //кнопка "видати книгу"
  const handleIssueBook = async (e) => {
    e.preventDefault();
    const loanData = {
      bookId: parseInt(bookId),
      readerId: parseInt(readerId),
      dueDate: new Date(dueDate).toISOString()
    };

    const response = await fetch('http://localhost:5158/loans', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loanData)
    });

    if (response.ok) {
      loadLoans(); //оновлення таблиці
      setBookId('');
      setReaderId('');
      setDueDate('');
    }
  };

  //кнопка "повернути"
  const handleReturnBook = async (id) => {
    const response = await fetch(`http://localhost:5158/loans/${id}/return`, {
      method: 'PUT'
    });
    if (response.ok) {
      loadLoans(); //оновлення таблиці, щоб побачити дату повернення
    }
  };

  //форма видачі книги та таблиця журналу
  return (
    <div>
      <h3>Електронний журнал видачі книг</h3>

      <form onSubmit={handleIssueBook} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input type="number" placeholder="ID Книги" value={bookId} onChange={e => setBookId(e.target.value)} required />
        <input type="number" placeholder="ID Читача" value={readerId} onChange={e => setReaderId(e.target.value)} required />
        <label style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#555' }}>
          Дедлайн:
          <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} required />
        </label>
        <button type="submit" style={{ cursor: 'pointer', color: 'white', border: 'none', padding: '5px 10px' }}>
          Видати книгу
        </button> 
      </form>

      <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, marginTop: '20px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #ffffff' }}>
        <thead>
          <tr style={{ backgroundColor: '#2a2a2a', textAlign: 'left' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID Запису</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID Книги</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID Читача</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Дата видачі</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Дедлайн</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Дата повернення</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Дія</th>
          </tr>
        </thead>
        <tbody>
          {loans.map(loan => (
            <tr key={loan.id}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{loan.id}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{loan.bookId}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{loan.readerId}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{new Date(loan.loanDate).toLocaleDateString()}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{new Date(loan.dueDate).toLocaleDateString()}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                {loan.returnDate ? new Date(loan.returnDate).toLocaleDateString() : <span style={{ color: '#e06c75', fontWeight: 'bold' }}>У читача</span>}
              </td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                {!loan.returnDate && (
                  <button onClick={() => handleReturnBook(loan.id)} style={{ cursor: 'pointer', backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '3px 7px' }}>
                    Повернути
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}