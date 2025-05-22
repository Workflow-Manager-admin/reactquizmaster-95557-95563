import React, { useContext } from 'react';
import { QuizContext } from '../context/QuizContext';
import './Welcome.css';

/**
 * Welcome component displays the intro screen and start button
 */
const Welcome = () => {
  const { startQuiz, totalQuestions } = useContext(QuizContext);

  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Welcome to QuizVerse</h1>
      <div className="welcome-card">
        <h2>Test Your General Knowledge</h2>
        <p className="welcome-description">
          This quiz contains {totalQuestions} general knowledge questions on various topics.
          You'll have 30 seconds to answer each question.
        </p>
        
        <div className="instructions">
          <h3>Instructions:</h3>
          <ul>
            <li>Read each question carefully</li>
            <li>Select the best answer from the options given</li>
            <li>Complete the question before the timer runs out</li>
            <li>Your final score will be shown at the end of the quiz</li>
          </ul>
        </div>
        
        <button className="start-button btn" onClick={startQuiz}>
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default Welcome;
