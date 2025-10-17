import mongoose from 'mongoose'

const DoctorSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    specialties: { type: [String], default: [] },
    experienceYears: { type: Number, default: 0 },
    credentials: { type: [String], default: [] },
    verificationStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending', index: true }
  },
  { timestamps: true }
)

export default mongoose.model('Doctor', DoctorSchema)
