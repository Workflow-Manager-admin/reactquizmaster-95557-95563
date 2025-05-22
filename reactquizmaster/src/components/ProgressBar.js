import React, { useContext } from 'react';
import { QuizContext } from '../context/QuizContext';
import './ProgressBar.css';

/**
 * ProgressBar component shows user's progression through the quiz
 */
const ProgressBar = () => {
  const { currentQuestionIndex, totalQuestions, progressPercentage } = useContext(QuizContext);
  
  return (
    <div className="progress-container">
      <div className="progress-info">
        <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
        <span>{progressPercentage}% Complete</span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
