import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

const Home = () => {
  return (
    <div className="home-page">
      <div className="home-container">
        <div className="home-badge">QUIZ TIME</div>
        <h1 className="home-title">
          Test Your <span>Knowledge</span>
        </h1>
        <p className="home-description">
          Challenge yourself with our interactive quiz. Answer questions, 
          track your progress, and see how you score!
        </p>
        
        <div className="home-features">
          <div className="feature">
            <span className="feature-icon">📝</span>
            <span className="feature-text">5 Questions</span>
          </div>
          <div className="feature">
            <span className="feature-icon">⚡</span>
            <span className="feature-text">Instant Feedback</span>
          </div>
          <div className="feature">
            <span className="feature-icon">🏆</span>
            <span className="feature-text">Score Tracking</span>
          </div>
        </div>
        
        <Link to="/quiz" className="start-btn">
          Start Quiz
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>
    </div>
  )
}

export default Home
