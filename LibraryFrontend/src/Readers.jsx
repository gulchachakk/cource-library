import { useState, useEffect } from 'react';

export default function Readers() {
  const [readers, setReaders] = useState([]);
  const [newFullName, setNewFullName] = useState('');
  const [newPhone, setNewPhone] = useState('');

  //завантаження списку читачів при відкритті сторінки
  useEffect(() => {
    fetch('http://localhost:5158/readers')
      .then(response => response.json())
      .then(data => setReaders(data));
  }, []);

  //функц додаван читача
  const handleAddReader = async (e) => {
    e.preventDefault();
    
    const readerData = { 
        fullName: newFullName, 
        phone: newPhone 
    };

    const response = await fetch('http://localhost:5158/readers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(readerData)
    });

    if (response.ok) {
      const addedReader = await response.json();
      setReaders([...readers, addedReader]);
      
      setNewFullName(''); 
      setNewPhone(''); 
    }
  };

  return (
    <div>
      <h3>Список читачів</h3>
      
      <form onSubmit={handleAddReader} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input 
          placeholder="ПІБ читача" 
          value={newFullName} 
          onChange={(e) => setNewFullName(e.target.value)} 
          required 
        />
        <input 
          placeholder="Телефон" 
          value={newPhone} 
          onChange={(e) => setNewPhone(e.target.value)} 
          required 
        />
        <button type="submit" style={{ cursor: 'pointer' }}>Зареєструвати</button>
      </form>

      <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, marginTop: '20px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #ffffff' }}>
        <thead>
          <tr style={{ backgroundColor: '#2a2a2a', textAlign: 'left' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID Квитка</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>ПІБ</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Телефон</th>
          </tr>
        </thead>
        <tbody>
          {readers.map(reader => (
            <tr key={reader.id}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{reader.id}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{reader.fullName}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{reader.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}