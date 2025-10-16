import React, { useState } from 'react';
import api from '../services/api';

const AdminModule = () => {
  const [doctorForm, setDoctorForm] = useState({
    licenseNumber: '',
    specialization: '',
    qualifications: '',
    yearsOfExperience: '',
    bio: '',
    consultationFee: '',
    languages: '',
    shift: 'morning'
  });
  const [message, setMessage] = useState('');

  const handleDoctorChange = (e) => {
    const { name, value } = e.target;
    setDoctorForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitDoctor = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/doctors', doctorForm);
      setMessage('✅ Freelance doctor created successfully!');
      setDoctorForm({
        licenseNumber: '',
        specialization: '',
        qualifications: '',
        yearsOfExperience: '',
        bio: '',
        consultationFee: '',
        languages: '',
        shift: 'morning'
      });
    } catch (err) {
      console.error(err);
      setMessage('❌ Error creating doctor.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 p-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8 transition-all duration-300 hover:shadow-2xl">
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
          Admin Module – Add Freelance Doctor
        </h2>

        {message && (
          <div
            className={`mb-4 text-center py-2 px-4 rounded ${
              message.includes('✅')
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={submitDoctor} className="space-y-4">
          <input
            type="text"
            name="licenseNumber"
            value={doctorForm.licenseNumber}
            onChange={handleDoctorChange}
            placeholder="License Number"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />
          <input
            type="text"
            name="specialization"
            value={doctorForm.specialization}
            onChange={handleDoctorChange}
            placeholder="Specialization"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />
          <input
            type="text"
            name="qualifications"
            value={doctorForm.qualifications}
            onChange={handleDoctorChange}
            placeholder="Qualifications"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <input
            type="number"
            name="yearsOfExperience"
            value={doctorForm.yearsOfExperience}
            onChange={handleDoctorChange}
            placeholder="Years of Experience"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <textarea
            name="bio"
            value={doctorForm.bio}
            onChange={handleDoctorChange}
            placeholder="Short Bio"
            className="w-full border rounded-lg px-4 py-2 h-24 resize-none focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <input
            type="number"
            name="consultationFee"
            value={doctorForm.consultationFee}
            onChange={handleDoctorChange}
            placeholder="Consultation Fee"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <input
            type="text"
            name="languages"
            value={doctorForm.languages}
            onChange={handleDoctorChange}
            placeholder="Languages (comma separated)"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <select
            name="shift"
            value={doctorForm.shift}
            onChange={handleDoctorChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          >
            <option value="morning">Morning Shift</option>
            <option value="night">Night Shift</option>
          </select>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition-all duration-200"
          >
            Create Doctor
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminModule;
