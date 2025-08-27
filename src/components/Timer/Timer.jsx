import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types';
import "./Timer.css"


export default function Timer({seconds, onEnd, resetTrigger}) {
    Timer.propTypes = {
    seconds: PropTypes.number.isRequired,
    onEnd: PropTypes.func,
    resetTrigger: PropTypes.any
    };

  const [countdown, setCountdown] = useState(seconds)
  const timerId = useRef()

  useEffect(() => {
    setCountdown(seconds)
    if (timerId.current) {
      clearInterval(timerId.current)
    }
    timerId.current = setInterval(() => {
      setCountdown(prev => Math.max(0, prev - 1))
    }, 1000)
    return () => clearInterval(timerId.current)
  }, [resetTrigger, seconds])

  useEffect(() => {
    if(countdown <= 0) {
        clearInterval(timerId.current)
        if (onEnd) {
          onEnd()
        }
    }
  }, [countdown, onEnd])
  
  // Format seconds to MM:SS
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };
  
  const isWarning = countdown <= 10 && countdown > 5;
  const isCritical = countdown <= 5 && countdown > 0;
  
  const timerClassName = isCritical ? 'timer-body timer-critical' : 
                         isWarning ? 'timer-body timer-warning' : 
                         'timer-body';
  
  return (
    <div className={timerClassName}>
      <div>Time Remaining: {formatTime(countdown)}</div>
      <div className="timer-progress-container">
        <div 
          className="timer-progress-bar" 
          style={{ width: `${(countdown / seconds) * 100}%` }}
        />
      </div>
    </div>
  )
}
