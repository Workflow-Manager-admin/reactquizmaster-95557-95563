import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AdminContext } from '../../context/AdminContext';

/**
 * AdminDashboard component displays dashboard with statistics and quick actions
 */
const AdminDashboard = () => {
  const { questions, loading } = useContext(AdminContext);
  
  // Calculate statistics
  const totalQuestions = questions.length;
  
  // Group questions by difficulty
  const difficultyCount = questions.reduce((acc, question) => {
    const difficulty = question.difficulty || 'medium';
    acc[difficulty] = (acc[difficulty] || 0) + 1;
    return acc;
  }, {});
  
  // Group questions by category
  const categoryCounts = questions.reduce((acc, question) => {
    const category = question.category || 'General Knowledge';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});
  
  // Sort categories by count
  const sortedCategories = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5); // Top 5 categories
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-white/70">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
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
      
      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/5 p-6 rounded-lg border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white/70">Total Questions</p>
              <p className="text-3xl font-bold text-white">{totalQuestions}</p>
            </div>
            <div className="p-3 bg-quizverse-primary/20 rounded-full">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 text-quizverse-primary" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <Link 
              to="/admin/questions" 
              className="text-sm text-quizverse-secondary hover:text-quizverse-primary"
            >
              View all questions →
            </Link>
          </div>
        </div>
        
        <div className="bg-white/5 p-6 rounded-lg border border-white/10">
          <p className="text-sm font-medium text-white/70">Questions by Difficulty</p>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-white/70">Easy</span>
              <span className="text-sm font-medium text-white">{difficultyCount.easy || 0}</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ width: `${(difficultyCount.easy || 0) / totalQuestions * 100}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-white/70">Medium</span>
              <span className="text-sm font-medium text-white">{difficultyCount.medium || 0}</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className="bg-yellow-500 h-2 rounded-full" 
                style={{ width: `${(difficultyCount.medium || 0) / totalQuestions * 100}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-white/70">Hard</span>
              <span className="text-sm font-medium text-white">{difficultyCount.hard || 0}</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className="bg-red-500 h-2 rounded-full" 
                style={{ width: `${(difficultyCount.hard || 0) / totalQuestions * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 p-6 rounded-lg border border-white/10">
          <p className="text-sm font-medium text-white/70">Top Categories</p>
          <div className="mt-4 space-y-3">
            {sortedCategories.length > 0 ? (
              sortedCategories.map(([category, count]) => (
                <div key={category} className="flex justify-between items-center">
                  <span className="text-sm text-white/90 truncate">{category}</span>
                  <span className="text-sm font-medium text-white">{count}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-white/50">No categories found</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Quick actions */}
      <div className="bg-white/5 p-6 rounded-lg border border-white/10">
        <h2 className="text-lg font-medium text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link 
            to="/admin/questions/add" 
            className="flex items-center p-4 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10"
          >
            <div className="p-2 bg-quizverse-primary/20 rounded-full mr-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 text-quizverse-primary" 
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
            </div>
            <div>
              <p className="text-sm font-medium text-white">Add New Question</p>
              <p className="text-xs text-white/50">Create a new quiz question</p>
            </div>
          </Link>
          
          <Link 
            to="/admin/questions" 
            className="flex items-center p-4 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10"
          >
            <div className="p-2 bg-quizverse-secondary/20 rounded-full mr-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 text-quizverse-secondary" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 10h16M4 14h16M4 18h16" 
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-white">Manage Questions</p>
              <p className="text-xs text-white/50">Edit or delete questions</p>
            </div>
          </Link>
          
          <a 
            href="/" 
            className="flex items-center p-4 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10"
          >
            <div className="p-2 bg-quizverse-accent/20 rounded-full mr-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 text-quizverse-accent" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" 
                />
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-white">Preview Quiz</p>
              <p className="text-xs text-white/50">See the user experience</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
