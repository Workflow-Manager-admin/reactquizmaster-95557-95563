import React, { useContext } from 'react';
import { QuizContext } from '../context/QuizContext';
import { calculateScore, getPerformanceLevel, getFeedback } from '../utils/quizUtils';
import './Results.css';

/**
 * Results component displays quiz results and performance stats
 */
const Results = () => {
  const { score, userAnswers, totalQuestions, restartQuiz } = useContext(QuizContext);
  
  const percentageScore = calculateScore(score, totalQuestions);
  const performanceLevel = getPerformanceLevel(percentageScore);
  const feedback = getFeedback(percentageScore);

  return (
    <div className="results-container">
      <h1 className="results-title">Quiz Results</h1>
      
      <div className="score-card">
        <div className="score-circle">
          <span className="score-percentage">{percentageScore}%</span>
          <span className="score-text">Score</span>
        </div>
        
        <div className="score-details">
          <h2 className="performance-level">{performanceLevel}</h2>
          <p className="feedback-text">{feedback}</p>
          <div className="score-stats">
            <div className="stat">
              <span className="stat-value">{score}</span>
              <span className="stat-label">Correct</span>
            </div>
            <div className="stat">
              <span className="stat-value">{totalQuestions - score}</span>
              <span className="stat-label">Incorrect</span>
            </div>
            <div className="stat">
              <span className="stat-value">{totalQuestions}</span>
              <span className="stat-label">Total</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="answers-review">
        <h2 className="review-title">Review Your Answers</h2>
        {userAnswers.map((item, index) => (
          <div 
            key={index} 
            className={`review-item ${item.isCorrect ? 'correct' : 'incorrect'}`}
          >
            <div className="question-number">
              <span>{index + 1}</span>
            </div>
            <div className="review-content">
              <h3>{item.question}</h3>
              <p>
                <span className="review-label">Your answer: </span> 
                <span className={item.isCorrect ? 'correct-text' : 'incorrect-text'}>
                  {item.userAnswer}
                </span>
              </p>
              {!item.isCorrect && (
                <p>
                  <span className="review-label">Correct answer: </span>
                  <span className="correct-text">{item.correctAnswer}</span>
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <button className="restart-button btn" onClick={restartQuiz}>
        Try Again
      </button>
    </div>
  );
};

export default Results;
