import React, { useEffect, useState, useRef } from 'react';
import "./Main.css";
import Card from '../../components/Card/Card';
import Timer from '../../components/Timer/Timer';

export default function Main() {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [timerResetTrigger, setTimerResetTrigger] = useState(0);
  const [visitedQuestions, setVisitedQuestions] = useState(new Set([0])); // Track visited questions
  const cardRef = useRef();

  useEffect(() => {
    setSelectedAnswer('');
    setCorrectAnswer('');
  }, [questionIndex]);

  const handleTimerEnd = () => {
    if (cardRef.current && cardRef.current.moveToNextQuestion) {
      cardRef.current.moveToNextQuestion();
    }
  };

  const handleQuestionChange = (newIndex) => {
    // Only reset timer if this is a new question we haven't visited before
    if (!visitedQuestions.has(newIndex)) {
      setTimerResetTrigger(prev => prev + 1);
      setVisitedQuestions(prev => new Set([...prev, newIndex]));
    }
    setQuestionIndex(newIndex);
  };

  return (
    <div className='main-body'>
      <Timer 
        seconds={60} 
        onEnd={handleTimerEnd}
        resetTrigger={timerResetTrigger}
      />
      <Card
        ref={cardRef}
        onAnswer={(answer, correct) => {
          setSelectedAnswer(answer);
          setCorrectAnswer(correct);
        }}
        onQuestionChange={handleQuestionChange}
      />

      {selectedAnswer && (
        selectedAnswer === correctAnswer ? (
          <p className='correct-answer'> ✅ Nice! Your answer is correct! 🥳 </p>
        ) : (
          <p className='wrong-answer'> 🚫 Oh no! The correct answer was {correctAnswer}. 💡 </p>
        )
      )}
    </div>
  );
}
