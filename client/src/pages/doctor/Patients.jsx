import React, { useState, useEffect } from 'react';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Badge from '../../components/UI/Badge';
import Modal from '../../components/UI/Modal';
import Input from '../../components/UI/Input';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setFilteredPatients(
        patients.filter(patient =>
          patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          patient.id.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredPatients(patients);
    }
  }, [searchQuery, patients]);

  const fetchPatients = async () => {
    try {
      // API call would go here
      // Mock data
      setPatients([
        {
          id: 'P001',
          name: 'John Doe',
          age: 32,
          gender: 'Male',
          email: 'john.doe@email.com',
          phone: '+1 (555) 123-4567',
          totalSessions: 8,
          lastSession: '2024-10-18',
          nextAppointment: '2024-10-20',
          status: 'active',
          primaryConcern: 'Anxiety',
          aiSummary: {
            moodTrend: 'improving',
            recentMoods: ['Calm', 'Happy', 'Anxious', 'Calm', 'Happy'],
            keyInsights: [
              'Patient shows consistent improvement in anxiety management',
              'Coping strategies are being effectively implemented',
              'Sleep quality has improved significantly'
            ],
            recommendations: [
              'Continue current treatment plan',
              'Introduce advanced mindfulness techniques',
              'Schedule follow-up in 2 weeks'
            ]
          },
          recentJournals: [
            { date: '2024-10-17', mood: 'Happy', sentiment: 'positive' },
            { date: '2024-10-16', mood: 'Calm', sentiment: 'neutral' },
            { date: '2024-10-15', mood: 'Anxious', sentiment: 'negative' }
          ]
        },
        {
          id: 'P002',
          name: 'Jane Smith',
          age: 28,
          gender: 'Female',
          email: 'jane.smith@email.com',
          phone: '+1 (555) 234-5678',
          totalSessions: 3,
          lastSession: '2024-10-15',
          nextAppointment: '2024-10-20',
          status: 'active',
          primaryConcern: 'Depression',
          aiSummary: {
            moodTrend: 'stable',
            recentMoods: ['Sad', 'Neutral', 'Calm', 'Sad', 'Neutral'],
            keyInsights: [
              'New patient showing engagement with treatment',
              'Building rapport and trust',
              'Expressing emotions more openly'
            ],
            recommendations: [
              'Continue weekly sessions',
              'Encourage daily journaling',
              'Monitor for medication needs'
            ]
          }
        },
        {
          id: 'P003',
          name: 'Mike Johnson',
          age: 45,
          gender: 'Male',
          email: 'mike.j@email.com',
          phone: '+1 (555) 345-6789',
          totalSessions: 15,
          lastSession: '2024-10-17',
          nextAppointment: '2024-10-22',
          status: 'active',
          primaryConcern: 'Work Stress',
          aiSummary: {
            moodTrend: 'improving',
            recentMoods: ['Stressed', 'Calm', 'Happy', 'Calm', 'Happy'],
            keyInsights: [
              'Significant progress in stress management',
              'Work-life balance improving',
              'Using learned techniques effectively'
            ],
            recommendations: [
              'Consider reducing session frequency',
              'Focus on maintenance strategies',
              'Prepare for treatment conclusion'
            ]
          }
        }
      ]);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleViewDetails = (patient) => {
    setSelectedPatient(patient);
    setIsDetailsModalOpen(true);
  };

  const getMoodColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'success';
      case 'negative': return 'danger';
      case 'neutral': return 'warning';
      default: return 'default';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'improving':
        return (
          <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        );
      case 'declining':
        return (
          <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
          </svg>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            My Patients
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            View and manage your patient records with AI-powered insights
          </p>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent>
            <Input
              placeholder="Search by name or patient ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={(props) => (
                <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
            />
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total Patients</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">{patients.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Active Cases</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    {patients.filter(p => p.status === 'active').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total Sessions</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    {patients.reduce((sum, p) => sum + p.totalSessions, 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Patients List */}
        {filteredPatients.length > 0 ? (
          <div className="space-y-4">
            {filteredPatients.map((patient) => (
              <Card key={patient.id} hover>
                <CardContent>
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4 flex-1">
                      {/* Avatar */}
                      <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-blue-500 rounded-xl flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                        {patient.name.split(' ').map(n => n[0]).join('')}
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                              {patient.name}
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {patient.age} years • {patient.gender} • ID: {patient.id}
                            </p>
                          </div>
                          <Badge variant="success" size="sm">
                            {patient.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Primary Concern</p>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">{patient.primaryConcern}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Total Sessions</p>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">{patient.totalSessions}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Last Session</p>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">{patient.lastSession}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Next Appointment</p>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">{patient.nextAppointment}</p>
                          </div>
                        </div>

                        {/* AI Summary Preview */}
                        {patient.aiSummary && (
                          <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800 mb-3">
                            <div className="flex items-center gap-2 mb-2">
                              <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                              </svg>
                              <span className="text-sm font-medium text-purple-900 dark:text-purple-300">AI Insights</span>
                              <div className="flex items-center gap-1">
                                {getTrendIcon(patient.aiSummary.moodTrend)}
                                <span className="text-xs capitalize">{patient.aiSummary.moodTrend}</span>
                              </div>
                            </div>
                            <p className="text-sm text-purple-700 dark:text-purple-400">
                              {patient.aiSummary.keyInsights[0]}
                            </p>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleViewDetails(patient)}
                          >
                            View Full Profile
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.location.href = `/doctor/appointments?patient=${patient.id}`}
                          >
                            View Appointments
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  No patients found
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {searchQuery ? 'Try adjusting your search' : 'Your patient list will appear here'}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Patient Details Modal */}
        <Modal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          title="Patient Profile"
          size="lg"
        >
          {selectedPatient && (
            <div className="space-y-6">
              {/* Patient Info */}
              <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-blue-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                  {selectedPatient.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{selectedPatient.name}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {selectedPatient.age} years • {selectedPatient.gender} • ID: {selectedPatient.id}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {selectedPatient.email} • {selectedPatient.phone}
                  </p>
                </div>
              </div>

              {/* AI Summary */}
              {selectedPatient.aiSummary && (
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                  <div className="flex items-center gap-2 mb-4">
                    <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <h4 className="font-semibold text-purple-900 dark:text-purple-300">AI-Generated Insights</h4>
                    <div className="flex items-center gap-1 ml-auto">
                      {getTrendIcon(selectedPatient.aiSummary.moodTrend)}
                      <span className="text-sm capitalize">{selectedPatient.aiSummary.moodTrend}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h5 className="text-sm font-medium text-purple-900 dark:text-purple-300 mb-2">Key Insights</h5>
                      <ul className="space-y-1">
                        {selectedPatient.aiSummary.keyInsights.map((insight, index) => (
                          <li key={index} className="text-sm text-purple-700 dark:text-purple-400 flex items-start gap-2">
                            <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {insight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="text-sm font-medium text-purple-900 dark:text-purple-300 mb-2">Recommendations</h5>
                      <ul className="space-y-1">
                        {selectedPatient.aiSummary.recommendations.map((rec, index) => (
                          <li key={index} className="text-sm text-purple-700 dark:text-purple-400 flex items-start gap-2">
                            <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Recent Journal Entries */}
              {selectedPatient.recentJournals && (
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Recent Journal Entries</h4>
                  <div className="space-y-2">
                    {selectedPatient.recentJournals.map((journal, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                        <span className="text-sm text-slate-600 dark:text-slate-400">{journal.date}</span>
                        <Badge variant={getMoodColor(journal.sentiment)} size="sm">
                          {journal.mood}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 justify-end pt-4">
                <Button variant="ghost" onClick={() => setIsDetailsModalOpen(false)}>
                  Close
                </Button>
                <Button variant="primary" onClick={() => window.location.href = `/doctor/appointments?patient=${selectedPatient.id}`}>
                  Schedule Appointment
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Patients;
