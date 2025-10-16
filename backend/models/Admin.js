const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
    // removed unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['super-admin', 'moderator', 'content-manager', 'support-agent'],
    required: true
  },
  permissions: [{
    resource: String,
    actions: [String] // ['create', 'read', 'update', 'delete']
  }],
  lastLoginAt: Date,
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockedUntil: Date,
  isActive: {
    type: Boolean,
    default: true
  },
  assignedSections: [String] // Which sections they manage: ['doctors', 'hospitals', 'courses', 'forum', etc.]
}, {
  timestamps: true
});

adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

adminSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Admin', adminSchema);