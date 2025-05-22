import React, { useContext } from 'react';
import { QuizContext } from '../context/QuizContext';
import Welcome from './Welcome';
import QuizQuestion from './QuizQuestion';
import Timer from './Timer';
import ProgressBar from './ProgressBar';
import Results from './Results';
import './QuizContainer.css';

/**
 * QuizContainer is the main component that orchestrates all quiz functionality
 * It conditionally renders different screens based on the quiz state
 */
const QuizContainer = () => {
  const { quizStarted, quizCompleted } = useContext(QuizContext);

  // Render logic based on quiz state
  const renderContent = () => {
    if (quizCompleted) {
      return <Results />;
    } else if (quizStarted) {
      return (
        <div className="quiz-active-container">
          <ProgressBar />
          <div className="quiz-content">
            <Timer />
            <QuizQuestion />
          </div>
        </div>
      );
    } else {
      return <Welcome />;
    }
  };

  return (
    <div className="quiz-container">
      <div className="quiz-wrapper">
        {renderContent()}
      </div>
    </div>
  );
};

export default QuizContainer;
