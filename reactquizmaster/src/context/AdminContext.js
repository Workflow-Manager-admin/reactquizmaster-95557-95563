import React, { createContext, useState, useEffect } from 'react';
import { fullQuestionPool } from '../data/quizData';

// Create the admin context
export const AdminContext = createContext();

// Hardcoded admin credentials
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'password123'
};

// Create admin provider component
export const AdminProvider = ({ children }) => {
  // Admin authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  
  // Questions management state
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Load questions from localStorage or use default question pool
  useEffect(() => {
    const loadQuestions = () => {
      try {
        const savedQuestions = localStorage.getItem('quizverse_questions');
        
        if (savedQuestions) {
          setQuestions(JSON.parse(savedQuestions));
        } else {
          // If no questions in localStorage, use the default question pool
          setQuestions(fullQuestionPool);
          // Save to localStorage
          localStorage.setItem('quizverse_questions', JSON.stringify(fullQuestionPool));
        }
      } catch (error) {
        console.error('Failed to load questions:', error);
        // Fallback to default question pool
        setQuestions(fullQuestionPool);
      } finally {
        setLoading(false);
      }
    };
    
    loadQuestions();
  }, []);
  
  // Save questions to localStorage
  const saveQuestions = (updatedQuestions) => {
    try {
      localStorage.setItem('quizverse_questions', JSON.stringify(updatedQuestions));
      setQuestions(updatedQuestions);
    } catch (error) {
      console.error('Failed to save questions:', error);
    }
  };
  
  // Login function
  const login = (username, password) => {
    if (username === ADMIN_CREDENTIALS.username && 
        password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
      setAuthError('');
      // Store auth state in sessionStorage
      sessionStorage.setItem('quizverse_admin_auth', 'true');
      return true;
    } else {
      setAuthError('Invalid username or password');
      return false;
    }
  };
  
  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('quizverse_admin_auth');
  };
  
  // Check if user is authenticated on component mount
  useEffect(() => {
    const authState = sessionStorage.getItem('quizverse_admin_auth');
    if (authState === 'true') {
      setIsAuthenticated(true);
    }
  }, []);
  
  // Add a question
  const addQuestion = (newQuestion) => {
    // Find the highest ID and increment by 1 for the new question
    const maxId = Math.max(0, ...questions.map(q => q.id));
    const questionWithId = { ...newQuestion, id: maxId + 1 };
    
    const updatedQuestions = [...questions, questionWithId];
    saveQuestions(updatedQuestions);
    return questionWithId;
  };
  
  // Edit a question
  const editQuestion = (updatedQuestion) => {
    const updatedQuestions = questions.map(question => 
      question.id === updatedQuestion.id ? updatedQuestion : question
    );
    saveQuestions(updatedQuestions);
    return updatedQuestion;
  };
  
  // Delete a question
  const deleteQuestion = (questionId) => {
    const updatedQuestions = questions.filter(question => question.id !== questionId);
    saveQuestions(updatedQuestions);
  };
  
  // Get a single question by ID
  const getQuestionById = (questionId) => {
    return questions.find(question => question.id === parseInt(questionId));
  };
  
  // Context value to provide
  const contextValue = {
    isAuthenticated,
    authError,
    login,
    logout,
    questions,
    loading,
    addQuestion,
    editQuestion,
    deleteQuestion,
    getQuestionById
  };
  
  return (
    <AdminContext.Provider value={contextValue}>
      {children}
    </AdminContext.Provider>
  );
};
