import { Router } from 'express'
import { z } from 'zod'
import Availability from '../models/Availability.js'
import { requireAuth, requireRole } from '../middleware/auth.js'
import { userToDoctorId } from '../utils/doctor.js'

const router = Router()

const upsertSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  slots: z.array(z.object({
    start: z.string().datetime(),
    end: z.string().datetime(),
    status: z.enum(['open','booked','blocked']).optional()
  })).min(1)
})

// Doctor: create or replace availability for a date
router.post('/', requireAuth, requireRole('doctor'), async (req, res) => {
  try {
    const parsed = upsertSchema.safeParse(req.body)
    if (!parsed.success) return res.status(400).json({ error: 'Invalid payload' })
    const { date, slots } = parsed.data

    // map authenticated user -> Doctor._id
    const doctorId = await userToDoctorId(req.user.sub)
    if (!doctorId) return res.status(400).json({ error: 'Doctor profile not found' })

    const normalized = slots.map(s => ({
      start: new Date(s.start),
      end: new Date(s.end),
      status: s.status || 'open'
    }))

    // Validate slot order/overlaps (within payload)
    normalized.sort((a,b)=> a.start - b.start)
    for (let i=0;i<normalized.length;i++){
      if (!(normalized[i].end > normalized[i].start)) return res.status(400).json({ error: 'Invalid slot times' })
      if (i>0 && normalized[i-1].end > normalized[i].start) return res.status(400).json({ error: 'Overlapping slots in payload' })
    }

    // Check against existing booked slots to prevent conflicts
    const existing = await Availability.findOne({ doctorId, date })
    if (existing){
      const booked = existing.slots.filter(s=> s.status === 'booked')
      for (const n of normalized){
        for (const b of booked){
          if (n.start < b.end && b.start < n.end){
            return res.status(409).json({ error: 'Conflicts with booked slots' })
          }
        }
      }
    }

    const upserted = await Availability.findOneAndUpdate(
      { doctorId, date },
      { $set: { slots: normalized } },
      { upsert: true, new: true }
    )
    res.json(upserted)
  } catch (e) {
    res.status(500).json({ error: 'Server error' })
  }
})

// Public/User: get availability for doctor on a date
router.get('/:doctorId', async (req, res) => {
  try {
    const { doctorId } = req.params
    const { date } = req.query
    const query = { doctorId }
    if (date) query.date = String(date)
    const results = await Availability.find(query)
    res.json(results)
  } catch (e) {
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
