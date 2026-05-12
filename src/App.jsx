import { useState } from 'react';
import './index.css';
import StudyMode from './StudyMode';
import QuizMode from './QuizMode';

function App() {
  const [mode, setMode] = useState('home');

  return (
    <div className="app-container">
      {mode === 'home' && (
        <>
          <h1 className="title">✨ 유치찬란 구구단 ✨</h1>
          <h2>어떤 걸 해볼까? 🤔</h2>
          <button className="btn btn-primary" onClick={() => setMode('study')}>
            📖 구구단 공부하기 📖
          </button>
          <button className="btn btn-secondary" onClick={() => setMode('quiz')}>
            🎯 구구단 퀴즈풀기 🎯
          </button>
        </>
      )}
      
      {mode === 'study' && <StudyMode onBack={() => setMode('home')} />}
      {mode === 'quiz' && <QuizMode onBack={() => setMode('home')} />}
    </div>
  );
}

export default App;
