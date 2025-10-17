import mongoose from 'mongoose'

const VideoRoomSchema = new mongoose.Schema(
  {
    provider: { type: String },
    roomId: { type: String },
    tokenMeta: { type: Object },
  },
  { _id: false }
)

const AppointmentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true, index: true },
    hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' },
    type: { type: String, enum: ['video', 'in_person'], required: true },
    start: { type: Date, required: true, index: true },
    end: { type: Date, required: true },
    status: { type: String, enum: ['requested', 'accepted', 'rejected', 'completed', 'canceled'], default: 'requested', index: true },
    notes: { type: String },
    videoRoom: { type: VideoRoomSchema, default: {} },
  },
  { timestamps: true }
)

export default mongoose.model('Appointment', AppointmentSchema)
