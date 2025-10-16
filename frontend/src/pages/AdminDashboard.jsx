import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import api from '../services/api';
import NotificationService from '../utils/notifications';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalDoctors: 0,
    totalCourses: 0,
    totalAppointments: 0,
    totalForumPosts: 0,
    pendingDoctorApprovals: 0,
    pendingCourseApprovals: 0
  });
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  useEffect(() => {
    if (isAdmin) {
      fetchDashboardData();
    }
  }, [isAdmin]);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/admin/dashboard');
      setDashboardData(response.data);
      setRecentUsers(response.data.recentUsers || []);
      setRecentAppointments(response.data.recentAppointments || []);
    } catch (error) {
      NotificationService.error('Failed to load admin dashboard data');
      console.error('Error fetching admin dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // ❌ If not admin → redirect to home or login
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100">
        <div className="h-12 w-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-4">
          <h1 className="text-2xl md:text-3xl font-bold text-indigo-700">Admin Dashboard</h1>
          <span className="text-sm md:text-base text-gray-600">Welcome, Admin</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[
            { title: 'Total Users', count: dashboardData.totalUsers, color: 'blue', desc: 'Registered users' },
            { title: 'Total Doctors', count: dashboardData.totalDoctors, color: 'green', desc: 'Verified doctors' },
            { title: 'Total Courses', count: dashboardData.totalCourses, color: 'yellow', desc: 'Educational materials' },
            { title: 'Appointments', count: dashboardData.totalAppointments, color: 'red', desc: 'Booked sessions' },
            { title: 'Forum Posts', count: dashboardData.totalForumPosts, color: 'purple', desc: 'Community posts' }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className={`text-3xl font-bold text-${item.color}-600`}>{item.count}</p>
              </div>
              <p className="text-sm text-gray-500 mt-2">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Pending Approvals */}
        <section className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Pending Approvals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              to="/admin/doctors"
              className="p-4 border border-blue-200 bg-blue-50 rounded-lg text-center hover:bg-blue-100 transition"
            >
              <div className="text-2xl">👨‍⚕️</div>
              <div className="font-medium text-blue-700">Doctors</div>
              <div className="text-lg font-bold">{dashboardData.pendingDoctorApprovals}</div>
            </Link>
            <Link
              to="/admin/courses"
              className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg text-center hover:bg-yellow-100 transition"
            >
              <div className="text-2xl">📚</div>
              <div className="font-medium text-yellow-700">Courses</div>
              <div className="text-lg font-bold">{dashboardData.pendingCourseApprovals}</div>
            </Link>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Users */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Users</h2>
            {recentUsers.length === 0 ? (
              <p className="text-gray-500 text-sm">No recent users</p>
            ) : (
              <div className="space-y-3">
                {recentUsers.map((user) => (
                  <div
                    key={user._id}
                    className="flex justify-between items-center border-b border-gray-200 pb-2"
                  >
                    <div>
                      <h3 className="font-medium text-gray-900">{user.username}</h3>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Appointments */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Appointments</h2>
            {recentAppointments.length === 0 ? (
              <p className="text-gray-500 text-sm">No recent appointments</p>
            ) : (
              <div className="space-y-3">
                {recentAppointments.map((appointment) => (
                  <div
                    key={appointment._id}
                    className="flex justify-between items-center border-b border-gray-200 pb-2"
                  >
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {appointment.patientId?.firstName} {appointment.patientId?.lastName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Dr. {appointment.doctorId?.userId?.firstName}{' '}
                        {appointment.doctorId?.userId?.lastName}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(appointment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
