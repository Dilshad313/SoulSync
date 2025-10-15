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
import CabBookingPage from './pages/CabBookingPage';
import NotFoundPage from './pages/NotFoundPage';

// Assessment sub-pages
import PHQ9Assessment from './pages/Assessments/PHQ9Assessment';
import AssessmentResult from './pages/Assessments/AssessmentResult';

// Doctor-specific pages
import DoctorDashboard from './pages/DoctorDashboard';
import DoctorProfile from './pages/DoctorProfile';
import DoctorAppointments from './pages/DoctorAppointments';

// Hospital-specific pages
import HospitalDashboard from './pages/HospitalDashboard';
import HospitalProfile from './pages/HospitalProfile';

// Admin pages
import AdminDashboard from './pages/AdminDashboard';

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
                  <PrivateRoute allowedRoles={['patient', 'doctor', 'hospital', 'admin']}>
                    <DashboardPage />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <PrivateRoute allowedRoles={['patient', 'doctor', 'hospital', 'admin']}>
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
                  <PrivateRoute allowedRoles={['patient', 'doctor', 'hospital', 'admin']}>
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
              <Route 
                path="/cab-booking" 
                element={
                  <PrivateRoute allowedRoles={['patient', 'doctor', 'admin']}>
                    <CabBookingPage />
                  </PrivateRoute>
                } 
              />
              
              {/* Doctor Routes */}
              <Route 
                path="/doctor/dashboard" 
                element={
                  <PrivateRoute allowedRoles={['doctor', 'admin']}>
                    <DoctorDashboard />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/doctor/profile" 
                element={
                  <PrivateRoute allowedRoles={['doctor', 'admin']}>
                    <DoctorProfile />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/doctor/appointments" 
                element={
                  <PrivateRoute allowedRoles={['doctor', 'admin']}>
                    <DoctorAppointments />
                  </PrivateRoute>
                } 
              />
              
              {/* Hospital Routes */}
              <Route 
                path="/hospital/dashboard" 
                element={
                  <PrivateRoute allowedRoles={['hospital', 'admin']}>
                    <HospitalDashboard />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/hospital/profile" 
                element={
                  <PrivateRoute allowedRoles={['hospital', 'admin']}>
                    <HospitalProfile />
                  </PrivateRoute>
                } 
              />
              
              {/* Admin Routes */}
              <Route 
                path="/admin/dashboard" 
                element={
                  <PrivateRoute allowedRoles={['admin']}>
                    <AdminDashboard />
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
