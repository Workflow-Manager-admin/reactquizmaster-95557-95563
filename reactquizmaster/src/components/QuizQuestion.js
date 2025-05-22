import React, { useContext } from 'react';
import { QuizContext } from '../context/QuizContext';
import './QuizQuestion.css';

/**
 * QuizQuestion component displays the current question and answer options
 */
const QuizQuestion = () => {
  const { 
    currentQuestion,
    selectedAnswer,
    isAnswerCorrect,
    handleAnswerSelect,
    nextQuestion
  } = useContext(QuizContext);

  if (!currentQuestion) return <div>Loading question...</div>;

  return (
    <div className="question-container">
      <h2 className="question-text">{currentQuestion.question}</h2>
      
      <div className="options-container">
        {currentQuestion.options.map((option, index) => (
          <button 
            key={index}
            className={`
              option-button
              ${selectedAnswer === option ? 'selected' : ''}
              ${selectedAnswer && option === currentQuestion.correctAnswer ? 'correct' : ''}
              ${selectedAnswer === option && option !== currentQuestion.correctAnswer ? 'incorrect' : ''}
            `}
            onClick={() => !selectedAnswer && handleAnswerSelect(option)}
            disabled={!!selectedAnswer}
          >
            {option}
          </button>
        ))}
      </div>
      
      {selectedAnswer && (
        <div className="feedback-container">
          <div className={`feedback ${isAnswerCorrect ? 'correct' : 'incorrect'}`}>
            {isAnswerCorrect 
              ? 'Correct! Well done!' 
              : `Incorrect. The correct answer is: ${currentQuestion.correctAnswer}`}
          </div>
          <button className="next-button btn" onClick={nextQuestion}>
            Next Question
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;
