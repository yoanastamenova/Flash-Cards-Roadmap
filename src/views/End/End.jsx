import { useLocation, useNavigate } from 'react-router-dom';
import React from 'react';
import "./End.css"

export const End = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const finalScore = location.state?.finalScore || 0;

  return (
    <>
    <div className='end-body'>
      <p className='end-text'>Thank you for playing!</p>
      <p className='end-score'>{`Your final score is: ${finalScore}`}</p>
      <button className='end-button' onClick={() => navigate('/')}>Exit</button>
    </div>
    </>
  );
};
