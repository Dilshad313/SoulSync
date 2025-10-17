import { Router } from 'express'
import { z } from 'zod'
import Appointment from '../models/Appointment.js'
import { requireAuth, requireRole } from '../middleware/auth.js'
import { userToDoctorId } from '../utils/doctor.js'
import Availability from '../models/Availability.js'
import { toYMD } from '../utils/dates.js'

const router = Router()

const createSchema = z.object({
  doctorId: z.string(), // expects Doctor._id
  hospitalId: z.string().optional(),
  type: z.enum(['video', 'in_person']),
  start: z.string().datetime(),
  end: z.string().datetime(),
  notes: z.string().optional()
})

router.post('/', requireAuth, requireRole('user'), async (req, res) => {
  try {
    const parsed = createSchema.safeParse(req.body)
    if (!parsed.success) return res.status(400).json({ error: 'Invalid payload' })
    const { doctorId, hospitalId, type, start, end, notes } = parsed.data
    const userId = req.user.sub

    const startDt = new Date(start)
    const endDt = new Date(end)
    if (!(endDt > startDt)) return res.status(400).json({ error: 'Invalid time range' })

    // verify availability and mark slot as booked
    const dateKey = toYMD(startDt)
    const avail = await Availability.findOne({ doctorId, date: dateKey })
    if (!avail) return res.status(409).json({ error: 'No availability for selected date' })
    const idx = avail.slots.findIndex(s => s.status === 'open' && (new Date(s.start) <= startDt) && (new Date(s.end) >= endDt))
    if (idx === -1) return res.status(409).json({ error: 'Requested time not available' })

    // mark booked portion; simple approach: mark entire slot booked
    avail.slots[idx].status = 'booked'
    await avail.save()

    const appt = await Appointment.create({
      userId,
      doctorId,
      hospitalId: hospitalId || undefined,
      type,
      start: startDt,
      end: endDt,
      status: 'requested',
      notes: notes || ''
    })
    res.status(201).json(appt)
  } catch (e) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.get('/mine', requireAuth, async (req, res) => {
  try {
    const role = req.user.role
    if (role === 'user') {
      const list = await Appointment.find({ userId: req.user.sub }).sort({ start: 1 })
      return res.json(list)
    }
    if (role === 'doctor') {
      // NOTE: mapping userId->doctorId needed; placeholder uses userId as doctorId
      const list = await Appointment.find({ doctorId: req.user.sub }).sort({ start: 1 })
      return res.json(list)
    }
    if (role === 'admin') {
      const list = await Appointment.find().sort({ start: 1 })
      return res.json(list)
    }
    return res.status(403).json({ error: 'Forbidden' })
  } catch (e) {
    res.status(500).json({ error: 'Server error' })
  }
})

const statusSchema = z.object({ status: z.enum(['accepted','rejected','completed','canceled']) })

router.patch('/:id/status', requireAuth, requireRole('doctor'), async (req, res) => {
  try {
    const { id } = req.params
    const parsed = statusSchema.safeParse(req.body)
    if (!parsed.success) return res.status(400).json({ error: 'Invalid payload' })
    const appt = await Appointment.findById(id)
    if (!appt) return res.status(404).json({ error: 'Not found' })

    // Ownership check using doctor mapping
    const myDoctorId = await userToDoctorId(req.user.sub)
    if (!myDoctorId || String(appt.doctorId) !== String(myDoctorId)) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    appt.status = parsed.data.status

    if (appt.status === 'accepted' && appt.type === 'video') {
      // Placeholder video room generation; integrate Twilio later
      appt.videoRoom = {
        provider: 'twilio',
        roomId: `room_${Date.now()}_${Math.floor(Math.random()*1e6)}`,
        tokenMeta: {}
      }
    }

    await appt.save()
    res.json(appt)
  } catch (e) {
    res.status(500).json({ error: 'Server error' })
  }
})

// Skeleton: generate a video token for an accepted appointment (user or doctor)
router.post('/:id/video-token', requireAuth, async (req, res) => {
  try {
    const { id } = req.params
    const appt = await Appointment.findById(id)
    if (!appt) return res.status(404).json({ error: 'Not found' })

    const role = req.user.role
    const uid = req.user.sub
    const myDoctorId = role === 'doctor' ? await userToDoctorId(uid) : null
    const isUser = role === 'user' && String(appt.userId) === String(uid)
    const isDoctor = role === 'doctor' && myDoctorId && String(appt.doctorId) === String(myDoctorId)
    if (!isUser && !isDoctor) return res.status(403).json({ error: 'Forbidden' })

    if (appt.status !== 'accepted' || appt.type !== 'video') {
      return res.status(400).json({ error: 'Appointment not ready for video' })
    }

    // TODO: time-window check (only near scheduled time)

    // Placeholder token response; integrate Twilio Access Token here
    res.json({ provider: appt.videoRoom?.provider || 'twilio', roomId: appt.videoRoom?.roomId || 'room', token: 'placeholder' })
  } catch (e) {
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
