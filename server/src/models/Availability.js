import mongoose from 'mongoose'

const SlotSchema = new mongoose.Schema(
  {
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    status: { type: String, enum: ['open', 'booked', 'blocked'], default: 'open' }
  },
  { _id: false }
)

const AvailabilitySchema = new mongoose.Schema(
  {
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true, index: true },
    date: { type: String, required: true, index: true }, // YYYY-MM-DD
    slots: { type: [SlotSchema], default: [] }
  },
  { timestamps: true }
)

AvailabilitySchema.index({ doctorId: 1, date: 1 }, { unique: true })

export default mongoose.model('Availability', AvailabilitySchema)
