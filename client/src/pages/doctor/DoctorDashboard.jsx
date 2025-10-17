import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Badge from '../../components/UI/Badge';

const DoctorDashboard = () => {
  const [stats, setStats] = useState({});
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // API calls would go here
      // Mock data
      setStats({
        todayAppointments: 5,
        pendingRequests: 3,
        totalPatients: 47,
        upcomingThisWeek: 12
      });

      setTodayAppointments([
        {
          id: 1,
          patientName: 'John Doe',
          time: '10:00 AM',
          type: 'video',
          status: 'confirmed',
          reason: 'Anxiety management follow-up',
          videoLink: 'https://meet.soulsync.com/session-xyz789'
        },
        {
          id: 2,
          patientName: 'Jane Smith',
          time: '11:30 AM',
          type: 'in-person',
          status: 'confirmed',
          reason: 'Initial consultation'
        },
        {
          id: 3,
          patientName: 'Mike Johnson',
          time: '2:00 PM',
          type: 'video',
          status: 'confirmed',
          reason: 'Depression therapy session',
          videoLink: 'https://meet.soulsync.com/session-abc456'
        }
      ]);

      setPendingRequests([
        {
          id: 4,
          patientName: 'Sarah Williams',
          requestedDate: '2024-10-22',
          requestedTime: '3:00 PM',
          type: 'video',
          reason: 'Stress and burnout'
        },
        {
          id: 5,
          patientName: 'Tom Brown',
          requestedDate: '2024-10-23',
          requestedTime: '10:00 AM',
          type: 'in-person',
          reason: 'Relationship counseling'
        }
      ]);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  const handleAcceptRequest = async (requestId) => {
    try {
      await fetch(`/api/appointments/${requestId}/accept`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      setPendingRequests(pendingRequests.filter(req => req.id !== requestId));
      alert('Appointment request accepted!');
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      await fetch(`/api/appointments/${requestId}/reject`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      setPendingRequests(pendingRequests.filter(req => req.id !== requestId));
      alert('Appointment request rejected');
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  const handleStartConsultation = (videoLink) => {
    window.open(videoLink, '_blank');
  };

  const canStartConsultation = (time) => {
    // Logic to check if current time is within 15 minutes of appointment
    return true; // Simplified for demo
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
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Welcome, Dr. Johnson 👨‍⚕️
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Here's your practice overview for today
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white border-0">
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm mb-1">Today's Appointments</p>
                  <p className="text-3xl font-bold">{stats.todayAppointments}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">Pending Requests</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">{stats.pendingRequests}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">Total Patients</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">{stats.totalPatients}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">This Week</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">{stats.upcomingThisWeek}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Schedule */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Today's Schedule</CardTitle>
                  <CardDescription>Your appointments for today</CardDescription>
                </div>
                <Link to="/doctor/appointments">
                  <Button variant="ghost" size="sm">View All</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {todayAppointments.length > 0 ? (
                <div className="space-y-4">
                  {todayAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {appointment.patientName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-white">
                            {appointment.patientName}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {appointment.reason}
                          </p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                              {appointment.time}
                            </span>
                            <Badge variant={appointment.type === 'video' ? 'primary' : 'info'} size="sm">
                              {appointment.type === 'video' ? 'Video' : 'In-Person'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      {appointment.type === 'video' && canStartConsultation(appointment.time) && (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleStartConsultation(appointment.videoLink)}
                        >
                          Start Call
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-600 dark:text-slate-400">No appointments scheduled for today</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your practice</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Link to="/doctor/availability">
                  <Button variant="outline" fullWidth className="justify-start">
                    <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Manage Availability
                  </Button>
                </Link>
                
                <Link to="/doctor/patients">
                  <Button variant="outline" fullWidth className="justify-start">
                    <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    View Patients
                  </Button>
                </Link>
                
                <Link to="/doctor/profile">
                  <Button variant="outline" fullWidth className="justify-start">
                    <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Edit Profile
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Appointment Requests */}
        {pendingRequests.length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Pending Appointment Requests</CardTitle>
              <CardDescription>Review and respond to new appointment requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingRequests.map((request) => (
                  <div
                    key={request.id}
                    className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {request.patientName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white">
                          {request.patientName}
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {request.reason}
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            {request.requestedDate} at {request.requestedTime}
                          </span>
                          <Badge variant={request.type === 'video' ? 'primary' : 'info'} size="sm">
                            {request.type === 'video' ? 'Video' : 'In-Person'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleAcceptRequest(request.id)}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRejectRequest(request.id)}
                        className="text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                      >
                        Decline
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
