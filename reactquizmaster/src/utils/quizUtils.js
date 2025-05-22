/**
 * Utility functions for the quiz application
 */

/**
 * Selects a random subset of questions from a larger pool
 * @param {Array} questionPool - The full pool of available questions
 * @param {number} count - Number of questions to select
 * @returns {Array} - A random subset of questions
 */
export const selectRandomQuestions = (questionPool, count) => {
  // Make sure we don't try to select more questions than are available
  const selectionCount = Math.min(count, questionPool.length);
  
  // Create a copy of the question pool to avoid modifying the original
  const poolCopy = [...questionPool];
  const selectedQuestions = [];
  
  // Select random questions from the pool
  for (let i = 0; i < selectionCount; i++) {
    // Get a random index from the remaining questions
    const randomIndex = Math.floor(Math.random() * poolCopy.length);
    // Add the randomly selected question to our selection
    selectedQuestions.push(poolCopy[randomIndex]);
    // Remove the selected question from the copy to avoid duplicates
    poolCopy.splice(randomIndex, 1);
  }
  
  return selectedQuestions;
};

/**
 * Shuffles an array using the Fisher-Yates (Knuth) shuffle algorithm
 * @param {Array} array - The array to be shuffled
 * @returns {Array} - The shuffled array
 */
export const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

/**
 * Formats seconds into a MM:SS time format
 * @param {number} seconds - The number of seconds to format
 * @returns {string} - Formatted time string (MM:SS)
 */
export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

/**
 * Calculates the percentage score based on correct answers
 * @param {number} correctAnswers - Number of correct answers
 * @param {number} totalQuestions - Total number of questions
 * @returns {number} - Percentage score (0-100)
 */
export const calculateScore = (correctAnswers, totalQuestions) => {
  return Math.round((correctAnswers / totalQuestions) * 100);
};

/**
 * Determines the performance level based on the percentage score
 * @param {number} score - Percentage score (0-100)
 * @returns {string} - Performance level description
 */
export const getPerformanceLevel = (score) => {
  if (score >= 90) return "Excellent";
  if (score >= 70) return "Good";
  if (score >= 50) return "Average";
  return "Needs Improvement";
};

/**
 * Generates feedback based on the percentage score
 * @param {number} score - Percentage score (0-100)
 * @returns {string} - Feedback message
 */
export const getFeedback = (score) => {
  if (score >= 90) {
    return "Congratulations! You have an excellent understanding of the subject!";
  } else if (score >= 70) {
    return "Good job! You have a solid understanding of the subject.";
  } else if (score >= 50) {
    return "Not bad! With a bit more study, you can improve your knowledge.";
  } else {
    return "Keep learning! We recommend reviewing the material and trying again.";
  }
};
