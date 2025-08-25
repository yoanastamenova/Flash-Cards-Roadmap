import React, { useEffect, useState } from 'react';
import "./Main.css";
import Card from '../../components/Card/Card';
import Timer from '../../components/Timer/Timer'; // Add this import

export default function Main() {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isAnsweringDisabled, setIsAnsweringDisabled] = useState(false);
  const [timerKey, setTimerKey] = useState(0);

  useEffect(() => {
    setSelectedAnswer('');
    setCorrectAnswer('');
    setIsAnsweringDisabled(false);
    setTimerKey(prev => prev + 1); 
  }, [questionIndex]);

  const handleTimerComplete = () => {
    setIsAnsweringDisabled(true);
    
    setTimeout(() => {
      setQuestionIndex(prev => prev + 1);
    }, 2000);
  };

  const handleAnswer = (answer, correct) => {
    if (!isAnsweringDisabled) {
      setSelectedAnswer(answer);
      setCorrectAnswer(correct);
    }
  };

  return (
    <div className='main-body'>
      <div className="timer-container">
        <Timer 
          key={timerKey}
          duration={10000}
          onComplete={handleTimerComplete}
        />
      </div>

      <Card
        onAnswer={handleAnswer}
        onQuestionChange={setQuestionIndex}
        disabled={isAnsweringDisabled}
      />

      {selectedAnswer && (
        selectedAnswer === correctAnswer ? (
          <p className='correct-answer'> ✅ Nice! Your answer is correct! 🥳 </p>
        ) : (
          <p className='wrong-answer'> 🚫 Oh no! The correct answer was {correctAnswer}. 💡 </p>
        )
      )}

      {isAnsweringDisabled && !selectedAnswer && (
        <p className='time-up-message'> ⏰ Time is up! Moving to next question... </p>
      )}
    </div>
  );
}