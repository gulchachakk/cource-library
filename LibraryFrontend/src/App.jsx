import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Books from './Books';
import Readers from './Readers';
import Loans from './Loans';
import Dashboard from './Dashboard';

function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '1000px', margin: '0 auto' }}>
        <nav style={{ marginBottom: '20px', paddingBottom: '15px', borderBottom: '2px solid #eee' }}>
          <h2 style={{ marginBottom: '15px', fontSize: '32px', fontWeight: '700' }}>Система управління бібліотекою</h2>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link to="/" style={{ textDecoration: 'none', color: '#007bff' }}>Головна (Статистика)</Link>
            <Link to="/books" style={{ textDecoration: 'none', color: '#007bff' }}>Книги</Link>
            <Link to="/readers" style={{ textDecoration: 'none', color: '#007bff' }}>Читачі</Link>
            <Link to="/loans" style={{ textDecoration: 'none', color: '#007bff' }}>Журнал видачі</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/books" element={<Books />} />
          <Route path="/readers" element={<Readers />} />
          <Route path="/loans" element={<Loans />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
