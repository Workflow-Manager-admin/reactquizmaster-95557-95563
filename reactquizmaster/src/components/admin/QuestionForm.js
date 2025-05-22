import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminContext } from '../../context/AdminContext';
import { validateQuestionForm, getEmptyQuestionForm, QUESTION_CATEGORIES } from '../../utils/adminUtils';

/**
 * QuestionForm component for adding and editing quiz questions
 */
const QuestionForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addQuestion, editQuestion, getQuestionById } = useContext(AdminContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(getEmptyQuestionForm());
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formFeedback, setFormFeedback] = useState({ type: '', message: '' });
  
  // Load existing question data if in edit mode
  useEffect(() => {
    if (id) {
      setIsEditing(true);
      const questionData = getQuestionById(parseInt(id));
      
      if (questionData) {
        // Add difficulty, category, timeLimit if they don't exist
        const enhancedData = {
          ...questionData,
          difficulty: questionData.difficulty || 'medium',
          category: questionData.category || 'General Knowledge',
          timeLimit: questionData.timeLimit || 30
        };
        setFormData(enhancedData);
      } else {
        setFormFeedback({
          type: 'error',
          message: `Question with ID ${id} not found`
        });
        // Redirect to questions list after a delay
        setTimeout(() => navigate('/admin/questions'), 2000);
      }
    }
  }, [id, getQuestionById, navigate]);
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear the specific error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  // Handle option changes
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...formData.options];
    updatedOptions[index] = value;
    
    setFormData(prev => ({
      ...prev,
      options: updatedOptions
    }));
    
    // Clear the related errors
    if (formErrors[`option${index + 1}`] || formErrors.uniqueOptions) {
      setFormErrors(prev => ({
        ...prev,
        [`option${index + 1}`]: '',
        uniqueOptions: ''
      }));
    }
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormFeedback({ type: '', message: '' });
    
    // Validate form
    const validation = validateQuestionForm(formData);
    
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Convert timeLimit to number
      const questionData = {
        ...formData,
        timeLimit: parseInt(formData.timeLimit, 10)
      };
      
      // Add or update question
      if (isEditing) {
        editQuestion(questionData);
        setFormFeedback({
          type: 'success',
          message: 'Question updated successfully!'
        });
      } else {
        addQuestion(questionData);
        setFormFeedback({
          type: 'success',
          message: 'Question added successfully!'
        });
        // Clear form after adding
        setFormData(getEmptyQuestionForm());
      }
      
      // Redirect after successful edit or go back to questions list
      if (isEditing) {
        setTimeout(() => navigate('/admin/questions'), 1500);
      }
    } catch (error) {
      setFormFeedback({
        type: 'error',
        message: `Error: ${error.message}`
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">
          {isEditing ? 'Edit Question' : 'Add New Question'}
        </h1>
        <button
          onClick={() => navigate('/admin/questions')}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M11 17l-5-5m0 0l5-5m-5 5h12" 
            />
          </svg>
          Back to Questions
        </button>
      </div>
      
      {/* Form feedback */}
      {formFeedback.message && (
        <div className={`p-4 rounded-lg ${
          formFeedback.type === 'success' 
            ? 'bg-green-500/20 border border-green-500/50 text-green-300' 
            : 'bg-red-500/20 border border-red-500/50 text-red-300'
        }`}>
          {formFeedback.message}
        </div>
      )}
      
      {/* Question form */}
      <form onSubmit={handleSubmit} className="bg-white/5 rounded-lg border border-white/10 p-6 space-y-6">
        {/* Question text */}
        <div>
          <label htmlFor="question" className="block text-sm font-medium text-white/70 mb-2">
            Question Text*
          </label>
          <textarea
            id="question"
            name="question"
            rows="3"
            className={`w-full px-4 py-3 bg-white/5 border ${
              formErrors.question ? 'border-red-500/50' : 'border-white/10'
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-quizverse-primary/60 text-white`}
            value={formData.question}
            onChange={handleInputChange}
            placeholder="Enter your question here"
          />
          {formErrors.question && (
            <p className="mt-1 text-sm text-red-400">{formErrors.question}</p>
          )}
        </div>
        
        {/* Options */}
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Answer Options*
          </label>
          <div className="space-y-3">
            {formData.options.map((option, index) => (
              <div key={index} className="flex items-center">
                <span className="mr-3 text-white/50">{index + 1}.</span>
                <input
                  type="text"
                  className={`flex-1 px-4 py-2 bg-white/5 border ${
                    formErrors[`option${index + 1}`] ? 'border-red-500/50' : 'border-white/10'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-quizverse-primary/60 text-white`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                />
              </div>
            ))}
            
            {(formErrors.options || formErrors.uniqueOptions) && (
              <p className="mt-1 text-sm text-red-400">
                {formErrors.options || formErrors.uniqueOptions}
              </p>
            )}
          </div>
        </div>
        
        {/* Correct answer */}
        <div>
          <label htmlFor="correctAnswer" className="block text-sm font-medium text-white/70 mb-2">
            Correct Answer*
          </label>
          <select
            id="correctAnswer"
            name="correctAnswer"
            className={`w-full px-4 py-2 bg-white/5 border ${
              formErrors.correctAnswer ? 'border-red-500/50' : 'border-white/10'
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-quizverse-primary/60 text-white`}
            value={formData.correctAnswer}
            onChange={handleInputChange}
          >
            <option value="" disabled>Select the correct answer</option>
            {formData.options.map((option, index) => (
              option && <option key={index} value={option}>{option}</option>
            ))}
          </select>
          {formErrors.correctAnswer && (
            <p className="mt-1 text-sm text-red-400">{formErrors.correctAnswer}</p>
          )}
        </div>
        
        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-white/70 mb-2">
            Category*
          </label>
          <select
            id="category"
            name="category"
            className={`w-full px-4 py-2 bg-white/5 border ${
              formErrors.category ? 'border-red-500/50' : 'border-white/10'
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-quizverse-primary/60 text-white`}
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="" disabled>Select a category</option>
            {QUESTION_CATEGORIES.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          {formErrors.category && (
            <p className="mt-1 text-sm text-red-400">{formErrors.category}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Difficulty */}
          <div>
            <label htmlFor="difficulty" className="block text-sm font-medium text-white/70 mb-2">
              Difficulty*
            </label>
            <select
              id="difficulty"
              name="difficulty"
              className={`w-full px-4 py-2 bg-white/5 border ${
                formErrors.difficulty ? 'border-red-500/50' : 'border-white/10'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-quizverse-primary/60 text-white`}
              value={formData.difficulty}
              onChange={handleInputChange}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            {formErrors.difficulty && (
              <p className="mt-1 text-sm text-red-400">{formErrors.difficulty}</p>
            )}
          </div>
          
          {/* Time limit */}
          <div>
            <label htmlFor="timeLimit" className="block text-sm font-medium text-white/70 mb-2">
              Time Limit (seconds)*
            </label>
            <input
              type="number"
              id="timeLimit"
              name="timeLimit"
              min="10"
              max="120"
              className={`w-full px-4 py-2 bg-white/5 border ${
                formErrors.timeLimit ? 'border-red-500/50' : 'border-white/10'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-quizverse-primary/60 text-white`}
              value={formData.timeLimit}
              onChange={handleInputChange}
            />
            {formErrors.timeLimit && (
              <p className="mt-1 text-sm text-red-400">{formErrors.timeLimit}</p>
            )}
          </div>
        </div>
        
        {/* Submit button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-3 bg-gradient-to-r from-quizverse-primary to-quizverse-secondary hover:from-quizverse-secondary hover:to-quizverse-primary text-white rounded-lg font-medium ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Saving...' : isEditing ? 'Update Question' : 'Add Question'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuestionForm;
