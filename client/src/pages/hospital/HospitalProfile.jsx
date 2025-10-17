import React, { useState, useEffect } from 'react';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Input, { TextArea } from '../../components/UI/Input';

const HospitalProfile = () => {
  const [profile, setProfile] = useState({
    name: 'Serenity Wellness Center',
    email: 'contact@serenitywellness.com',
    phone: '+1 (555) 123-4567',
    address: '123 Wellness Street, Suite 200',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    website: 'www.serenitywellness.com',
    description: 'A comprehensive mental health and wellness center dedicated to providing compassionate care and evidence-based treatments.',
    specialties: 'Anxiety, Depression, Trauma, Family Therapy, Addiction',
    facilities: 'Private Consultation Rooms, Group Therapy Spaces, Meditation Room, Pharmacy',
    insurance: 'Blue Cross, Aetna, UnitedHealthcare, Cigna, Medicare',
    hours: 'Monday-Friday: 8:00 AM - 8:00 PM, Saturday: 9:00 AM - 5:00 PM',
    emergencyContact: '+1 (555) 911-HELP'
  });
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      // API call would go here
      // Mock data already set in state
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await fetch('/api/hospital/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(profile)
      });
      alert('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Facility Profile
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Manage your facility information
            </p>
          </div>
          {!isEditing ? (
            <Button variant="primary" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSave} loading={loading}>
                Save Changes
              </Button>
            </div>
          )}
        </div>

        {/* Basic Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>General facility details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Facility Name"
                name="name"
                value={profile.name}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />
              <Input
                label="Email"
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />
              <Input
                label="Phone"
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />
              <Input
                label="Website"
                type="url"
                name="website"
                value={profile.website}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </CardContent>
        </Card>

        {/* Address */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Address</CardTitle>
            <CardDescription>Physical location</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                label="Street Address"
                name="address"
                value={profile.address}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="City"
                  name="city"
                  value={profile.city}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                />
                <Input
                  label="State"
                  name="state"
                  value={profile.state}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                />
                <Input
                  label="ZIP Code"
                  name="zipCode"
                  value={profile.zipCode}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Description & Services */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>About & Services</CardTitle>
            <CardDescription>Facility description and offerings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <TextArea
                label="Description"
                name="description"
                value={profile.description}
                onChange={handleChange}
                disabled={!isEditing}
                rows={4}
                required
              />
              <TextArea
                label="Specialties"
                name="specialties"
                value={profile.specialties}
                onChange={handleChange}
                disabled={!isEditing}
                rows={3}
                helperText="Comma-separated list of specialties"
              />
              <TextArea
                label="Facilities & Amenities"
                name="facilities"
                value={profile.facilities}
                onChange={handleChange}
                disabled={!isEditing}
                rows={3}
                helperText="Comma-separated list of facilities"
              />
            </div>
          </CardContent>
        </Card>

        {/* Insurance & Hours */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Insurance & Hours</CardTitle>
            <CardDescription>Accepted insurance and operating hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <TextArea
                label="Accepted Insurance"
                name="insurance"
                value={profile.insurance}
                onChange={handleChange}
                disabled={!isEditing}
                rows={3}
                helperText="Comma-separated list of insurance providers"
              />
              <TextArea
                label="Operating Hours"
                name="hours"
                value={profile.hours}
                onChange={handleChange}
                disabled={!isEditing}
                rows={2}
              />
              <Input
                label="Emergency Contact"
                name="emergencyContact"
                value={profile.emergencyContact}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        {!isEditing && (
          <Card className="bg-gradient-to-br from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 border-teal-200 dark:border-teal-800">
            <CardHeader>
              <CardTitle>Public Profile Preview</CardTitle>
              <CardDescription>How patients see your facility</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    {profile.name}
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300">{profile.description}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Location</p>
                    <p className="text-slate-900 dark:text-white">
                      {profile.address}, {profile.city}, {profile.state} {profile.zipCode}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Contact</p>
                    <p className="text-slate-900 dark:text-white">{profile.phone}</p>
                    <p className="text-slate-900 dark:text-white">{profile.email}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default HospitalProfile;
