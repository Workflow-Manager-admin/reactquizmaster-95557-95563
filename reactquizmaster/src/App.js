import React from 'react';
import './App.css';
import { QuizProvider } from './context/QuizContext';
import QuizContainer from './components/QuizContainer';

/**
 * Main App component that wraps the QuizContainer with QuizProvider
 * for global state management
 */
function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> ReactQuizMaster
            </div>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <QuizProvider>
          <QuizContainer />
        </QuizProvider>
      </main>
    </div>
  );
}

export default App;