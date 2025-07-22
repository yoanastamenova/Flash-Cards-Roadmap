import React from 'react'
import logo from "../../assets/MW_logo.svg"
import "./Start.css"

export const Start = () => {
  return (
    <div className='container'>
        <img className='logo' src={logo}></img>
        <div>Start the quiz</div>
        <h1>Welcome to VALE Quiz</h1>
      <button>Start Quiz</button>
    </div>
  )
}