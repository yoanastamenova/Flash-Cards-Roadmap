import React from 'react'
import logo from "../../assets/MW_logo.svg"
import "./Start.css"

export const Start = () => {
  return (
    <div className='container'>
      <div className='bg-image'></div>
      <div className='bg-text'>
        <img src={logo} className='logoStart'></img>
        <div className='header'>Welcome to VALE Quiz</div>
        <p>This quiz is about the Valencian MaibornWolff Office and the people which work from there. You will be asked 10 questions with 3 possible answers.
          The right question is only one. For the quiz there is a time limit of 20 minutes. If you get out of time the quiz will be automatically ended.
          Good luck and have fun!
        </p>
      <button className='button'>Start</button>
      </div>
    </div>
  )
}