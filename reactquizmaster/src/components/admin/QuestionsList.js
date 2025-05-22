import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AdminContext } from '../../context/AdminContext';
import { formatDifficulty } from '../../utils/adminUtils';

/**
 * QuestionsList component displays all questions in a table format
 * with options to edit or delete each question
 */
const QuestionsList = () => {
  const { questions, deleteQuestion, loading } = useContext(AdminContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  const [confirmDelete, setConfirmDelete] = useState(null);
  
  // Filter and sort questions when questions, searchTerm, or sortConfig changes
  useEffect(() => {
    // Filter questions based on search term
    const filtered = questions.filter(question => {
      const searchLower = searchTerm.toLowerCase();
      return (
        question.question.toLowerCase().includes(searchLower) ||
        question.category?.toLowerCase().includes(searchLower) ||
        question.difficulty?.toLowerCase().includes(searchLower)
      );
    });
    
    // Sort filtered questions
    const sortedQuestions = [...filtered].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    
    setFilteredQuestions(sortedQuestions);
  }, [questions, searchTerm, sortConfig]);
  
  // Handle sorting when a column header is clicked
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  // Handle question deletion
  const handleDeleteClick = (questionId) => {
    setConfirmDelete(questionId);
  };
  
  // Confirm question deletion
  const confirmDeleteQuestion = () => {
    if (confirmDelete) {
      deleteQuestion(confirmDelete);
      setConfirmDelete(null);
    }
  };
  
  // Cancel delete confirmation
  const cancelDelete = () => {
    setConfirmDelete(null);
  };
  
  // Helper function to render sort indicator
  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) {
      return null;
    }
    return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
  };
  
  // Render loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-white/70">Loading questions...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Questions</h1>
        <Link 
          to="/admin/questions/add"
          className="px-4 py-2 bg-quizverse-primary hover:bg-quizverse-primary/80 text-white rounded-lg flex items-center"
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
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Question
        </Link>
      </div>
      
      {/* Search and filter */}
      <div className="bg-white/5 p-4 rounded-lg border border-white/10">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg 
                  className="h-5 w-5 text-white/40" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill="currentColor" 
                  aria-hidden="true"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search questions..."
                className="w-full pl-10 pr-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-quizverse-primary/60 text-white placeholder-white/40"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <span className="py-2 px-1 text-white/60">
              {filteredQuestions.length} of {questions.length} questions
            </span>
          </div>
        </div>
      </div>
      
      {/* Questions table */}
      <div className="overflow-x-auto bg-white/5 rounded-lg border border-white/10">
        <table className="min-w-full divide-y divide-white/10">
          <thead>
            <tr>
              <th 
                onClick={() => requestSort('id')}
                className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider cursor-pointer hover:bg-white/5"
              >
                ID{getSortIndicator('id')}
              </th>
              <th 
                onClick={() => requestSort('question')}
                className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider cursor-pointer hover:bg-white/5"
              >
                Question{getSortIndicator('question')}
              </th>
              <th 
                onClick={() => requestSort('category')}
                className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider cursor-pointer hover:bg-white/5"
              >
                Category{getSortIndicator('category')}
              </th>
              <th 
                onClick={() => requestSort('difficulty')}
                className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider cursor-pointer hover:bg-white/5"
              >
                Difficulty{getSortIndicator('difficulty')}
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-white/70 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10 bg-black/10">
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map(question => (
                <tr key={question.id} className="hover:bg-white/5">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70">
                    {question.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-white">
                    <div className="line-clamp-2">{question.question}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70">
                    {question.category || 'General Knowledge'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                      ${question.difficulty === 'easy' ? 'bg-green-500/20 text-green-300' : 
                        question.difficulty === 'hard' ? 'bg-red-500/20 text-red-300' : 
                        'bg-yellow-500/20 text-yellow-300'}`
                      }
                    >
                      {formatDifficulty(question.difficulty)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Link 
                        to={`/admin/questions/edit/${question.id}`} 
                        className="text-quizverse-secondary hover:text-quizverse-primary"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(question.id)}
                        className="text-quizverse-accent hover:text-red-300"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-10 text-center text-white/50">
                  No questions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Delete confirmation modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-quizverse-dark p-6 rounded-lg max-w-md mx-auto border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4">Confirm Delete</h3>
            <p className="text-white/70 mb-6">
              Are you sure you want to delete this question? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteQuestion}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionsList;
