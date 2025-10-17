import { Router } from 'express'
import { z } from 'zod'
import Doctor from '../models/Doctor.js'
import User from '../models/User.js'
import { requireAuth, requireRole } from '../middleware/auth.js'

const router = Router()

// Public: list doctors (basic fields)
router.get('/', async (req, res) => {
  try {
    const list = await Doctor.find({ verificationStatus: { $ne: 'rejected' } })
      .populate({ path: 'userId', select: 'name email role' })
      .sort({ createdAt: -1 })
    res.json(list)
  } catch (e) {
    res.status(500).json({ error: 'Server error' })
  }
})

// Doctor: get my doctor profile
router.get('/me', requireAuth, requireRole('doctor'), async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user.sub })
    if (!doctor) return res.status(404).json({ error: 'Doctor profile not found' })
    res.json(doctor)
  } catch (e) {
    res.status(500).json({ error: 'Server error' })
  }
})

const upsertSchema = z.object({
  specialties: z.array(z.string()).optional(),
  experienceYears: z.number().int().min(0).max(80).optional(),
  credentials: z.array(z.string()).optional()
})

// Doctor: create or update my doctor profile
router.post('/me', requireAuth, requireRole('doctor'), async (req, res) => {
  try {
    const parsed = upsertSchema.safeParse(req.body || {})
    if (!parsed.success) return res.status(400).json({ error: 'Invalid payload' })

    const user = await User.findById(req.user.sub)
    if (!user) return res.status(404).json({ error: 'User not found' })

    const update = { ...parsed.data }
    const doctor = await Doctor.findOneAndUpdate(
      { userId: user._id },
      { $set: update, $setOnInsert: { verificationStatus: 'pending' } },
      { upsert: true, new: true }
    )
    res.json(doctor)
  } catch (e) {
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
