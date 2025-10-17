import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'

// Public Pages
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

// User Module
import UserDashboard from './pages/user/UserDashboard'
import Journal from './pages/user/Journal'
import Chatbot from './pages/user/Chatbot'
import Assessment from './pages/user/Assessment'
import FindCare from './pages/user/FindCare'
import UserAppointments from './pages/user/UserAppointments'
import Profile from './pages/user/Profile'
import Resources from './pages/user/Resources'
import Progress from './pages/user/Progress'
import Emergency from './pages/user/Emergency'

// Doctor Module
import DoctorDashboard from './pages/doctor/DoctorDashboard'
import Availability from './pages/doctor/Availability'
import DoctorAppointments from './pages/doctor/DoctorAppointments'
import Patients from './pages/doctor/Patients'

// Hospital Module
import HospitalDashboard from './pages/hospital/HospitalDashboard'
import HospitalProfile from './pages/hospital/HospitalProfile'
import HospitalManageDoctors from './pages/hospital/ManageDoctors'
import Services from './pages/hospital/Services'

// Admin Module
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminManageDoctors from './pages/admin/ManageDoctors'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      
      // User Routes
      { path: 'user/dashboard', element: <UserDashboard /> },
      { path: 'user/journal', element: <Journal /> },
      { path: 'user/chatbot', element: <Chatbot /> },
      { path: 'user/assessment', element: <Assessment /> },
      { path: 'user/find-care', element: <FindCare /> },
      { path: 'user/appointments', element: <UserAppointments /> },
      { path: 'user/profile', element: <Profile /> },
      { path: 'user/resources', element: <Resources /> },
      { path: 'user/progress', element: <Progress /> },
      { path: 'user/emergency', element: <Emergency /> },
      
      // Doctor Routes
      { path: 'doctor/dashboard', element: <DoctorDashboard /> },
      { path: 'doctor/availability', element: <Availability /> },
      { path: 'doctor/appointments', element: <DoctorAppointments /> },
      { path: 'doctor/patients', element: <Patients /> },
      
      // Hospital Routes
      { path: 'hospital/dashboard', element: <HospitalDashboard /> },
      { path: 'hospital/profile', element: <HospitalProfile /> },
      { path: 'hospital/doctors', element: <HospitalManageDoctors /> },
      { path: 'hospital/services', element: <Services /> },
      
      // Admin Routes
      { path: 'admin/dashboard', element: <AdminDashboard /> },
      { path: 'admin/doctors', element: <AdminManageDoctors /> },
    ]
  },
  // Auth Routes (no navbar)
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> }
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
)
