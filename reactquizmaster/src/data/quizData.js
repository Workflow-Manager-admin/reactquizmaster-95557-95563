/**
 * General knowledge quiz data with questions, answer options, and correct answers
 * Each question includes a unique id, question text, options array, and correct answer
 * 
 * This file now imports the larger question pool from questionPool.json
 */

import questionPool from './questionPool.json';

// Export the full question pool
export const fullQuestionPool = questionPool;

// Export the first 10 questions as the default export for backward compatibility
const quizData = questionPool.slice(0, 10);

export default quizData;
