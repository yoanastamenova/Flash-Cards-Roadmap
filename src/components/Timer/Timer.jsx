import "./Timer.css"
import React from "react";
import PropTypes from "prop-types";
import Countdown from "react-countdown";

const Timer = ({ duration, onComplete }) => {
  return (
    <>
      <Countdown
        date={Date.now() + duration}
        renderer={({ minutes, seconds, completed }) => {
          if (completed) {
            onComplete();
            return <span>Time is up!</span>;
          } else {
            return <span>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>;
          }
        }}
      />
    </>
  );
};

Timer.propTypes = {
  duration: PropTypes.number.isRequired,
  onComplete: PropTypes.func.isRequired
};

export default Timer;