import React from 'react'
import './End.css'
import { useNavigate } from 'react-router-dom'

export const End = () => {
  const navigate = useNavigate();

  const handleExit = () => {
    navigate('/');
  }

    const result = 3;

  return (
    <div className='end-body'>
      <p className='end-text'>Thank you for playing!</p>
      <p className='end-score'>{`Here is your score: ${result}`} </p>
      <button className='end-button' onClick={handleExit}>Exit</button>
      </div>
  )
}
