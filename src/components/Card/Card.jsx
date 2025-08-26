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
  const [score, setScore] = useState(0);

  // new state: store locked answers by question index
  const [lockedAnswers, setLockedAnswers] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const currentQuestion = questions[currentIndex];
  let navigate = useNavigate();

  const handleAnswer = (answer) => {
  if (answer) {
    setTimeout(() => {
      if (currentIndex === questions.length - 1) {
        handleSubmit();
      } else {
        setCurrentIndex(currentIndex + 1);
        if (onQuestionChange) onQuestionChange(currentIndex + 1);
      }
    }, 2000);
  }
};

  const handleSubmit = () => {
    navigate("/end", { state: { finalScore: score } });
  };

  // Restore answer when moving between questions
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
                  disabled={!!lockedAnswers[currentIndex]} // disable if already answered
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
                      handleAnswer(answer);
                    }
                    setSelectedAnswer(answer); // still trigger for first attempt
                  }}
                />
                <label className={labelClassName} htmlFor={`answer-${i}`}>
                  {answer}
                </label>
              </div>
            );
          })}
          <div>
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
                onClick={() => {
                  setCurrentIndex((prev) => prev + 1);
                  if (onQuestionChange) onQuestionChange(currentIndex + 1);
                }}
              >
                Next
              </button>
            )}

            {currentIndex === questions.length - 1 && (
              <button
                className="button-card-submit"
                type="button"
                onClick={handleSubmit}
              >
                Submit
              </button>
            )}
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Card;