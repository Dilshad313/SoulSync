import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import NotificationProvider from './components/common/NotificationProvider';
import PrivateRoute from './components/common/PrivateRoute';

// Import pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import DoctorsPage from './pages/DoctorsPage';
import AppointmentsPage from './pages/AppointmentsPage';
import PrescriptionsPage from './pages/PrescriptionsPage';
import AssessmentsPage from './pages/AssessmentsPage';
import JournalPage from './pages/JournalPage';
import ForumPage from './pages/ForumPage';
import CoursesPage from './pages/CoursesPage';
import ChatPage from './pages/ChatPage';
import NotFoundPage from './pages/NotFoundPage';
import TestSection from './pages/TestSection';

// Assessment sub-pages
import PHQ9Assessment from './pages/Assessments/PHQ9Assessment';
import AssessmentResult from './pages/Assessments/AssessmentResult';

// Admin pages
import AdminDashboard from './pages/AdminDashboard';
import AdminModule from './pages/AdminModule';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Private Routes - Patient */}
              <Route 
                path="/dashboard" 
                element={
                  <PrivateRoute allowedRoles={['patient', 'doctor', 'admin']}>
                    <DashboardPage />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <PrivateRoute allowedRoles={['patient', 'doctor', 'admin']}>
                    <ProfilePage />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/doctors" 
                element={
                  <PrivateRoute allowedRoles={['patient', 'doctor', 'admin']}>
                    <DoctorsPage />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/appointments" 
                element={
                  <PrivateRoute allowedRoles={['patient', 'doctor', 'admin']}>
                    <AppointmentsPage />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/prescriptions" 
                element={
                  <PrivateRoute allowedRoles={['patient', 'doctor', 'admin']}>
                    <PrescriptionsPage />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/assessments" 
                element={
                  <PrivateRoute allowedRoles={['patient', 'doctor', 'admin']}>
                    <AssessmentsPage />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/assessments/:type/take" 
                element={
                  <PrivateRoute allowedRoles={['patient', 'doctor', 'admin']}>
                    <PHQ9Assessment />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/assessments/:id" 
                element={
                  <PrivateRoute allowedRoles={['patient', 'doctor', 'admin']}>
                    <AssessmentResult />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/journal" 
                element={
                  <PrivateRoute allowedRoles={['patient', 'doctor', 'admin']}>
                    <JournalPage />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/forum" 
                element={
                  <PrivateRoute allowedRoles={['patient', 'doctor', 'admin']}>
                    <ForumPage />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/courses" 
                element={
                  <PrivateRoute allowedRoles={['patient', 'doctor', 'admin']}>
                    <CoursesPage />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/chat" 
                element={
                  <PrivateRoute allowedRoles={['patient', 'doctor', 'admin']}>
                    <ChatPage />
                  </PrivateRoute>
                } 
              />
              
              {/* Test Section Route */}
              <Route 
                path="/test" 
                element={
                  <PrivateRoute allowedRoles={['patient', 'doctor', 'admin']}>
                    <TestSection />
                  </PrivateRoute>
                } 
              />
              
              {/* Admin Routes */}
              <Route 
                path="/admin/dashboard" 
                element={
                  <PrivateRoute allowedRoles={["admin", "doctor", "patient"]}>
                    <AdminDashboard />
                  </PrivateRoute>
                }
              />
              <Route 
                path="/admin/module" 
                element={
                  <PrivateRoute allowedRoles={["admin", "doctor", "patient"]}>
                    <AdminModule />
                  </PrivateRoute>
                }
              />
              
              {/* 404 Route */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
