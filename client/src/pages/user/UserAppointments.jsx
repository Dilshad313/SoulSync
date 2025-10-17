import React, { useState, useEffect } from 'react';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Badge from '../../components/UI/Badge';
import Modal from '../../components/UI/Modal';

const UserAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      // API call would go here
      // Mock data
      setAppointments([
        {
          id: 1,
          doctorName: 'Dr. Sarah Johnson',
          specialty: 'Clinical Psychologist',
          date: '2024-10-20',
          time: '10:00 AM',
          type: 'video',
          status: 'confirmed',
          reason: 'Anxiety management and coping strategies',
          videoLink: 'https://meet.soulsync.com/session-abc123',
          notes: 'Please join 5 minutes early'
        },
        {
          id: 2,
          doctorName: 'Dr. Michael Chen',
          specialty: 'Psychiatrist',
          date: '2024-10-25',
          time: '2:30 PM',
          type: 'in-person',
          status: 'confirmed',
          reason: 'Medication review',
          address: '123 Wellness St, Suite 200, City, State 12345'
        },
        {
          id: 3,
          doctorName: 'Dr. Emily Rodriguez',
          specialty: 'Family Therapist',
          date: '2024-10-18',
          time: '3:00 PM',
          type: 'video',
          status: 'completed',
          reason: 'Family counseling session',
          summary: 'Discussed communication strategies and conflict resolution techniques.'
        },
        {
          id: 4,
          doctorName: 'Dr. James Wilson',
          specialty: 'Child Psychologist',
          date: '2024-10-15',
          time: '11:00 AM',
          type: 'in-person',
          status: 'completed',
          reason: 'Initial consultation',
          summary: 'Completed initial assessment. Recommended weekly sessions.'
        },
        {
          id: 5,
          doctorName: 'Dr. Sarah Johnson',
          specialty: 'Clinical Psychologist',
          date: '2024-10-12',
          time: '10:00 AM',
          type: 'video',
          status: 'cancelled',
          reason: 'Stress management',
          cancelReason: 'Rescheduled by patient'
        }
      ]);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setIsDetailsModalOpen(true);
  };

  const handleCancelAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setIsCancelModalOpen(true);
  };

  const confirmCancelAppointment = async () => {
    try {
      await fetch(`/api/appointments/${selectedAppointment.id}/cancel`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      // Update local state
      setAppointments(appointments.map(apt =>
        apt.id === selectedAppointment.id ? { ...apt, status: 'cancelled' } : apt
      ));

      setIsCancelModalOpen(false);
      alert('Appointment cancelled successfully');
    } catch (error) {
      console.error('Error cancelling appointment:', error);
    }
  };

  const handleJoinVideo = (videoLink) => {
    window.open(videoLink, '_blank');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'completed': return 'info';
      case 'cancelled': return 'danger';
      default: return 'default';
    }
  };

  const filterAppointments = () => {
    const now = new Date();
    
    switch (activeTab) {
      case 'upcoming':
        return appointments.filter(apt => {
          const aptDate = new Date(apt.date);
          return aptDate >= now && apt.status === 'confirmed';
        });
      case 'completed':
        return appointments.filter(apt => apt.status === 'completed');
      case 'cancelled':
        return appointments.filter(apt => apt.status === 'cancelled');
      default:
        return appointments;
    }
  };

  const filteredAppointments = filterAppointments();

  const canJoinVideo = (appointment) => {
    if (appointment.type !== 'video' || appointment.status !== 'confirmed') return false;
    
    const now = new Date();
    const aptDateTime = new Date(`${appointment.date} ${appointment.time}`);
    const timeDiff = (aptDateTime - now) / (1000 * 60); // difference in minutes
    
    // Can join 15 minutes before and up to 30 minutes after
    return timeDiff <= 15 && timeDiff >= -30;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            My Appointments
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage your scheduled consultations
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'upcoming'
                ? 'border-teal-500 text-teal-600 dark:text-teal-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'completed'
                ? 'border-teal-500 text-teal-600 dark:text-teal-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setActiveTab('cancelled')}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'cancelled'
                ? 'border-teal-500 text-teal-600 dark:text-teal-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Cancelled
          </button>
        </div>

        {/* Appointments List */}
        {filteredAppointments.length > 0 ? (
          <div className="space-y-4">
            {filteredAppointments.map((appointment) => (
              <Card key={appointment.id} hover>
                <CardContent>
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4 flex-1">
                      {/* Avatar */}
                      <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-blue-500 rounded-xl flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                        {appointment.doctorName.split(' ').map(n => n[0]).join('')}
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                              {appointment.doctorName}
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {appointment.specialty}
                            </p>
                          </div>
                          <Badge variant={getStatusColor(appointment.status)} size="sm">
                            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                          </Badge>
                        </div>

                        {/* Date & Time */}
                        <div className="flex items-center gap-4 mb-3 text-sm text-slate-600 dark:text-slate-400">
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {appointment.date}
                          </div>
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {appointment.time}
                          </div>
                          <Badge variant={appointment.type === 'video' ? 'primary' : 'info'} size="sm">
                            {appointment.type === 'video' ? 'Video Call' : 'In-Person'}
                          </Badge>
                        </div>

                        {/* Reason */}
                        <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
                          <strong>Reason:</strong> {appointment.reason}
                        </p>

                        {/* Actions */}
                        <div className="flex gap-2">
                          {canJoinVideo(appointment) && (
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => handleJoinVideo(appointment.videoLink)}
                              icon={(props) => (
                                <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                              )}
                            >
                              Join Video Call
                            </Button>
                          )}
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewDetails(appointment)}
                          >
                            View Details
                          </Button>

                          {appointment.status === 'confirmed' && !canJoinVideo(appointment) && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleCancelAppointment(appointment)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                            >
                              Cancel
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent>
              <div className="text-center py-12">
                <svg className="w-20 h-20 mx-auto text-slate-300 dark:text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  No {activeTab} appointments
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  {activeTab === 'upcoming' && "You don't have any upcoming appointments"}
                  {activeTab === 'completed' && "You haven't completed any appointments yet"}
                  {activeTab === 'cancelled' && "You don't have any cancelled appointments"}
                </p>
                {activeTab === 'upcoming' && (
                  <Button variant="primary" onClick={() => window.location.href = '/user/find-care'}>
                    Book an Appointment
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Details Modal */}
        <Modal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          title="Appointment Details"
          size="md"
        >
          {selectedAppointment && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-blue-500 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                  {selectedAppointment.doctorName.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    {selectedAppointment.doctorName}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {selectedAppointment.specialty}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Date & Time</p>
                  <p className="text-slate-900 dark:text-white">{selectedAppointment.date} at {selectedAppointment.time}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Type</p>
                  <Badge variant={selectedAppointment.type === 'video' ? 'primary' : 'info'}>
                    {selectedAppointment.type === 'video' ? 'Video Consultation' : 'In-Person Visit'}
                  </Badge>
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Status</p>
                  <Badge variant={getStatusColor(selectedAppointment.status)}>
                    {selectedAppointment.status.charAt(0).toUpperCase() + selectedAppointment.status.slice(1)}
                  </Badge>
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Reason for Visit</p>
                  <p className="text-slate-900 dark:text-white">{selectedAppointment.reason}</p>
                </div>

                {selectedAppointment.type === 'in-person' && selectedAppointment.address && (
                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Location</p>
                    <p className="text-slate-900 dark:text-white">{selectedAppointment.address}</p>
                  </div>
                )}

                {selectedAppointment.notes && (
                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Notes</p>
                    <p className="text-slate-900 dark:text-white">{selectedAppointment.notes}</p>
                  </div>
                )}

                {selectedAppointment.summary && (
                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Session Summary</p>
                    <p className="text-slate-900 dark:text-white">{selectedAppointment.summary}</p>
                  </div>
                )}
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <Button variant="ghost" onClick={() => setIsDetailsModalOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </Modal>

        {/* Cancel Confirmation Modal */}
        <Modal
          isOpen={isCancelModalOpen}
          onClose={() => setIsCancelModalOpen(false)}
          title="Cancel Appointment"
          size="sm"
        >
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-300">
              Are you sure you want to cancel this appointment? This action cannot be undone.
            </p>
            
            <div className="flex gap-3 justify-end pt-4">
              <Button variant="ghost" onClick={() => setIsCancelModalOpen(false)}>
                Keep Appointment
              </Button>
              <Button variant="danger" onClick={confirmCancelAppointment}>
                Yes, Cancel
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default UserAppointments;
