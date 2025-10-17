import mongoose from 'mongoose'

const HospitalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    contactEmail: { type: String },
    phone: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
    services: { type: [String], default: [] },
    affiliatedDoctorIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }]
  },
  { timestamps: true }
)

export default mongoose.model('Hospital', HospitalSchema)
