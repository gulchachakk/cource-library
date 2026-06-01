import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [stats, setStats] = useState({ books: 0, readers: 0, activeLoans: 0 });
  const [debtors, setDebtors] = useState([]);

  useEffect(() => {
    //завантаження даних з усіх таблиць
    Promise.all([
      fetch('http://localhost:5158/books').then(res => res.json()),
      fetch('http://localhost:5158/readers').then(res => res.json()),
      fetch('http://localhost:5158/loans').then(res => res.json())
    ]).then(([books, readers, loans]) => {
      
      //шукає неповернуті книги
      const active = loans.filter(l => !l.returnDate);
      
      setStats({
        books: books.length,
        readers: readers.length,
        activeLoans: active.length
      });

      //шукає боржників
      const today = new Date();
      const overdue = active.filter(l => new Date(l.dueDate) < today);
      setDebtors(overdue);
    });
  }, []);

  //картки з цифрами та список боржників
 return (
    <div>
      <h3>Статистика бібліотеки</h3>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div style={{ padding: '15px', background: '#1e1e1e', border: '1px solid #333', borderRadius: '12px', minWidth: '150px' }}>
          <strong>Всього книг:</strong> <br/>
          <span style={{ fontSize: '24px', color: '#4dabf7' }}>{stats.books}</span>
        </div>
        <div style={{ padding: '15px', background: '#1e1e1e', border: '1px solid #333', borderRadius: '12px', minWidth: '150px' }}>
          <strong>Всього читачів:</strong> <br/>
          <span style={{ fontSize: '24px', color: '#40c057' }}>{stats.readers}</span>
        </div>
        <div style={{ padding: '15px', background: '#2a220a', border: '1px solid #665000', borderRadius: '12px', minWidth: '150px' }}>
          <strong style={{ color: '#ffd43b' }}>Зараз "У читача":</strong> <br/>
          <span style={{ fontSize: '24px', color: '#fab005' }}>{stats.activeLoans}</span>
        </div>
      </div>

      <h4>Боржники (прострочений дедлайн):</h4>
      {debtors.length === 0 ? (
        <p style={{ color: '#40c057', fontWeight: 'bold' }}>Наразі боржників немає!</p>
      ) : (
        <ul style={{ background: '#2a1114', border: '1px solid #660000', padding: '15px 30px', borderRadius: '12px' }}>
          {debtors.map(d => (
            <li key={d.id} style={{ color: '#ff6b6b', marginBottom: '10px' }}>
              <strong>Запис №{d.id}</strong> — ID Читача: {d.readerId} (Дедлайн був: {new Date(d.dueDate).toLocaleDateString()})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}