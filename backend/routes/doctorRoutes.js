const express = require('express');
const { auth, doctorAuth } = require('../middleware/auth');
const { validateDoctorRegistration } = require('../middleware/validation');
const Doctor = require('../models/Doctor');
const User = require('../models/User');
const Appointment = require('../models/Appointment');
const Feedback = require('../models/Feedback');

const router = express.Router();

// @route   POST api/doctors/register
// @desc    Register doctor
// @access  Private - Doctor role
router.post('/register', [auth, validateDoctorRegistration], async (req, res) => {
  try {
    const doctorData = {
      ...req.body,
      userId: req.user.id
    };

    const doctor = new Doctor(doctorData);
    await doctor.save();

    // Update user role to doctor
    await User.findByIdAndUpdate(req.user.id, { role: 'doctor' });

    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET api/doctors/my-profile
// @desc    Get doctor's profile
// @access  Private - Doctor role
router.get('/my-profile', doctorAuth, async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user.id })
      .populate('userId', 'username email firstName lastName profilePicture');
    
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor profile not found' });
    }

    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT api/doctors/my-profile
// @desc    Update doctor's profile
// @access  Private - Doctor role
router.put('/my-profile', doctorAuth, async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user.id });
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor profile not found' });
    }

    // Update doctor fields
    Object.keys(req.body).forEach(key => {
      if (doctor[key] !== undefined) {
        doctor[key] = req.body[key];
      }
    });

    await doctor.save();
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET api/doctors/search
// @desc    Search for doctors
// @access  Private
router.get('/search', auth, async (req, res) => {
  try {
    const { 
      specialization, 
      location, 
      rating, 
      consultationType, 
      availability, 
      page = 1, 
      limit = 10 
    } = req.query;

    let query = { isAvailable: true, adminApprovalStatus: 'approved' };

    if (specialization) {
      query.specialization = { $regex: specialization, $options: 'i' };
    }

    if (rating) {
      query['rating.average'] = { $gte: parseFloat(rating) };
    }

    if (consultationType) {
      query.consultationTypes = consultationType;
    }

    // Add location-based search if coordinates are provided
    if (location) {
      // This would need to be expanded to handle geospatial queries
      const [lat, lng] = location.split(',').map(coord => parseFloat(coord));
      // Distance calculation would go here
    }

    const doctors = await Doctor.find(query)
      .populate('userId', 'username firstName lastName profilePicture')
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Doctor.countDocuments(query);

    res.json({
      doctors,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET api/doctors/:id
// @desc    Get doctor by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
      .populate('userId', 'username firstName lastName profilePicture');

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Get additional info like ratings, reviews, etc.
    const feedbacks = await Feedback.find({ 
      revieweeId: doctor.userId, 
      revieweeType: 'doctor' 
    }).populate('reviewerId', 'username firstName lastName profilePicture');

    const result = {
      ...doctor.toObject(),
      feedbacks: feedbacks.slice(0, 5), // Return first 5 reviews
      feedbackCount: feedbacks.length
    };

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET api/doctors/my-appointments
// @desc    Get doctor's appointments
// @access  Private - Doctor role
router.get('/my-appointments', doctorAuth, async (req, res) => {
  try {
    const { date, status } = req.query;

    let query = { doctorId: req.user.doctorId };

    if (date) {
      query.appointmentDate = {
        $gte: new Date(date),
        $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1))
      };
    }

    if (status) {
      query.status = status;
    } else {
      query.status = { $ne: 'completed' }; // Don't show completed by default
    }

    const appointments = await Appointment.find(query)
      .populate('patientId', 'username firstName lastName profilePicture')
      .sort({ appointmentDate: 1, startTime: 1 });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT api/doctors/my-availability
// @desc    Update doctor's availability
// @access  Private - Doctor role
router.put('/my-availability', doctorAuth, async (req, res) => {
  try {
    const { availability } = req.body;

    const doctor = await Doctor.findOne({ userId: req.user.id });
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor profile not found' });
    }

    doctor.availability = availability;
    await doctor.save();

    res.json({ message: 'Availability updated successfully', availability: doctor.availability });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;