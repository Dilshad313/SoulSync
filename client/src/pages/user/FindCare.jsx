import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Card, { CardContent } from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Input, { Select } from '../../components/UI/Input';
import Badge from '../../components/UI/Badge';
import Modal from '../../components/UI/Modal';

const FindCare = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    specialization: '',
    availability: '',
    consultationType: ''
  });
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    type: 'video',
    reason: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, doctors]);

  const fetchDoctors = async () => {
    try {
      // API call would go here
      // Mock data
      setDoctors([
        {
          id: 1,
          name: 'Dr. Sarah Johnson',
          specialization: 'Clinical Psychologist',
          rating: 4.9,
          reviews: 127,
          experience: '15 years',
          consultationFee: 150,
          availability: 'Available Today',
          nextAvailable: '2024-10-20',
          image: null,
          languages: ['English', 'Spanish'],
          about: 'Specializing in anxiety, depression, and trauma therapy with a cognitive-behavioral approach.',
          education: 'PhD in Clinical Psychology, Harvard University',
          consultationTypes: ['video', 'in-person']
        },
        {
          id: 2,
          name: 'Dr. Michael Chen',
          specialization: 'Psychiatrist',
          rating: 4.8,
          reviews: 98,
          experience: '12 years',
          consultationFee: 200,
          availability: 'Available Tomorrow',
          nextAvailable: '2024-10-21',
          image: null,
          languages: ['English', 'Mandarin'],
          about: 'Expert in medication management and treatment of mood disorders.',
          education: 'MD, Johns Hopkins School of Medicine',
          consultationTypes: ['video', 'in-person']
        },
        {
          id: 3,
          name: 'Dr. Emily Rodriguez',
          specialization: 'Family Therapist',
          rating: 4.9,
          reviews: 156,
          experience: '10 years',
          consultationFee: 120,
          availability: 'Available Today',
          nextAvailable: '2024-10-20',
          image: null,
          languages: ['English', 'Spanish'],
          about: 'Focused on family dynamics, relationship counseling, and adolescent therapy.',
          education: 'LMFT, University of California',
          consultationTypes: ['video', 'in-person']
        },
        {
          id: 4,
          name: 'Dr. James Wilson',
          specialization: 'Child Psychologist',
          rating: 4.7,
          reviews: 89,
          experience: '8 years',
          consultationFee: 130,
          availability: 'Available in 3 days',
          nextAvailable: '2024-10-23',
          image: null,
          languages: ['English'],
          about: 'Specializing in child and adolescent behavioral issues, ADHD, and autism spectrum disorders.',
          education: 'PsyD, Stanford University',
          consultationTypes: ['video', 'in-person']
        }
      ]);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const applyFilters = () => {
    let filtered = [...doctors];

    if (filters.search) {
      filtered = filtered.filter(doctor =>
        doctor.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.specialization) {
      filtered = filtered.filter(doctor =>
        doctor.specialization.toLowerCase().includes(filters.specialization.toLowerCase())
      );
    }

    if (filters.consultationType) {
      filtered = filtered.filter(doctor =>
        doctor.consultationTypes.includes(filters.consultationType)
      );
    }

    setFilteredDoctors(filtered);
  };

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setIsBookingModalOpen(true);
  };

  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Use mock API service
      await api.bookAppointment({
        doctorId: selectedDoctor.id,
        doctorName: selectedDoctor.name,
        ...bookingData
      });

      alert('Appointment booked successfully! You will receive a confirmation email shortly.');
      setIsBookingModalOpen(false);
      setBookingData({ date: '', time: '', type: 'video', reason: '' });
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment');
    }

    setLoading(false);
  };

  const specializationOptions = [
    { value: '', label: 'All Specializations' },
    { value: 'clinical', label: 'Clinical Psychologist' },
    { value: 'psychiatrist', label: 'Psychiatrist' },
    { value: 'family', label: 'Family Therapist' },
    { value: 'child', label: 'Child Psychologist' }
  ];

  const consultationTypeOptions = [
    { value: '', label: 'All Types' },
    { value: 'video', label: 'Video Consultation' },
    { value: 'in-person', label: 'In-Person' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Find Care
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Connect with qualified mental health professionals
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input
                placeholder="Search by name or specialty..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                icon={(props) => (
                  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                )}
              />

              <Select
                value={filters.specialization}
                onChange={(e) => setFilters({ ...filters, specialization: e.target.value })}
                options={specializationOptions}
              />

              <Select
                value={filters.consultationType}
                onChange={(e) => setFilters({ ...filters, consultationType: e.target.value })}
                options={consultationTypeOptions}
              />

              <Button variant="outline" fullWidth onClick={() => setFilters({ search: '', specialization: '', availability: '', consultationType: '' })}>
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Showing {filteredDoctors.length} {filteredDoctors.length === 1 ? 'professional' : 'professionals'}
          </p>
        </div>

        {/* Doctor Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} hover>
              <CardContent>
                <div className="flex gap-4">
                  {/* Avatar */}
                  <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-blue-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                    {doctor.name.split(' ').map(n => n[0]).join('')}
                  </div>

                  {/* Info */}
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
                      <Badge variant="success" size="sm">
                        {doctor.availability}
                      </Badge>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <span className="text-sm font-medium text-slate-900 dark:text-white">
                          {doctor.rating}
                        </span>
                      </div>
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        ({doctor.reviews} reviews)
                      </span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">•</span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {doctor.experience} experience
                      </span>
                    </div>

                    {/* About */}
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
                      {doctor.about}
                    </p>

                    {/* Languages */}
                    <div className="flex items-center gap-2 mb-3">
                      <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                      </svg>
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        {doctor.languages.join(', ')}
                      </span>
                    </div>

                    {/* Consultation Types */}
                    <div className="flex items-center gap-2 mb-4">
                      {doctor.consultationTypes.includes('video') && (
                        <Badge variant="primary" size="sm">Video</Badge>
                      )}
                      {doctor.consultationTypes.includes('in-person') && (
                        <Badge variant="info" size="sm">In-Person</Badge>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-700">
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Consultation Fee</p>
                        <p className="text-lg font-semibold text-slate-900 dark:text-white">
                          ${doctor.consultationFee}
                        </p>
                      </div>
                      <Button
                        variant="primary"
                        onClick={() => handleBookAppointment(doctor)}
                      >
                        Book Appointment
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <Card>
            <CardContent>
              <div className="text-center py-12">
                <svg className="w-20 h-20 mx-auto text-slate-300 dark:text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  No doctors found
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Try adjusting your filters to see more results
                </p>
                <Button variant="primary" onClick={() => setFilters({ search: '', specialization: '', availability: '', consultationType: '' })}>
                  Clear All Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Booking Modal */}
        <Modal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          title="Book Appointment"
          size="md"
        >
          {selectedDoctor && (
            <div>
              {/* Doctor Info */}
              <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-blue-500 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                  {selectedDoctor.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    {selectedDoctor.name}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {selectedDoctor.specialization}
                  </p>
                  <p className="text-sm font-medium text-teal-600 dark:text-teal-400">
                    ${selectedDoctor.consultationFee} per session
                  </p>
                </div>
              </div>

              {/* Booking Form */}
              <form onSubmit={handleSubmitBooking} className="space-y-4">
                <Select
                  label="Consultation Type"
                  value={bookingData.type}
                  onChange={(e) => setBookingData({ ...bookingData, type: e.target.value })}
                  options={[
                    { value: 'video', label: 'Video Consultation' },
                    { value: 'in-person', label: 'In-Person Visit' }
                  ]}
                  required
                />

                <Input
                  label="Preferred Date"
                  type="date"
                  value={bookingData.date}
                  onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />

                <Select
                  label="Preferred Time"
                  value={bookingData.time}
                  onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                  options={[
                    { value: '', label: 'Select a time' },
                    { value: '09:00', label: '9:00 AM' },
                    { value: '10:00', label: '10:00 AM' },
                    { value: '11:00', label: '11:00 AM' },
                    { value: '14:00', label: '2:00 PM' },
                    { value: '15:00', label: '3:00 PM' },
                    { value: '16:00', label: '4:00 PM' }
                  ]}
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Reason for Visit
                  </label>
                  <textarea
                    value={bookingData.reason}
                    onChange={(e) => setBookingData({ ...bookingData, reason: e.target.value })}
                    placeholder="Brief description of what you'd like to discuss..."
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                    required
                  />
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <strong>Note:</strong> Your appointment request will be sent to the doctor for confirmation. 
                    You'll receive an email notification once it's confirmed.
                  </p>
                </div>

                <div className="flex gap-3 justify-end pt-4">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setIsBookingModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    loading={loading}
                    disabled={loading}
                  >
                    Request Appointment
                  </Button>
                </div>
              </form>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default FindCare;
