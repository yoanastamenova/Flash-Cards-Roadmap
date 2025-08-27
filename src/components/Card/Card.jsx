import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import "./Card.css";
import questions from "../../data/questions.json"
import { useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";

const Card = forwardRef(({ onAnswer, onQuestionChange }, ref) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lockedAnswers, setLockedAnswers] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [clickNext, setClickNext] = useState(false);

  const currentQuestion = questions[currentIndex];
  const navigate = useNavigate();


  const handleNextClick = () => {
    if(!selectedAnswer) {
      setClickNext(true);
      return
    } 
    setClickNext(false);
    setCurrentIndex(currentIndex + 1);
    if(onQuestionChange) onQuestionChange(currentIndex + 1);
  }

  const handleSubmit = () => {
    navigate("/end", { state: { finalScore: score } });
  };

  useEffect(() => {
    if (lockedAnswers[currentIndex]) {
      setSelectedAnswer(lockedAnswers[currentIndex]);
    } else {
      setSelectedAnswer('');
    }
  }, [currentIndex, lockedAnswers]);

  useEffect(() => {
    if (onQuestionChange) onQuestionChange(currentIndex);
  }, [currentIndex, onQuestionChange]);

  const finalAnswer = lockedAnswers[currentIndex] || selectedAnswer;

  useImperativeHandle(ref, () => ({
    moveToNextQuestion: () => {
      if (currentIndex === questions.length - 1) {
        handleSubmit();
      } else {
        setCurrentIndex(currentIndex + 1);
        if (onQuestionChange) onQuestionChange(currentIndex + 1);
      }
    }
  }), [currentIndex, onQuestionChange, handleSubmit]);

  return (
    <div className="card-body">
      <form>
        <fieldset>
          <legend>{currentQuestion.question}</legend>
          {currentQuestion.answers.map((answer, i) => {
            const labelClassName =
              finalAnswer === answer
                ? answer === currentQuestion.correctAnswer
                  ? "label label--correct"
                  : "label label--wrong"
                : "label";

            return (
              <div key={i}>
                <input
                  type="radio"
                  id={`answer-${i}`}
                  name={`q-${currentIndex}`}
                  value={answer}
                  checked={finalAnswer === answer}
                  disabled={!!lockedAnswers[currentIndex]} 
                  onChange={() => {
                    if (!lockedAnswers[currentIndex]) {
                      setLockedAnswers((prev) => ({
                        ...prev,
                        [currentIndex]: answer,
                      }));

                      if (answer === currentQuestion.correctAnswer) {
                        setScore((prev) => prev + 5);
                      }
                      onAnswer(answer, currentQuestion.correctAnswer);
                    }
                    setSelectedAnswer(answer);
                  }}
                />
                <label className={labelClassName} htmlFor={`answer-${i}`}>
                  {answer}
                </label>
              </div>
            );
          })}
          <div className='button-container'>
            {currentIndex > 0 && (
              <button
                className="button-card-back"
                type="button"
                onClick={() => {
                  setCurrentIndex((prev) => prev - 1);
                  if (onQuestionChange) onQuestionChange(currentIndex - 1);
                }}
              >
                Back
              </button>
            )}

            {currentIndex < questions.length - 1 && (
              <button
                className="button-card"
                type="button"
                onClick={handleNextClick}
                disabled={!selectedAnswer}
                style={{ opacity: !selectedAnswer ? 0.5 : 1, cursor: !selectedAnswer ? 'not-allowed' : 'pointer' }}
              >
                Next
              </button>
            )}

            {currentIndex === questions.length - 1 && (
              <button
                className="button-card-submit"
                type="button"
                onClick={handleSubmit}
                disabled={!selectedAnswer}
                style={{ opacity: !selectedAnswer ? 0.5 : 1, cursor: !selectedAnswer ? 'not-allowed' : 'pointer' }}
              >
                Submit
              </button>
            )}
          </div>
        </fieldset>
      </form>
    </div>
  );
});

Card.propTypes = {
  onAnswer: PropTypes.func,
  onQuestionChange: PropTypes.func
};
Card.displayName = "Card";
export default Card;