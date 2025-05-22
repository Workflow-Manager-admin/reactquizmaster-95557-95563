import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QuizProvider } from './context/QuizContext';
import { AdminProvider } from './context/AdminContext';
import QuizContainer from './components/QuizContainer';
import AdminLogin from './components/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import QuestionsList from './components/admin/QuestionsList';
import QuestionForm from './components/admin/QuestionForm';
import AdminDashboard from './components/admin/AdminDashboard';

/**
 * Main App component that handles routing between the quiz and admin interfaces
 * and provides context providers for both sections
 */
function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/*" element={
            <AdminProvider>
              <Routes>
                <Route path="login" element={<AdminLogin />} />
                <Route path="dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
                <Route path="questions" element={<AdminLayout><QuestionsList /></AdminLayout>} />
                <Route path="questions/add" element={<AdminLayout><QuestionForm /></AdminLayout>} />
                <Route path="questions/edit/:id" element={<AdminLayout><QuestionForm /></AdminLayout>} />
                <Route path="" element={<Navigate to="/admin/login" replace />} />
              </Routes>
            </AdminProvider>
          } />
          
          {/* Quiz User Routes */}
          <Route path="/*" element={
            <>
              <nav className="navbar">
                <div className="container">
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <div className="logo">
                      <span className="logo-symbol">*</span> QuizVerse
                    </div>
                    <div>
                      <a href="/admin" className="text-sm text-white/70 hover:text-white">Admin Panel</a>
                    </div>
                  </div>
                </div>
              </nav>

              <main className="main-content">
                <QuizProvider>
                  <QuizContainer />
                </QuizProvider>
              </main>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;