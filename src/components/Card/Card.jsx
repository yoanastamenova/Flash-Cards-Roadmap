import React, { useEffect, useState } from 'react';
import "./Card.css";
import questions from "../../data/questions.json"
import { useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";

const Card = ({ onAnswer, onQuestionChange }) => {
  Card.propTypes = {
    onAnswer: PropTypes.func,
    onQuestionChange: PropTypes.func
  };
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuestion = questions[currentIndex];
  const [score, setScore] = useState(0);
  let navigate = useNavigate();

  const [selectedAnswer, setSelectedAnswer] = useState('');

  const handleSubmit = () => {
  navigate("/end", { state: { finalScore: score } });
};

  useEffect(() => {
    setSelectedAnswer('');
  }, [currentIndex])

  useEffect(() => {
    if (onQuestionChange) onQuestionChange(currentIndex);
  }, [currentIndex, onQuestionChange]);

  return (
    <div className='card-body'>
      <form>
        <fieldset>
          <legend>{currentQuestion.question}</legend>
          {currentQuestion.answers.map((answer, i) => {
            const labelClassName =
              selectedAnswer === answer
                ? answer === currentQuestion.correctAnswer
                  ? 'label label--correct'
                  : 'label label--wrong'
                : 'label';

            return (
              <div key={i}>
                <input
                  type="radio"
                  id={`answer-${i}`}
                  name={`q-${currentIndex}`}
                  value={answer}
                  onChange={() => {
                    setSelectedAnswer(answer);
                    if (answer === currentQuestion.correctAnswer) {
                      setScore(prev => prev + 5);
                    }
                    onAnswer(answer, currentQuestion.correctAnswer)
                  }}
                  checked={selectedAnswer === answer}
                  disabled={!!selectedAnswer}
                />
                <label className={labelClassName} htmlFor={`answer-${i}`}>
                  {answer}
                </label>
              </div>
            );
          })}
          <div>
            {currentIndex > 0 && (
              <button className="button-card-back"
                type="button"
                onClick={() => {
                  setCurrentIndex(currentIndex - 1);
                  if (onQuestionChange) onQuestionChange(currentIndex - 1)
                }}>
                Back </button>)}

            {currentIndex < questions.length - 1 && (
              <button className="button-card" type="button"
                onClick={() => {
                  setCurrentIndex(currentIndex + 1);
                  if (onQuestionChange) onQuestionChange(currentIndex + 1)
                }}>
                Next </button>)}

            {currentIndex === questions.length - 1 && (
              <button className="button-card-submit" type="button"
                onClick={handleSubmit}>
                Submit
              </button>)}
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Card;
