import React, { useState, useEffect } from 'react';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Badge from '../../components/UI/Badge';
import Modal from '../../components/UI/Modal';
import Input, { Select } from '../../components/UI/Input';

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    email: '',
    specialization: '',
    licenseNumber: '',
    phone: '',
    status: 'active'
  });
  const [loading, setLoading] = useState(false);

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
          email: 'sarah.j@hospital.com',
          specialization: 'Clinical Psychologist',
          licenseNumber: 'PSY-12345',
          phone: '+1 (555) 111-2222',
          status: 'active',
          joinedDate: '2023-01-15',
          totalPatients: 45,
          totalAppointments: 234
        },
        {
          id: 2,
          name: 'Dr. Michael Chen',
          email: 'michael.c@hospital.com',
          specialization: 'Psychiatrist',
          licenseNumber: 'PSY-67890',
          phone: '+1 (555) 333-4444',
          status: 'active',
          joinedDate: '2023-03-20',
          totalPatients: 38,
          totalAppointments: 189
        },
        {
          id: 3,
          name: 'Dr. Emily Rodriguez',
          email: 'emily.r@hospital.com',
          specialization: 'Family Therapist',
          licenseNumber: 'PSY-11111',
          phone: '+1 (555) 555-6666',
          status: 'inactive',
          joinedDate: '2022-11-10',
          totalPatients: 52,
          totalAppointments: 298
        }
      ]);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleAddDoctor = async () => {
    setLoading(true);
    try {
      await fetch('/api/hospital/doctors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(newDoctor)
      });

      alert('Doctor added successfully!');
      setIsAddModalOpen(false);
      setNewDoctor({
        name: '',
        email: '',
        specialization: '',
        licenseNumber: '',
        phone: '',
        status: 'active'
      });
      fetchDoctors();
    } catch (error) {
      console.error('Error adding doctor:', error);
      alert('Failed to add doctor');
    }
    setLoading(false);
  };

  const handleEditDoctor = async () => {
    setLoading(true);
    try {
      await fetch(`/api/hospital/doctors/${selectedDoctor.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(selectedDoctor)
      });

      alert('Doctor updated successfully!');
      setIsEditModalOpen(false);
      fetchDoctors();
    } catch (error) {
      console.error('Error updating doctor:', error);
      alert('Failed to update doctor');
    }
    setLoading(false);
  };

  const handleToggleStatus = async (doctorId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    try {
      await fetch(`/api/hospital/doctors/${doctorId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      setDoctors(doctors.map(doc =>
        doc.id === doctorId ? { ...doc, status: newStatus } : doc
      ));
      alert(`Doctor ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully!`);
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  const handleRemoveDoctor = async (doctorId) => {
    if (!confirm('Are you sure you want to remove this doctor?')) return;

    try {
      await fetch(`/api/hospital/doctors/${doctorId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      setDoctors(doctors.filter(doc => doc.id !== doctorId));
      alert('Doctor removed successfully!');
    } catch (error) {
      console.error('Error removing doctor:', error);
      alert('Failed to remove doctor');
    }
  };

  const specializationOptions = [
    { value: 'clinical-psychologist', label: 'Clinical Psychologist' },
    { value: 'psychiatrist', label: 'Psychiatrist' },
    { value: 'family-therapist', label: 'Family Therapist' },
    { value: 'child-psychologist', label: 'Child Psychologist' },
    { value: 'counselor', label: 'Counselor' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Manage Doctors
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Add and manage affiliated doctors
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => setIsAddModalOpen(true)}
            icon={(props) => (
              <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            )}
          >
            Add Doctor
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Active Doctors</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    {doctors.filter(d => d.status === 'active').length}
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
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total Patients</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    {doctors.reduce((sum, d) => sum + d.totalPatients, 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Doctors List */}
        <div className="space-y-4">
          {doctors.map((doctor) => (
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
                        <Badge variant={doctor.status === 'active' ? 'success' : 'default'} size="sm">
                          {doctor.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Email</p>
                          <p className="text-sm font-medium text-slate-900 dark:text-white">{doctor.email}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Phone</p>
                          <p className="text-sm font-medium text-slate-900 dark:text-white">{doctor.phone}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">License</p>
                          <p className="text-sm font-medium text-slate-900 dark:text-white">{doctor.licenseNumber}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Joined</p>
                          <p className="text-sm font-medium text-slate-900 dark:text-white">{doctor.joinedDate}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mb-4 text-sm text-slate-600 dark:text-slate-400">
                        <span>{doctor.totalPatients} patients</span>
                        <span>•</span>
                        <span>{doctor.totalAppointments} appointments</span>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedDoctor(doctor);
                            setIsEditModalOpen(true);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant={doctor.status === 'active' ? 'ghost' : 'success'}
                          size="sm"
                          onClick={() => handleToggleStatus(doctor.id, doctor.status)}
                        >
                          {doctor.status === 'active' ? 'Deactivate' : 'Activate'}
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleRemoveDoctor(doctor.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Doctor Modal */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add New Doctor"
          size="md"
        >
          <div className="space-y-4">
            <Input
              label="Full Name"
              value={newDoctor.name}
              onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
              required
            />
            <Input
              label="Email"
              type="email"
              value={newDoctor.email}
              onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })}
              required
            />
            <Input
              label="Phone"
              type="tel"
              value={newDoctor.phone}
              onChange={(e) => setNewDoctor({ ...newDoctor, phone: e.target.value })}
              required
            />
            <Select
              label="Specialization"
              value={newDoctor.specialization}
              onChange={(e) => setNewDoctor({ ...newDoctor, specialization: e.target.value })}
              options={specializationOptions}
              required
            />
            <Input
              label="License Number"
              value={newDoctor.licenseNumber}
              onChange={(e) => setNewDoctor({ ...newDoctor, licenseNumber: e.target.value })}
              required
            />

            <div className="flex gap-3 justify-end pt-4">
              <Button variant="ghost" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleAddDoctor} loading={loading}>
                Add Doctor
              </Button>
            </div>
          </div>
        </Modal>

        {/* Edit Doctor Modal */}
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Doctor"
          size="md"
        >
          {selectedDoctor && (
            <div className="space-y-4">
              <Input
                label="Full Name"
                value={selectedDoctor.name}
                onChange={(e) => setSelectedDoctor({ ...selectedDoctor, name: e.target.value })}
                required
              />
              <Input
                label="Email"
                type="email"
                value={selectedDoctor.email}
                onChange={(e) => setSelectedDoctor({ ...selectedDoctor, email: e.target.value })}
                required
              />
              <Input
                label="Phone"
                type="tel"
                value={selectedDoctor.phone}
                onChange={(e) => setSelectedDoctor({ ...selectedDoctor, phone: e.target.value })}
                required
              />
              <Input
                label="Specialization"
                value={selectedDoctor.specialization}
                onChange={(e) => setSelectedDoctor({ ...selectedDoctor, specialization: e.target.value })}
                required
              />

              <div className="flex gap-3 justify-end pt-4">
                <Button variant="ghost" onClick={() => setIsEditModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleEditDoctor} loading={loading}>
                  Save Changes
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
