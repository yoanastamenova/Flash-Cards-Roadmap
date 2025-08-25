import React, { useEffect, useState } from 'react';
import "./Main.css";
import Card from '../../components/Card/Card';

export default function Main() {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [questionIndex, setQuestionIndex] = useState(0);

  useEffect(() => {
    setSelectedAnswer('');
    setCorrectAnswer('');
  }, [questionIndex]);

  return (
    <div className='main-body'>
      <Card
        onAnswer={(answer, correct) => {
          setSelectedAnswer(answer);
          setCorrectAnswer(correct);
        }}
        onQuestionChange={setQuestionIndex}
      />

      {selectedAnswer && (
        selectedAnswer === correctAnswer ? (
          <p className='correct-answer'> ✅ Nice! Your answer is correct! 🥳 </p>
        ) : (
          <p className='wrong-answer'> 🚫 Oh no! The correct answer was {correctAnswer} 💡 </p>
        )
      )}
    </div>
  );
}
