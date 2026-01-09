import React, { useState } from "react";
import "./Quiz.css";
import { data } from "../assets/data";

const Quiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [question, setQuestion] = useState(data[currentIndex])
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [score,setScore] = useState(0);

  const [isFinished, setIsFinished] = useState(false);


  function compareOptions(option) {
    setSelectedOpt(option);

    if (option === data[currentIndex].correctOpt){
       setScore(prev => prev + 1)
    }
  }

  function displayNextQuestion() {
  if(selectedOpt === null){
    alert('select an option first!')
  }else if (currentIndex < data.length - 1) {
    setCurrentIndex(currentIndex + 1);
    setSelectedOpt(null);  
  }
}

  return (
    <div className="container">
      

      <h2>Quiz App | SCORE: {score}</h2>
      <hr />
      <h3>{data[currentIndex].question}</h3>
      <ul>
        {data[currentIndex].options.map((option, index) => {
          let className = "";
          if (selectedOpt !== null) {
            if (option === selectedOpt && option === data[currentIndex].correctOpt){
              className = "correct-green";
            }else if (option === selectedOpt && option !== data[currentIndex].correctOpt){
              className = "wrong-red";
            } else if (option === data[currentIndex].correctOpt) {
              className = "correct-green";
            }
          }

          return (
            <li
              className={className}
              onClick={() => {
                compareOptions(option);
              }}
              key={`${data[currentIndex].id}-${index}`}
            >
              {option}
            </li>
          );
        })}
      </ul>
      <button
        onClick={displayNextQuestion}
        disabled={currentIndex === data.length - 1}
      >
        Next
      </button>
      <div className="index">{data[currentIndex].questionNumber} of 5</div>
    </div>
  );
};

export default Quiz;
