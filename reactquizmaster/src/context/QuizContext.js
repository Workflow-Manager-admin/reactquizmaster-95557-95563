import React, { createContext, useState, useEffect, useCallback } from 'react';
import quizData from '../data/quizData';
import { shuffleArray } from '../utils/quizUtils';
import { initSounds, playCorrectSound, playIncorrectSound } from '../utils/soundEffects';

// Create the quiz context
export const QuizContext = createContext();

// Create a provider component
export const QuizProvider = ({ children }) => {
  // State variables
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [timerActive, setTimerActive] = useState(false);

  // Initialize quiz with shuffled questions
  const initializeQuiz = useCallback(() => {
    const shuffledQuestions = shuffleArray(quizData);
    setQuestions(shuffledQuestions);
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setIsAnswerCorrect(null);
    setScore(0);
    setQuizStarted(false);
    setQuizCompleted(false);
    setUserAnswers([]);
    setTimerActive(false);
  }, []);

  // Start the quiz
  const startQuiz = () => {
    setQuizStarted(true);
    setTimeLeft(questions[0]?.timeLimit || 30);
    setTimerActive(true);
  };

  // Handle answer selection
  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;
    
    setIsAnswerCorrect(isCorrect);
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }

    // Store user's answer
    setUserAnswers(prevAnswers => [
      ...prevAnswers,
      { 
        questionId: currentQuestion.id,
        question: currentQuestion.question,
        userAnswer: answer,
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect
      }
    ]);

    setTimerActive(false);
  };

  // Move to next question
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedAnswer('');
      setIsAnswerCorrect(null);
      setTimeLeft(questions[currentQuestionIndex + 1]?.timeLimit || 30);
      setTimerActive(true);
    } else {
      // Quiz completed
      completeQuiz();
    }
  };

  // Complete quiz
  const completeQuiz = () => {
    setQuizCompleted(true);
    setQuizStarted(false);
    setTimerActive(false);
  };

  // Restart quiz
  const restartQuiz = () => {
    initializeQuiz();
  };

  // Timer effect
  useEffect(() => {
    let interval;
    
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timerActive && timeLeft === 0) {
      setTimerActive(false);
      
      // If time expires and no answer selected, move to next question
      if (!selectedAnswer) {
        const currentQuestion = questions[currentQuestionIndex];
        
        // Store as incorrect answer
        setUserAnswers(prevAnswers => [
          ...prevAnswers,
          { 
            questionId: currentQuestion.id,
            question: currentQuestion.question,
            userAnswer: "Time expired",
            correctAnswer: currentQuestion.correctAnswer,
            isCorrect: false
          }
        ]);
        
        // Move to next question or end quiz
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(prevIndex => prevIndex + 1);
          setTimeLeft(questions[currentQuestionIndex + 1]?.timeLimit || 30);
          setTimerActive(true);
        } else {
          completeQuiz();
        }
      }
    }

    return () => {
      clearInterval(interval);
    };
  }, [timerActive, timeLeft, currentQuestionIndex, questions, selectedAnswer]);

  // Initialize quiz and sounds on first load
  useEffect(() => {
    initializeQuiz();
    initSounds();
  }, [initializeQuiz]);

  // Calculate progress percentage
  const progressPercentage = questions.length > 0 
    ? Math.round(((currentQuestionIndex + (selectedAnswer ? 1 : 0)) / questions.length) * 100) 
    : 0;

  // Context value to be provided
  const contextValue = {
    questions,
    currentQuestionIndex,
    currentQuestion: questions[currentQuestionIndex],
    selectedAnswer,
    isAnswerCorrect,
    score,
    timeLeft,
    quizStarted,
    quizCompleted,
    userAnswers,
    progressPercentage,
    timerActive,
    totalQuestions: questions.length,
    startQuiz,
    handleAnswerSelect,
    nextQuestion,
    completeQuiz,
    restartQuiz
  };

  return (
    <QuizContext.Provider value={contextValue}>
      {children}
    </QuizContext.Provider>
  );
};
