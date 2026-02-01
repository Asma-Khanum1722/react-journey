import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Results.css'

const Results = () => {
  const location = useLocation();
  const { score = 0, total = 5 } = location.state || {};
  
  const percentage = Math.round((score / total) * 100);
  
  let message, emoji;
  if (percentage === 100) {
    message = "Perfect Score!";
    emoji = "🏆";
  } else if (percentage >= 80) {
    message = "Excellent Work!";
    emoji = "🌟";
  } else if (percentage >= 60) {
    message = "Good Job!";
    emoji = "👍";
  } else if (percentage >= 40) {
    message = "Keep Practicing!";
    emoji = "💪";
  } else {
    message = "Try Again!";
    emoji = "📚";
  }

  return (
    <div className="results-page">
      <div className="results-container">
        <div className="results-emoji">{emoji}</div>
        <h1 className="results-title">{message}</h1>
        
        <div className="score-circle">
          <div className="score-ring" style={{ '--percentage': percentage }}>
            <span className="score-value">{percentage}%</span>
          </div>
        </div>
        
        <div className="score-details">
          <div className="score-stat">
            <span className="stat-number">{score}</span>
            <span className="stat-label">Correct</span>
          </div>
          <div className="score-divider"></div>
          <div className="score-stat">
            <span className="stat-number">{total - score}</span>
            <span className="stat-label">Wrong</span>
          </div>
          <div className="score-divider"></div>
          <div className="score-stat">
            <span className="stat-number">{total}</span>
            <span className="stat-label">Total</span>
          </div>
        </div>
        
        <div className="results-actions">
          <Link to="/quiz" className="btn-retry">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 4v6h-6M1 20v-6h6"/>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
            </svg>
            Try Again
          </Link>
          <Link to="/" className="btn-home">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Results
