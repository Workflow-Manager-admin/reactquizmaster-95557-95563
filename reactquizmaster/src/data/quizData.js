/**
 * General knowledge quiz data with questions, answer options, and correct answers
 * Each question includes a unique id, question text, options array, and correct answer
 * 
 * This file now imports the larger question pool from questionPool.json
 * and also supports the admin panel for managing questions
 */

import questionPool from './questionPool.json';

// Get questions from localStorage if available, otherwise use the default pool
const loadQuestionsFromStorage = () => {
  try {
    const savedQuestions = localStorage.getItem('quizverse_questions');
    if (savedQuestions) {
      return JSON.parse(savedQuestions);
    }
    // If no saved questions, store the default ones in localStorage
    localStorage.setItem('quizverse_questions', JSON.stringify(questionPool));
    return questionPool;
  } catch (error) {
    console.error('Failed to load questions from localStorage:', error);
    return questionPool;
  }
};

// Export the full question pool with localStorage integration
export const fullQuestionPool = loadQuestionsFromStorage();

// Export the first 10 questions as the default export for backward compatibility
const quizData = fullQuestionPool.slice(0, 10);

export default quizData;
