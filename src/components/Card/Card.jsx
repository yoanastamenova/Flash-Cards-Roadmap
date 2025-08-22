import React, { useState } from 'react';
import "./Card.css";
import questions from "../../data/questions.json"
import { useNavigate } from 'react-router-dom';

const Card = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentQuestion = questions[currentIndex];
    let navigate = useNavigate();

  return (
    <div className='card-body'>
        <form>
           <fieldset>
           <legend>{currentQuestion.question}</legend>
             {currentQuestion.answers.map((answer, i) => (
              <div key={i}>
              <input type="radio" id={`answer-${i}`} name={`q-${currentIndex}`} value={answer} />
              <label htmlFor={`answer-${i}`}>{answer}</label>
            </div>
          ))}
          <div>
          {currentIndex > 0 && (
          <button className="button-card-back"
          type="button"
          onClick={() => setCurrentIndex(currentIndex - 1)}> 
          Back </button> )}

          {currentIndex < questions.length - 1 && (
             <button className="button-card" type="button"
            onClick={() => setCurrentIndex(currentIndex + 1)}> 
            Next </button>)}

          {currentIndex === questions.length - 1 && (
            <button className="button-card-submit" type="submit"
            onClick={() => navigate("/end")}>
            Submit
            </button>)}
          </div>
          </fieldset>
        </form>
      </div>
  );
};

export default Card;