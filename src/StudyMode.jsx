import { useState } from 'react';

const emojis = ['🍎', '🚀', '⭐️', '🐶', '🍕', '🎉', '🌈', '🍦', '🎈'];

function StudyMode({ onBack }) {
  const [selectedDan, setSelectedDan] = useState(null);

  return (
    <div>
      <h2 style={{ fontSize: '2.5rem', color: '#ff6b6b' }}>📖 구구단 공부 📖</h2>
      
      {!selectedDan ? (
        <>
          <p style={{ fontSize: '1.5rem', marginBottom: '20px' }}>몇 단을 공부할까? 👇</p>
          <div className="number-grid">
            {[2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button 
                key={num} 
                className="number-btn"
                onClick={() => setSelectedDan(num)}
              >
                {num}단
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <h3 style={{ fontSize: '2rem', color: '#0984e3' }}>{selectedDan}단 {emojis[selectedDan - 2]}</h3>
          <div className="table-display">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <div 
                key={i} 
                className="table-row" 
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <span>{selectedDan}</span>
                <span className="emoji">✖️</span>
                <span>{i}</span>
                <span className="emoji">🟰</span>
                <span style={{ color: '#e84118', fontWeight: 'bold' }}>{selectedDan * i}</span>
              </div>
            ))}
          </div>
          <button 
            className="btn btn-home" 
            onClick={() => setSelectedDan(null)}
            style={{ marginTop: '20px' }}
          >
            ↩️ 다른 단 고르기
          </button>
        </>
      )}
      
      <div style={{ marginTop: '30px' }}>
        <button className="btn btn-home" onClick={onBack}>🏠 홈으로</button>
      </div>
    </div>
  );
}

export default StudyMode;
