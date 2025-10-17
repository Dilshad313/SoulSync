import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Badge from '../../components/UI/Badge';
import Modal from '../../components/UI/Modal';
import { TextArea } from '../../components/UI/Input';

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState('today');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [sessionNotes, setSessionNotes] = useState('');
  const [loading, setLoading] = useState(false);

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
          patientName: 'John Doe',
          patientId: 'P001',
          date: '2024-10-20',
          time: '10:00 AM',
          type: 'video',
          status: 'confirmed',
          reason: 'Anxiety management follow-up',
          videoLink: 'https://meet.soulsync.com/session-xyz789',
          notes: 'Patient has shown improvement in coping strategies.'
        },
        {
          id: 2,
          patientName: 'Jane Smith',
          patientId: 'P002',
          date: '2024-10-20',
          time: '11:30 AM',
          type: 'in-person',
          status: 'confirmed',
          reason: 'Initial consultation',
          address: '123 Wellness St, Suite 200'
        },
        {
          id: 3,
          patientName: 'Mike Johnson',
          patientId: 'P003',
          date: '2024-10-20',
          time: '2:00 PM',
          type: 'video',
          status: 'confirmed',
          reason: 'Depression therapy session',
          videoLink: 'https://meet.soulsync.com/session-abc456'
        },
        {
          id: 4,
          patientName: 'Sarah Williams',
          patientId: 'P004',
          date: '2024-10-21',
          time: '3:00 PM',
          type: 'video',
          status: 'pending',
          reason: 'Stress and burnout'
        },
        {
          id: 5,
          patientName: 'Tom Brown',
          patientId: 'P005',
          date: '2024-10-18',
          time: '10:00 AM',
          type: 'in-person',
          status: 'completed',
          reason: 'Relationship counseling',
          summary: 'Discussed communication patterns. Assigned homework exercises.'
        }
      ]);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleStartConsultation = (videoLink) => {
    window.open(videoLink, '_blank');
  };

  const handleCompleteSession = (appointment) => {
    setSelectedAppointment(appointment);
    setSessionNotes(appointment.notes || '');
    setIsNotesModalOpen(true);
  };

  const handleSaveNotes = async () => {
    setLoading(true);
    try {
      // Use mock API service
      await api.completeSession(selectedAppointment.id, sessionNotes);

      setAppointments(appointments.map(apt =>
        apt.id === selectedAppointment.id
          ? { ...apt, status: 'completed', summary: sessionNotes }
          : apt
      ));

      setIsNotesModalOpen(false);
      alert('Session completed successfully!');
    } catch (error) {
      console.error('Error saving notes:', error);
      alert('Failed to save notes');
    }
    setLoading(false);
  };

  const handleAccept = async (appointmentId) => {
    try {
      await fetch(`/api/appointments/${appointmentId}/accept`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      setAppointments(appointments.map(apt =>
        apt.id === appointmentId ? { ...apt, status: 'confirmed' } : apt
      ));
      alert('Appointment accepted!');
    } catch (error) {
      console.error('Error accepting appointment:', error);
    }
  };

  const handleReject = async (appointmentId) => {
    try {
      await fetch(`/api/appointments/${appointmentId}/reject`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      setAppointments(appointments.filter(apt => apt.id !== appointmentId));
      alert('Appointment rejected');
    } catch (error) {
      console.error('Error rejecting appointment:', error);
    }
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
    const today = new Date().toISOString().split('T')[0];
    
    switch (activeTab) {
      case 'today':
        return appointments.filter(apt => apt.date === today && apt.status !== 'completed');
      case 'upcoming':
        return appointments.filter(apt => apt.date > today && apt.status === 'confirmed');
      case 'pending':
        return appointments.filter(apt => apt.status === 'pending');
      case 'completed':
        return appointments.filter(apt => apt.status === 'completed');
      default:
        return appointments;
    }
  };

  const filteredAppointments = filterAppointments();

  const canStartConsultation = (time) => {
    // Simplified - in production, check actual time
    return true;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Appointments
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage your patient appointments
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-slate-200 dark:border-slate-700 overflow-x-auto">
          <button
            onClick={() => setActiveTab('today')}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'today'
                ? 'border-teal-500 text-teal-600 dark:text-teal-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'upcoming'
                ? 'border-teal-500 text-teal-600 dark:text-teal-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'pending'
                ? 'border-teal-500 text-teal-600 dark:text-teal-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Pending Requests
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'completed'
                ? 'border-teal-500 text-teal-600 dark:text-teal-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Completed
          </button>
        </div>

        {/* Appointments List */}
        {filteredAppointments.length > 0 ? (
          <div className="space-y-4">
            {filteredAppointments.map((appointment) => (
              <Card key={appointment.id}>
                <CardContent>
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4 flex-1">
                      {/* Avatar */}
                      <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-blue-500 rounded-xl flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                        {appointment.patientName.split(' ').map(n => n[0]).join('')}
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                              {appointment.patientName}
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              Patient ID: {appointment.patientId}
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

                        {/* Summary for completed */}
                        {appointment.summary && (
                          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 mb-3">
                            <p className="text-sm text-blue-900 dark:text-blue-300">
                              <strong>Session Summary:</strong> {appointment.summary}
                            </p>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-2 flex-wrap">
                          {appointment.status === 'pending' && (
                            <>
                              <Button
                                variant="success"
                                size="sm"
                                onClick={() => handleAccept(appointment.id)}
                              >
                                Accept
                              </Button>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleReject(appointment.id)}
                              >
                                Decline
                              </Button>
                            </>
                          )}

                          {appointment.status === 'confirmed' && appointment.type === 'video' && canStartConsultation(appointment.time) && (
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => handleStartConsultation(appointment.videoLink)}
                              icon={(props) => (
                                <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                              )}
                            >
                              Start Consultation
                            </Button>
                          )}

                          {appointment.status === 'confirmed' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCompleteSession(appointment)}
                            >
                              Complete Session
                            </Button>
                          )}

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.location.href = `/doctor/patients/${appointment.patientId}`}
                          >
                            View Patient Profile
                          </Button>
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
                  No appointments found
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {activeTab === 'today' && "You don't have any appointments scheduled for today"}
                  {activeTab === 'upcoming' && "No upcoming appointments"}
                  {activeTab === 'pending' && "No pending appointment requests"}
                  {activeTab === 'completed' && "No completed appointments"}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Session Notes Modal */}
        <Modal
          isOpen={isNotesModalOpen}
          onClose={() => setIsNotesModalOpen(false)}
          title="Complete Session"
          size="md"
        >
          {selectedAppointment && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Patient</p>
                <p className="font-semibold text-slate-900 dark:text-white">
                  {selectedAppointment.patientName}
                </p>
              </div>

              <TextArea
                label="Session Notes"
                placeholder="Enter session summary, observations, and next steps..."
                value={sessionNotes}
                onChange={(e) => setSessionNotes(e.target.value)}
                rows={8}
                required
                helperText="These notes will be saved to the patient's record"
              />

              <div className="flex gap-3 justify-end pt-4">
                <Button
                  variant="ghost"
                  onClick={() => setIsNotesModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSaveNotes}
                  loading={loading}
                  disabled={loading || !sessionNotes.trim()}
                >
                  Complete Session
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default DoctorAppointments;
