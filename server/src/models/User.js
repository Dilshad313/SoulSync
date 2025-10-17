import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['user', 'doctor', 'hospital', 'admin'], default: 'user', index: true },
    profile: { type: Object, default: {} }
  },
  { timestamps: true }
)

export default mongoose.model('User', UserSchema)
