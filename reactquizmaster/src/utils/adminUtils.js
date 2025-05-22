/**
 * Utility functions for the admin panel
 */

/**
 * Validates question form data
 * @param {Object} formData - Form data to validate
 * @returns {Object} - Object with isValid flag and errors object
 */
export const validateQuestionForm = (formData) => {
  const errors = {};
  
  // Check if question text is provided
  if (!formData.question?.trim()) {
    errors.question = 'Question text is required';
  }
  
  // Check if all four options are provided
  if (!formData.options || formData.options.length !== 4) {
    errors.options = 'Four options are required';
  } else {
    // Check if any option is empty
    const emptyOptionIndex = formData.options.findIndex(option => !option.trim());
    if (emptyOptionIndex !== -1) {
      errors[`option${emptyOptionIndex + 1}`] = `Option ${emptyOptionIndex + 1} cannot be empty`;
    }
    
    // Check for duplicate options
    const uniqueOptions = new Set(formData.options.map(opt => opt.trim()));
    if (uniqueOptions.size !== formData.options.length) {
      errors.uniqueOptions = 'All options must be unique';
    }
  }
  
  // Check if correct answer is one of the options
  if (!formData.correctAnswer) {
    errors.correctAnswer = 'Correct answer is required';
  } else if (formData.options && !formData.options.includes(formData.correctAnswer)) {
    errors.correctAnswer = 'Correct answer must be one of the options';
  }
  
  // Check if category is provided
  if (!formData.category?.trim()) {
    errors.category = 'Category is required';
  }
  
  // Check if difficulty is provided and valid
  if (!formData.difficulty) {
    errors.difficulty = 'Difficulty is required';
  } else if (!['easy', 'medium', 'hard'].includes(formData.difficulty)) {
    errors.difficulty = 'Difficulty must be easy, medium, or hard';
  }
  
  // Check if timeLimit is provided and valid
  if (!formData.timeLimit || isNaN(Number(formData.timeLimit))) {
    errors.timeLimit = 'Time limit must be a valid number';
  } else if (Number(formData.timeLimit) < 10 || Number(formData.timeLimit) > 120) {
    errors.timeLimit = 'Time limit must be between 10 and 120 seconds';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Default categories for questions
 */
export const QUESTION_CATEGORIES = [
  'General Knowledge',
  'Science',
  'History',
  'Geography',
  'Entertainment',
  'Sports',
  'Literature',
  'Technology',
  'Mathematics',
  'Other'
];

/**
 * Gets a default empty question form data object
 * @returns {Object} Default question form data
 */
export const getEmptyQuestionForm = () => ({
  question: '',
  options: ['', '', '', ''],
  correctAnswer: '',
  category: 'General Knowledge',
  difficulty: 'medium',
  timeLimit: 30
});

/**
 * Format question difficulty for display
 * @param {string} difficulty - Difficulty level
 * @returns {string} Formatted difficulty
 */
export const formatDifficulty = (difficulty) => {
  const map = {
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard'
  };
  return map[difficulty] || 'Medium';
};
