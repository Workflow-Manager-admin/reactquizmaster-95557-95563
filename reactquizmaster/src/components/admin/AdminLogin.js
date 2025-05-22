import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../../context/AdminContext';

/**
 * AdminLogin component provides a login form for administrators
 */
const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const { login, isAuthenticated, authError } = useContext(AdminContext);
  const navigate = useNavigate();

  // If already authenticated, redirect to admin dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');
    
    // Basic form validation
    if (!username.trim()) {
      setFormError('Username is required');
      return;
    }
    if (!password.trim()) {
      setFormError('Password is required');
      return;
    }
    
    // Attempt login
    const loginSuccess = login(username, password);
    if (loginSuccess) {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-quizverse-dark to-quizverse-primary/30">
      <div className="w-full max-w-md p-8 space-y-8 bg-white/5 backdrop-blur-lg rounded-lg shadow-lg border border-white/10">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">QuizVerse Admin</h1>
          <p className="text-gray-300">Sign in to manage quiz questions</p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {(formError || authError) && (
            <div className="bg-red-500/20 border border-red-500/50 text-white p-3 rounded-md text-sm">
              {formError || authError}
            </div>
          )}
          
          <div>
            <label htmlFor="username" className="sr-only">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-600 placeholder-gray-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-quizverse-primary/60 bg-gray-800/60"
              placeholder="Username"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-600 placeholder-gray-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-quizverse-primary/60 bg-gray-800/60"
              placeholder="Password"
            />
          </div>
          
          <div className="flex items-center justify-center">
            <div className="text-sm">
              <p className="text-gray-400">
                Default credentials: admin / password123
              </p>
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-r from-quizverse-primary to-quizverse-secondary hover:from-quizverse-secondary hover:to-quizverse-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-quizverse-primary"
            >
              Sign in
            </button>
          </div>
        </form>
        
        <div className="text-center mt-6">
          <a href="/" className="text-sm text-quizverse-secondary hover:text-quizverse-primary">
            Return to Quiz
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
