import React, { useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AdminContext } from '../../context/AdminContext';

/**
 * AdminLayout provides a consistent layout structure for all admin pages
 */
const AdminLayout = ({ children }) => {
  const { isAuthenticated, logout } = useContext(AdminContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if user is authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);
  
  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };
  
  // If not authenticated, don't render anything
  if (!isAuthenticated) return null;
  
  // Helper function to check if a link is active
  const isActiveLink = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-quizverse-dark to-[#2A2A5E]">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/admin/dashboard" className="text-xl font-bold text-white flex items-center">
              <span className="text-quizverse-primary mr-2">*</span>
              QuizVerse Admin
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-sm text-white/70 hover:text-white">
              View Quiz
            </Link>
            <button 
              onClick={handleLogout}
              className="text-sm text-white/70 hover:text-white"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <nav className="w-64 bg-black/20 border-r border-white/10 overflow-y-auto">
          <div className="p-4">
            <ul className="space-y-2">
              <li>
                <Link
                  to="/admin/dashboard"
                  className={`flex items-center px-4 py-3 rounded-lg ${
                    isActiveLink('/admin/dashboard')
                      ? 'bg-quizverse-primary/20 text-white border-l-4 border-quizverse-primary'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 mr-3" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
                    />
                  </svg>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/questions"
                  className={`flex items-center px-4 py-3 rounded-lg ${
                    isActiveLink('/admin/questions')
                      ? 'bg-quizverse-primary/20 text-white border-l-4 border-quizverse-primary'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 mr-3" 
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
                  Questions
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="container mx-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
