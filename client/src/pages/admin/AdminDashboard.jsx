import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Badge from '../../components/UI/Badge';

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [pendingVerifications, setPendingVerifications] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [trendData, setTrendData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // API calls would go here
      // Mock data
      setStats({
        totalUsers: 1247,
        totalDoctors: 89,
        totalHospitals: 23,
        totalAppointments: 3456,
        activeUsers: 892,
        pendingVerifications: 12,
        monthlyRevenue: 125400,
        growthRate: 23.5
      });

      setPendingVerifications([
        {
          id: 1,
          type: 'doctor',
          name: 'Dr. James Wilson',
          specialization: 'Child Psychologist',
          licenseNumber: 'PSY-12345',
          submittedDate: '2024-10-18',
          documents: 3
        },
        {
          id: 2,
          type: 'hospital',
          name: 'Serenity Wellness Center',
          location: 'New York, NY',
          submittedDate: '2024-10-17',
          documents: 5
        },
        {
          id: 3,
          type: 'doctor',
          name: 'Dr. Lisa Anderson',
          specialization: 'Psychiatrist',
          licenseNumber: 'PSY-67890',
          submittedDate: '2024-10-16',
          documents: 4
        }
      ]);

      setRecentActivity([
        { type: 'user', message: 'New user registration: John Doe', time: '5 minutes ago' },
        { type: 'appointment', message: '156 appointments completed today', time: '1 hour ago' },
        { type: 'doctor', message: 'Dr. Sarah Johnson updated profile', time: '2 hours ago' },
        { type: 'content', message: 'New article published: Managing Anxiety', time: '3 hours ago' }
      ]);

      setTrendData({
        userGrowth: [
          { month: 'Jun', users: 850 },
          { month: 'Jul', users: 920 },
          { month: 'Aug', users: 1050 },
          { month: 'Sep', users: 1150 },
          { month: 'Oct', users: 1247 }
        ],
        topConcerns: [
          { concern: 'Anxiety', count: 456, percentage: 36.5 },
          { concern: 'Depression', count: 342, percentage: 27.4 },
          { concern: 'Stress', count: 298, percentage: 23.9 },
          { concern: 'Sleep Issues', count: 151, percentage: 12.1 }
        ]
      });

      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  const handleApprove = async (id, type) => {
    try {
      await fetch(`/api/admin/verify/${type}/${id}/approve`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      setPendingVerifications(pendingVerifications.filter(item => item.id !== id));
      alert(`${type.charAt(0).toUpperCase() + type.slice(1)} approved successfully!`);
    } catch (error) {
      console.error('Error approving:', error);
    }
  };

  const handleReject = async (id, type) => {
    try {
      await fetch(`/api/admin/verify/${type}/${id}/reject`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      setPendingVerifications(pendingVerifications.filter(item => item.id !== id));
      alert(`${type.charAt(0).toUpperCase() + type.slice(1)} rejected`);
    } catch (error) {
      console.error('Error rejecting:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Admin Dashboard 👨‍💼
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            System overview and management
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white border-0">
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm mb-1">Total Users</p>
                  <p className="text-3xl font-bold">{stats.totalUsers.toLocaleString()}</p>
                  <p className="text-xs text-blue-100 mt-1">+{stats.growthRate}% this month</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">Doctors</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">{stats.totalDoctors}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">Hospitals</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">{stats.totalHospitals}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">Appointments</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">{stats.totalAppointments.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Link to="/admin/doctors">
            <Card hover className="text-center cursor-pointer">
              <CardContent>
                <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Manage Doctors</h3>
              </CardContent>
            </Card>
          </Link>

          <Link to="/admin/hospitals">
            <Card hover className="text-center cursor-pointer">
              <CardContent>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Manage Hospitals</h3>
              </CardContent>
            </Card>
          </Link>

          <Link to="/admin/content">
            <Card hover className="text-center cursor-pointer">
              <CardContent>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Content Library</h3>
              </CardContent>
            </Card>
          </Link>

          <Link to="/admin/reports">
            <Card hover className="text-center cursor-pointer">
              <CardContent>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Analytics & Reports</h3>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Verifications */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Pending Verifications</CardTitle>
                  <CardDescription>Review and approve new registrations</CardDescription>
                </div>
                <Badge variant="warning">{pendingVerifications.length}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              {pendingVerifications.length > 0 ? (
                <div className="space-y-4">
                  {pendingVerifications.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-slate-900 dark:text-white">
                              {item.name}
                            </h4>
                            <Badge variant={item.type === 'doctor' ? 'primary' : 'info'} size="sm">
                              {item.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {item.specialization || item.location}
                          </p>
                          {item.licenseNumber && (
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                              License: {item.licenseNumber}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-3">
                        <span>Submitted: {item.submittedDate}</span>
                        <span>{item.documents} documents</span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => handleApprove(item.id, item.type)}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleReject(item.id, item.type)}
                        >
                          Reject
                        </Button>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-600 dark:text-slate-400">No pending verifications</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Top Mental Health Concerns */}
          <Card>
            <CardHeader>
              <CardTitle>Top Mental Health Concerns</CardTitle>
              <CardDescription>Based on user assessments and journals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trendData.topConcerns?.map((concern, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                        {concern.concern}
                      </span>
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        {concern.count} users ({concern.percentage}%)
                      </span>
                    </div>
                    <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-teal-500 to-blue-500 rounded-full transition-all"
                        style={{ width: `${concern.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>System-wide updates and changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    activity.type === 'user' ? 'bg-blue-100 dark:bg-blue-900/30' :
                    activity.type === 'appointment' ? 'bg-green-100 dark:bg-green-900/30' :
                    activity.type === 'doctor' ? 'bg-purple-100 dark:bg-purple-900/30' :
                    'bg-orange-100 dark:bg-orange-900/30'
                  }`}>
                    <svg className={`w-5 h-5 ${
                      activity.type === 'user' ? 'text-blue-600 dark:text-blue-400' :
                      activity.type === 'appointment' ? 'text-green-600 dark:text-green-400' :
                      activity.type === 'doctor' ? 'text-purple-600 dark:text-purple-400' :
                      'text-orange-600 dark:text-orange-400'
                    }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-900 dark:text-white">{activity.message}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
