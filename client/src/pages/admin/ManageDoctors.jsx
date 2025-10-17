import React, { useState, useEffect } from 'react';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Badge from '../../components/UI/Badge';
import Modal from '../../components/UI/Modal';
import Input from '../../components/UI/Input';

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      // API call would go here
      setDoctors([
        {
          id: 1,
          name: 'Dr. Sarah Johnson',
          email: 'sarah.j@email.com',
          specialization: 'Clinical Psychologist',
          licenseNumber: 'PSY-12345',
          hospital: 'Serenity Wellness Center',
          status: 'verified',
          joinedDate: '2023-01-15',
          totalPatients: 45,
          rating: 4.9,
          documents: ['License', 'Degree', 'ID']
        },
        {
          id: 2,
          name: 'Dr. Michael Chen',
          email: 'michael.c@email.com',
          specialization: 'Psychiatrist',
          licenseNumber: 'PSY-67890',
          hospital: 'Mind & Body Clinic',
          status: 'pending',
          joinedDate: '2024-10-15',
          totalPatients: 0,
          rating: 0,
          documents: ['License', 'Degree']
        },
        {
          id: 3,
          name: 'Dr. Emily Rodriguez',
          email: 'emily.r@email.com',
          specialization: 'Family Therapist',
          licenseNumber: 'PSY-11111',
          hospital: 'Serenity Wellness Center',
          status: 'verified',
          joinedDate: '2022-11-10',
          totalPatients: 52,
          rating: 4.9,
          documents: ['License', 'Degree', 'ID', 'Certification']
        },
        {
          id: 4,
          name: 'Dr. James Wilson',
          email: 'james.w@email.com',
          specialization: 'Child Psychologist',
          licenseNumber: 'PSY-22222',
          hospital: 'Independent',
          status: 'suspended',
          joinedDate: '2023-06-20',
          totalPatients: 28,
          rating: 4.5,
          documents: ['License', 'Degree', 'ID']
        }
      ]);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleVerify = async (doctorId) => {
    try {
      await fetch(`/api/admin/doctors/${doctorId}/verify`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      setDoctors(doctors.map(doc =>
        doc.id === doctorId ? { ...doc, status: 'verified' } : doc
      ));
      alert('Doctor verified successfully!');
    } catch (error) {
      console.error('Error verifying doctor:', error);
    }
  };

  const handleSuspend = async (doctorId) => {
    if (!confirm('Are you sure you want to suspend this doctor?')) return;

    try {
      await fetch(`/api/admin/doctors/${doctorId}/suspend`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      setDoctors(doctors.map(doc =>
        doc.id === doctorId ? { ...doc, status: 'suspended' } : doc
      ));
      alert('Doctor suspended');
    } catch (error) {
      console.error('Error suspending doctor:', error);
    }
  };

  const handleDelete = async (doctorId) => {
    if (!confirm('Are you sure you want to delete this doctor? This action cannot be undone.')) return;

    try {
      await fetch(`/api/admin/doctors/${doctorId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      setDoctors(doctors.filter(doc => doc.id !== doctorId));
      alert('Doctor deleted successfully');
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'success';
      case 'pending': return 'warning';
      case 'suspended': return 'danger';
      default: return 'default';
    }
  };

  const filteredDoctors = doctors.filter(doctor => {
    const matchesFilter = filter === 'all' || doctor.status === filter;
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Manage Doctors
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Verify, manage, and monitor all doctors on the platform
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total Doctors</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">{doctors.length}</p>
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
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Verified</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    {doctors.filter(d => d.status === 'verified').length}
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
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Pending</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    {doctors.filter(d => d.status === 'pending').length}
                  </p>
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
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Suspended</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    {doctors.filter(d => d.status === 'suspended').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search by name, email, or specialization..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  icon={(props) => (
                    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  )}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filter === 'all' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setFilter('all')}
                >
                  All
                </Button>
                <Button
                  variant={filter === 'verified' ? 'success' : 'ghost'}
                  size="sm"
                  onClick={() => setFilter('verified')}
                >
                  Verified
                </Button>
                <Button
                  variant={filter === 'pending' ? 'warning' : 'ghost'}
                  size="sm"
                  onClick={() => setFilter('pending')}
                >
                  Pending
                </Button>
                <Button
                  variant={filter === 'suspended' ? 'danger' : 'ghost'}
                  size="sm"
                  onClick={() => setFilter('suspended')}
                >
                  Suspended
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Doctors List */}
        <div className="space-y-4">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id}>
              <CardContent>
                <div className="flex items-start justify-between">
                  <div className="flex gap-4 flex-1">
                    <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-blue-500 rounded-xl flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                      {doctor.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                            {doctor.name}
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {doctor.specialization}
                          </p>
                        </div>
                        <Badge variant={getStatusColor(doctor.status)} size="sm">
                          {doctor.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Email</p>
                          <p className="text-sm font-medium text-slate-900 dark:text-white">{doctor.email}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">License</p>
                          <p className="text-sm font-medium text-slate-900 dark:text-white">{doctor.licenseNumber}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Hospital</p>
                          <p className="text-sm font-medium text-slate-900 dark:text-white">{doctor.hospital}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Joined</p>
                          <p className="text-sm font-medium text-slate-900 dark:text-white">{doctor.joinedDate}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mb-4 text-sm text-slate-600 dark:text-slate-400">
                        <span>{doctor.totalPatients} patients</span>
                        {doctor.rating > 0 && (
                          <>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20">
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                              </svg>
                              <span>{doctor.rating}</span>
                            </div>
                          </>
                        )}
                        <span>•</span>
                        <span>{doctor.documents.length} documents</span>
                      </div>

                      <div className="flex gap-2">
                        {doctor.status === 'pending' && (
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() => handleVerify(doctor.id)}
                          >
                            Verify
                          </Button>
                        )}
                        {doctor.status === 'verified' && (
                          <Button
                            variant="warning"
                            size="sm"
                            onClick={() => handleSuspend(doctor.id)}
                          >
                            Suspend
                          </Button>
                        )}
                        {doctor.status === 'suspended' && (
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() => handleVerify(doctor.id)}
                          >
                            Reactivate
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedDoctor(doctor);
                            setIsDetailsModalOpen(true);
                          }}
                        >
                          View Details
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(doctor.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Details Modal */}
        <Modal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          title="Doctor Details"
          size="md"
        >
          {selectedDoctor && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{selectedDoctor.name}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{selectedDoctor.specialization}</p>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Email</p>
                  <p className="text-slate-900 dark:text-white">{selectedDoctor.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">License Number</p>
                  <p className="text-slate-900 dark:text-white">{selectedDoctor.licenseNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Affiliated Hospital</p>
                  <p className="text-slate-900 dark:text-white">{selectedDoctor.hospital}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Documents Submitted</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedDoctor.documents.map((doc, index) => (
                      <Badge key={index} variant="primary" size="sm">{doc}</Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <Button variant="ghost" onClick={() => setIsDetailsModalOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default ManageDoctors;
