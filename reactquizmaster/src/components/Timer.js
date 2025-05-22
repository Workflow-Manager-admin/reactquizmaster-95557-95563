import React, { useContext } from 'react';
import { QuizContext } from '../context/QuizContext';
import { formatTime } from '../utils/quizUtils';
import './Timer.css';

/**
 * Timer component displays time remaining for current question
 */
const Timer = () => {
  const { timeLeft, timerActive } = useContext(QuizContext);
  
  // Calculate percentage for timer animation
  const percentage = (timeLeft / 30) * 100;
  
  // Determine timer color based on time remaining
  const getTimerColor = () => {
    if (timeLeft > 15) return '#4caf50'; // green
    if (timeLeft > 5) return '#ff9800';  // orange
    return '#f44336';                    // red
  };
  
  return (
    <div className="timer-container">
      <div className="timer-circle-container">
        <svg className="timer-circle" viewBox="0 0 100 100">
          <circle 
            className="timer-circle-bg" 
            cx="50" 
            cy="50" 
            r="45"
          />
          <circle 
            className="timer-circle-progress" 
            cx="50" 
            cy="50" 
            r="45"
            style={{
              strokeDashoffset: `${(100 - percentage) * 2.83}`,
              stroke: getTimerColor(),
              transition: timerActive ? 'stroke-dashoffset 1s linear, stroke 0.5s ease' : 'none'
            }}
          />
        </svg>
        <div className="timer-text">
          {formatTime(timeLeft)}
        </div>
      </div>
      <p className="timer-label">Time Remaining</p>
    </div>
  );
};

export default Timer;
