import { Router } from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import { signAccessToken, signRefreshToken, verifyToken } from '../utils/jwt.js'

const router = Router()

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role = 'user' } = req.body || {}
    if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' })

    const exists = await User.findOne({ email })
    if (exists) return res.status(409).json({ error: 'Email already in use' })

    const passwordHash = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, passwordHash, role })

    const payload = { sub: user._id.toString(), role: user.role, email: user.email }
    const accessToken = signAccessToken(payload)
    const refreshToken = signRefreshToken(payload)

    res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, accessToken, refreshToken })
  } catch (e) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {}
    if (!email || !password) return res.status(400).json({ error: 'Missing fields' })

    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ error: 'Invalid credentials' })

    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' })

    const payload = { sub: user._id.toString(), role: user.role, email: user.email }
    const accessToken = signAccessToken(payload)
    const refreshToken = signRefreshToken(payload)

    res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, accessToken, refreshToken })
  } catch (e) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.post('/refresh', async (req, res) => {
  try {
    const { token } = req.body || {}
    if (!token) return res.status(400).json({ error: 'Missing token' })
    const decoded = verifyToken(token)
    if (decoded.typ !== 'refresh') return res.status(400).json({ error: 'Invalid token' })
    const payload = { sub: decoded.sub, role: decoded.role, email: decoded.email }
    const accessToken = signAccessToken(payload)
    const refreshToken = signRefreshToken(payload)
    res.json({ accessToken, refreshToken })
  } catch (e) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
})

export default router
