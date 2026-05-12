import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

function QuizMode({ onBack }) {
  const [question, setQuestion] = useState({ a: 2, b: 1, answer: 2, options: [] });
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const generateQuestion = () => {
    const a = Math.floor(Math.random() * 8) + 2; // 2~9
    const b = Math.floor(Math.random() * 9) + 1; // 1~9
    const answer = a * b;
    
    // Generate wrong answers
    let options = new Set([answer]);
    while(options.size < 4) {
      const wrongA = Math.floor(Math.random() * 8) + 2;
      const wrongB = Math.floor(Math.random() * 9) + 1;
      options.add(wrongA * wrongB);
    }
    
    // Shuffle options
    const shuffledOptions = Array.from(options).sort(() => Math.random() - 0.5);
    
    setQuestion({ a, b, answer, options: shuffledOptions });
    setFeedback('');
    setIsAnimating(false);
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const handleAnswer = (selected) => {
    if (isAnimating) return;
    
    if (selected === question.answer) {
      setFeedback('정답! 우와 천재인데? 🎉');
      setScore(s => s + 10);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff9ff3', '#feca57', '#48dbfb', '#1dd1a1']
      });
      setIsAnimating(true);
      setTimeout(generateQuestion, 2000);
    } else {
      setFeedback('땡! 다시 생각해보자 ㅠㅠ 💦');
      const container = document.querySelector('.quiz-container');
      if (container) {
        container.style.animation = 'none';
        container.offsetHeight; // trigger reflow
        container.style.animation = 'shake 0.5s';
      }
    }
  };

  return (
    <div className="quiz-container">
      <div className="score-board">
        {score}점
      </div>
      
      <h2 style={{ fontSize: '2.5rem', color: '#0984e3' }}>🎯 구구단 퀴즈 🎯</h2>
      
      <div className="question">
        {question.a} <span className="emoji">✖️</span> {question.b} <span className="emoji">🟰</span> ❓
      </div>
      
      <div className="options-grid">
        {question.options.map((opt, i) => (
          <button 
            key={i} 
            className="option-btn"
            onClick={() => handleAnswer(opt)}
            disabled={isAnimating}
          >
            {opt}
          </button>
        ))}
      </div>
      
      <div className={`feedback ${feedback.includes('정답') ? 'correct' : feedback.includes('땡') ? 'wrong' : ''}`}>
        {feedback}
      </div>
      
      <button className="btn btn-home" onClick={onBack} style={{ marginTop: '20px' }}>🏠 홈으로</button>
    </div>
  );
}

export default QuizMode;
