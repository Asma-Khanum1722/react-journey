import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { data } from "../assets/data";
import "./Quiz.css";

const Quiz = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  const progress = ((currentIndex + 1) / data.length) * 100;
  const isLastQuestion = currentIndex === data.length - 1;

  function handleOptionClick(option) {
    if (answered) return;
    
    setSelectedOpt(option);
    setAnswered(true);
    
    if (option === data[currentIndex].correctOpt) {
      setScore(prev => prev + 1);
    }
  }

  function handleNext() {
    if (!answered) {
      alert('Please select an option first!');
      return;
    }
    
    if (isLastQuestion) {
      navigate('/results', { state: { score, total: data.length } });
    } else {
      setCurrentIndex(currentIndex + 1);
      setSelectedOpt(null);
      setAnswered(false);
    }
  }

  return (
    <div className="quiz-page">
      <div className="quiz-container">
        {/* Header */}
        <div className="quiz-header">
          <div className="quiz-info">
            <span className="quiz-badge">QUIZ</span>
            <span className="quiz-score">Score: {score}/{data.length}</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="progress-text">
            Question {currentIndex + 1} of {data.length}
          </div>
        </div>

        {/* Question */}
        <h2 className="quiz-question">{data[currentIndex].question}</h2>

        {/* Options */}
        <ul className="quiz-options">
          {data[currentIndex].options.map((option, index) => {
            let className = "quiz-option";
            
            if (answered) {
              if (option === data[currentIndex].correctOpt) {
                className += " correct";
              } else if (option === selectedOpt) {
                className += " wrong";
              }
            }

            return (
              <li
                key={`${data[currentIndex].id}-${index}`}
                className={className}
                onClick={() => handleOptionClick(option)}
              >
                <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                <span className="option-text">{option}</span>
              </li>
            );
          })}
        </ul>

        {/* Button */}
        <button className="quiz-btn" onClick={handleNext}>
          {isLastQuestion ? 'See Results' : 'Next Question'}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Quiz;
